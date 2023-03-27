import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import Siderbarlogo from './Siderbarlogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';
import { FaUser } from 'react-icons/fa';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

type Props = {}

const Sidebar = (props: Props) => {
  const {data:currentUser} = useCurrentUser()

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <Siderbarlogo />
          {items.map(item=>(
            <SidebarItem key={item.href} href={item.href} 
                        label={item.label} icon={item.icon}
                        auth={item.auth}              
            />
          ))}
          {currentUser && (<SidebarItem onClick={()=>signOut()} icon={BiLogOut} label='Logout' href='sawe'/>)}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar