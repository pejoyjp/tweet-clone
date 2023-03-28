import Form from '@/components/Form'
import Header from '@/components/Header'
import PostItem from '@/components/posts/PostItem'
import usePost from '@/hooks/usePost'
import { useRouter } from 'next/router'
import React from 'react'
import { ClipLoader } from 'react-spinners'
import CommentFeed from '@/components/posts/CommentFeed'

type Props = {}

const postView = (props: Props) => {
    const router = useRouter()
    const {postId} = router.query
    const {data:fetchedPost,isLoading} = usePost(postId as string)
    if(isLoading || !fetchedPost){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80}/>
            </div>
        )
    }
  return (
    <div>
        <Header label='Tweet' showBackArrow/>
        <PostItem data={fetchedPost}  />
        <Form postId={postId as string} 
                isComment
                placeholder='Tweet your reply'
        />
        <CommentFeed comments={fetchedPost?.comments} />
    </div>
  )
}

export default postView