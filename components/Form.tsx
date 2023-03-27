import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import usePosts from '@/hooks/usePosts'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import Avatar from './Avatar'
import Button from './Button'

type Props = {
    placeholder:string,
    isComment?:boolean,
    postId?:string

}

const Form:React.FC<Props> = ({placeholder,isComment,postId}) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const {data:currentUser} = useCurrentUser()
    const {mutate:mutatePosts} = usePosts(postId as string)

    const [body,setBody] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)
            await axios.post('/api/posts',{body})
            toast.success("Tweet Created")
            setBody("")
            mutatePosts()
        }catch(e){
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    },[body,mutatePosts])

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
        {currentUser ?(
            <div className='flex gap-4'>
                <div>
                    <Avatar userId={currentUser?.id} />
                </div>
                <div className='w-full'>
                    <textarea   disabled={isLoading} 
                                onChange={(e)=>setBody(e.target.value)}
                                value={body}
                                placeholder={placeholder}
                                className="disabled:opacity-75 peer resize-none w-full mt-3 bg-black 
                                            ring-0 outline-none text-[20px] placeholder-neutral-500 text-white
                                "
                  
                    >
                    </textarea>
                    <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-500
                                    transition
                    '/>
                    <div className='mt-4 flex justify-end'>
                        <Button label='Tweet' 
                                onClick={onSubmit}
                                disabled = {isLoading || !body}
                        />
                    </div>

                </div>
            </div>
        ):(
            <div className='py-8'>
                <h1 className='text-white text-2xl text-center mb-4 font-bold'>Welcome to Twitter</h1>
                <div className='flex items-center justify-center gap-4 '>
                    <Button label='Login' onClick={loginModal.onOpen}/>
                    <Button label='Register' onClick={registerModal.onOpen} secondary/>
                </div>
            </div>
        )}
       

    </div>
  )
}

export default Form