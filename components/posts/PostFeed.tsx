import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'

type Props = {
    userId?:string
}

const PostFeed:React.FC<Props> = ({userId}) => {
    const {data:posts = []} = usePosts(userId)

  return (
    <div>
        {posts.map((post:Record<string,any>,)=>(
            <PostItem
                userId={userId}
                key={post.id}
                data={post}
            />
        ))}
    </div>
  )
}

export default PostFeed