import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ASYNC FUNCTION FOR GET BLOGS
export const getBlogsAsync = createAsyncThunk('blogs/getBlogsAsyc', async () => {
    const response = await fetch('http://localhost:7000/blogs');
    if (response.ok) {
        const blogs = await response.json();
        return { blogs };
    }
});

// ASYNC FUNCTION FOR ADD NEW BLOGS
export const addBlogsAsync = createAsyncThunk('blogs/addBlogsAsyc', async (payload) => {
    const response = await fetch('http://localhost:7000/blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        // {title: payload.title, body: payload.body, author:payload.author}
    });

    if (response.ok) {
        const blog = await response.json()
        return { blog }
    }
})
// ASYNC FUCTION FOR GET CURRENT BLOG BY ID
export const getBlogByIdAsync = createAsyncThunk('blogs/getBlogByIdAsync', async (payload) => {
    console.log('hello there.........................................');
    const response = await fetch(`http://localhost:7000/blogs/${payload.id}`);
    if (response.ok) {
        const blog = await response.json();
        return { blog };
    }
})
// ASYNC FUCTION FOR DELETE BLOG BY ID
export const deleteBlogById = createAsyncThunk('blogs/deleteBlogById', async (payload) => {
    const response = await fetch(`http://localhost:7000/blogs/${payload.id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return { id: payload.id }
    }
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        getBlogById (state, action) {
            console.log("hello there", action.payload.id);
            state.filter((blog) => blog.id === action.payload.id)
        }
    },
    extraReducers: {
        [getBlogsAsync.fulfilled]: (state, action) => {
            return action.payload.blogs;
        },
        [addBlogsAsync.fulfilled]: (state, action) => {
            state.push(action.payload.blog);
        },
        [getBlogByIdAsync.fulfilled]: (state, action) => {
            return action.payload.blog;
        },
        [deleteBlogById.fulfilled]: (state, action) => {
            return state.filter(blog => blog.id !== action.payload.id)
        }
    }
})
export const { getBlogById } = blogSlice.actions;

export default blogSlice.reducer;