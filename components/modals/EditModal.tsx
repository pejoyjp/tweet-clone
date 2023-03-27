import useCurrentUser from '@/hooks/useCurrentUser'
import useEitModal from '@/hooks/useEidtModal'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../Input'
import ImageUpload from '../ImageUpload'

type Props = {}

function EditModal({}: Props) {
    const {data:currentUser} = useCurrentUser()
    const {mutate:mutateFetchedUser} = useUser(currentUser?.id)
    const editModal = useEitModal()

    const [profileImage,setProfileImage] = useState("")
    const [coverImage,setCoverImage] = useState("")
    const [name,setName] = useState("")
    const [username,setUsername] = useState("")
    const [bio,setBio] = useState("")

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    },[currentUser?.profileImage,
        currentUser?.coverImage,
        currentUser?.username,
        currentUser?.bio,
        currentUser?.name,
    ])

    const [isLoading,setIsLoading] = useState(false)
    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)
            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                coverImage,
                profileImage
            })
            mutateFetchedUser()
            toast.success("Updated")
            editModal.onClose()
        }catch(e){
            toast.error("Something went wrong ")
        }
    },[bio,name,username,profileImage,coverImage,editModal,mutateFetchedUser]) 
    
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image)=>setProfileImage(image)}
                        label = "Upload profile image"
            />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image)=>setCoverImage(image)}
                        label = "Upload cover image"
            />
            <Input placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name} disable={isLoading}/>
            <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)} value={username} disable={isLoading}/>
            <Input placeholder='Bio' onChange={(e)=>setBio(e.target.value)} value={bio} disable={isLoading}/>
        </div>
    )

  return (
    
    <Modal 
        disabled={isLoading}
        isOpen={editModal.isOpen}
        title="Edit your profile"
        actionLabel='Save'
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default EditModal