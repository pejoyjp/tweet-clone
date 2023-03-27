import {create} from 'zustand'
import React from 'react'

type Props = {
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
    
}

const useRegisterModal = create<Props>(
    (set) => ({
                 isOpen:false,
                 onOpen:()=>set({isOpen:true}),
                 onClose:()=>set({isOpen:false})}
    ))

export default useRegisterModal