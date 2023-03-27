import Header from '@/components/Header'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import {ClipLoader} from 'react-spinners'
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio'
import PostFeed from '@/components/posts/PostFeed'


const Userview = () => {
    const router = useRouter()
    const {userId} = router.query
    console.log(router.query);
    
    const {data:fetchedUser,isLoading} = useUser(userId as string)
    console.log("fetch" + fetchedUser)
    if(isLoading || !fetchedUser){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80}/>
                
            </div>
        )
    }

    return (
        <div>
            <Header label={fetchedUser?.name} showBackArrow/>
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            <PostFeed userId={userId as string}/>
        </div>
    )
}

export default Userview