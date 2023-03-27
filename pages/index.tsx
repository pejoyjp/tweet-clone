import Form from "@/components/Form"
import Header from "@/components/Header"
import PostFeed from "@/components/posts/PostFeed"
export default function Home() {
  return (
   <div>
    <Header label='Home'/>
    <Form placeholder = "What's hapening" />
    <PostFeed/>
   </div>
  )
}




