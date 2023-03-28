import useCurrentUser from '@/hooks/useCurrentUser'
import useLike from '@/hooks/useLike'
import useLoginModal from '@/hooks/useLoginModal'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import Avatar from '../Avatar'

type Props = {
    data:Record<string,any>
    userId?:string
}

const PostItem:React.FC<Props> = ({data,userId}) => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const {data:currentUser} = useCurrentUser()
    const {hasLiked,toggleLike} = useLike({postId:data.id,userId})

    const goToUser = useCallback((e:any)=>{
        e.stopPropagation()
        router.push(`/users/${data.user.id}`)
    },[router,data.user.id])
    
    const goToPost = useCallback(()=>{
        router.push(`/posts/${data.id}`)
    },[router,data.id])

    const onLike = useCallback((e:any)=>{
        e.stopPropagation()
        if(!currentUser){
            return loginModal.onOpen()
        }
        toggleLike()
        
    },[loginModal,currentUser,toggleLike])

    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt))
    },[data?.createdAt])

    const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart


  return (
    <div onClick={goToPost}
        className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900
                  transition
        ' 
    >
        <div className='flex gap-3 items-start'> 
            <Avatar userId={data.user.id}/>
            <div>
                <div className='flex items-center gap-2'>
                    <p  onClick={goToUser}
                        className=' text-white font-semibold cursor-pointer hover:underline'>
                        {data.user.name}
                    </p>
                    <span   onClick={goToUser}
                            className='text-neutral-500 cursor-pointer hidden hover:underline md:block'>
                            @{data.user.username}
                    </span>

                    <span className='text-sm text-neutral-500'> 
                        {createdAt}
                    </span>
                </div>
                <div className='text-white mt-1'>
                    {data.body}
                </div>
                <div className='flex items-center mt-3 gap-10 '>
                    <div className='flex items-center text-neutral-500 gap-2 cursor-pointer transition
                                    hover:text-sky-500        
                    '>
                        <AiOutlineMessage size={20} />
                        <p>
                            {data.comments?.length || 0}
                        </p>
                    </div>

                    <div    onClick={onLike}
                            className='flex items-center text-neutral-500 gap-2 cursor-pointer transition
                            hover:text-red-500        
                    '>
                        <LikeIcon size={20} color={hasLiked? 'crimson':''}/>
                        <p>
                            {data.likedIds.length}
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem