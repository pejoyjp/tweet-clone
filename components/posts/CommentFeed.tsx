import React from 'react'
import CommentItem from './CommentItem'

type Props = {
    comments?:Record<string,any>[]
}

//no need question mark 
const CommentFeed:React.FC<Props> = ({comments=[]}) => {

  return (
    <>
        {comments?.map((comment)=>(
            <CommentItem key={comment.id} data={comment} />
        ))}
    </>
  )
}

export default CommentFeed