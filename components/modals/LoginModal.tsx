import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import Input from '../Input'
import Modal from '../Modal'


type Props = {}

const LoginModal = (props: Props) => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onToggle = useCallback(()=>{
        if(isLoading){return}
        loginModal.onClose()
        registerModal.onOpen()
    },[isLoading,registerModal,loginModal])

    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)
            //todo add log in 
            await signIn('credentials',{
                email,
                password
            })

            loginModal.onClose()
        }catch(e){
            console.log(e);
        }finally{
            setIsLoading(false)
        }
    },[loginModal,email,password])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input placeholder="email"
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                 disable={isLoading}
            />

            <Input placeholder="password"
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                 type='password'
                 disable={isLoading}
            />
        </div>
        
    )

    const footerContent = (
        <div className=' text-neutral-400 text-center mt-4'>
            <p>First time using Twitter?
                <span   onClick={onToggle}
                        className='text-white cursor-pointer hover:underline pl-2'> 
                    Sign up
                </span>
            </p>
            

        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" 
                actionLabel='Sign in' onClose={loginModal.onClose} 
                onSubmit={onSubmit} body={bodyContent} footer={footerContent}
        />
    )
}

export default LoginModal