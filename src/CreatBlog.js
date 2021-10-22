import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBlogsAsync } from './redux/blogSlice';
const CreateBlog = () => {
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[author, setAuthor] = useState('mario');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // FOR REDIRECT THE USER AFTER ADDING BLOG
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const blog = { title, body, author};
        console.log(blog);
        dispatch(()=> {
            addBlogsAsync(blog)
        });
        setIsLoading(false);
        history.push('/');
        // fetch('http://localhost:8000/blogs',{
        //  method: 'post',
        //  headers: {"content-type": "application/json"},
        //  body: JSON.stringify(blog)
        // }).then(() => {
        //     console.log('New Blog Added')
        //     setIsLoading(false);
        //     history.push('/');
        // })
    }
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Tilte: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value) } required />
                <label>Blog body: </label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                <label>Blog Author</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {isLoading && <button>Adding Blog.....</button>}
                {!isLoading && <button>Add Blog</button>}
            </form>
        </div>
     );
}
 
export default CreateBlog;