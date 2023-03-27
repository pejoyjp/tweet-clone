import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import {toast} from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import Input from '../Input'
import Modal from '../Modal'
import axios from 'axios'

type Props = {}

const RegisterModal = (props: Props) => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onToggle = useCallback(()=>{
        if(isLoading)return
        registerModal.onClose()
        loginModal.onOpen()
    },[isLoading,registerModal,loginModal])

    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)
            //todo add log in  and register
            await axios.post('/api/register',{
                email,
                password,
                username,
                name
            })

            toast.success("Account created")
            signIn("credentials",{
                email,
                password
            })
            registerModal.onClose()
        }catch(e){
            console.log(e);
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false)
        }
    },[registerModal,email,password,username,name])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input placeholder="email"
                 onChange={(e)=>setEmail(e.target.value)}
                 value={email}
                 disable={isLoading}
            />

            <Input placeholder="name"
                 onChange={(e)=>setName(e.target.value)}
                 value={name}
                 disable={isLoading}
            />
            <Input placeholder="username"
                 onChange={(e)=>setUsername(e.target.value)}
                 value={username}
                 disable={isLoading}
            />
            <Input placeholder="password"
                 type='password'
                 onChange={(e)=>setPassword(e.target.value)}
                 value={password}
                 disable={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className=' text-neutral-400 text-center mt-4'>
            <p>Already have an account?
                <span   onClick={onToggle}
                        className='text-white cursor-pointer hover:underline pl-2'> 
                    Sign in
                </span>
            </p>
            

        </div>
    )
    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Create an account " 
                actionLabel='Register' onClose={registerModal.onClose} 
                onSubmit={onSubmit} body={bodyContent} footer={footerContent}
        />
    )
}

export default RegisterModal