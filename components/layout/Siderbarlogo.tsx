import { useRouter } from 'next/router'
import { BsTwitter } from 'react-icons/bs'
import React from 'react'

type Props = {}

const Siderbarlogo = (props: Props) => {
    const router = useRouter()
    return (
        <div onClick={()=>router.push('/')}
            className=' rounded-full h-14 w-14 flex items-center justify-center 
                        hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition'>
            <BsTwitter size={28} color='white'/>
        </div>
    )
}

export default Siderbarlogo