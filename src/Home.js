import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlogList from "./BlogList"
import { getBlogsAsync } from './redux/blogSlice';


const Home = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogsAsync())
  },[dispatch])

  return (
      <div className="Home">
        {/* {isLoading && <div>Loading.....</div>}
        {error && <div>{error}</div>} */}
        {blogs && <BlogList blogs={blogs} title="All Blogs" />}
      </div>
  );
}

export default Home;