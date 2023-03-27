import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser'
import React, { useMemo } from 'react'
import {format} from 'date-fns'
import Button from '../Button'
import { BiCalendar } from 'react-icons/bi'
import useEitModal from '@/hooks/useEidtModal'

type Props = {
    userId:string
}

const UserBio:React.FC<Props> = ({userId}) => {
    const {data:currentUser} = useCurrentUser()
    const {data:fetchedUser} = useUser(userId)
    const eidtModal = useEitModal()

    const createdAt = useMemo(()=>{
        if(!fetchedUser?.createdAt){
            return null
        }
        return format(new Date(fetchedUser.createdAt),'MMMM yyyy')
    },[fetchedUser?.createdAt])
    return (
        <div className='border-b-[1px] border-neutral-800 pb-4'>
            <div className='flex justify-end p-2'>
                {
                    currentUser?.id === userId ?(
                        <Button secondary label='Edit' onClick={eidtModal.onOpen} />
                    ):(
                        <Button onClick={()=>{}} label="Follow" secondary />
                    )
                }
            </div>
            <div className='mt-7 px-4'>
                <div className=' flex flex-col '>
                    <p className='text-white text-2xl font-semibold'>
                        {fetchedUser?.name}
                    </p>
                    <p className='text-md text-neutral-500'>
                        @{fetchedUser?.username}
                    </p>
                </div>

                <div className='flex flex-col mt-4'>
                    <p className='text-white'>
                        {fetchedUser?.bio}
                    </p>
                    <div className='flex items-center gap-2 mt-4 text-neutral-500'>
                        <BiCalendar size={24}/>
                        <p>
                            Join {createdAt}
                        </p>
                    </div>
                </div>

                <div className='flex items-center mt-4 gap-6'>
                    <div className='flex items-center gap-1'>
                        <p className='text-white'>
                            {fetchedUser?.followingIds?.length}
                        </p>
                        <p className=' text-neutral-500 pl-1'>
                            Following
                        </p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <p className='text-white'>
                            {fetchedUser?.followersCount || 0}
                        </p>
                        <p className=' text-neutral-500 pl-1'>
                            Followers
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserBio