import { useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, error, isLoading} = useFetch('http://localhost:8000/blogs/'+ id);
    const [isPending, setPending] = useState(false)
    const history = useHistory();
    const handleDeleteBlog = () =>{
        setPending(false)
        fetch('http://localhost:8000/blogs/'+blog.id, {
            method: 'DELETE'
        }).then( () => {
            setPending(true)
            history.push('/')
        })
    }
    return ( 
        <div className="blog-details">
            { isLoading && <div>Loading....</div> }
            { error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by { blog.author}</p>
                    <div>{ blog.body}</div>
                    {isPending && <button>Loading....</button>}
                    {!isPending && <button onClick={handleDeleteBlog}>Delete</button>}
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;