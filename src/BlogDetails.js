/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router";
import { getBlogById, deleteBlogById } from "./redux/blogSlice";
// import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const blog = useSelector((state) => state.blogs);
    const dispatch = useDispatch();
    const payload = {
        id: id
    }
    console.log(payload);
    dispatch(getBlogById(payload));
    // useEffect(()=> {

    // },[dispatch])

    const [isPending, setPending] = useState(false)
    const history = useHistory();
    const handleDeleteBlog = () => {
        setPending(false);
        const blogs = blog[0];
        dispatch(deleteBlogById(blogs));
        history.push('/')
    }
    return (
        <div className="blog-details">
            {/* { isLoading && <div>Loading....</div> }
            { error && <div>{error}</div>} */}
            {blog && (
                <article>
                    <h2>{blog[0].title}</h2>
                    <p>Written by {blog[0].author}</p>
                    <div>{blog[0].body}</div>
                    {/* {isPending && <button>Loading....</button>} */}
                    {!isPending && <button onClick={handleDeleteBlog}>Delete</button>}
                    <button>edit</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;