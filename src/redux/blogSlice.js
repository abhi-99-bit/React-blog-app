import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ASYNC FUNCTION FOR GET BLOGS
export const getBlogsAsync = createAsyncThunk('blogs/getBlogsAsyc', async () => {
    const response = await fetch('http://localhost:7000/blogs');
    if(response.ok){
        const blogs = await response.json();
        return { blogs };
    }
});

// ASYNC FUNCTION FOR ADD NEW BLOGS
export const addBlogsAsync = createAsyncThunk('blogs/addBlogsAsyc', async (payload)=> {
    const response = await fetch('http://localhost:7000/blogs',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({title: payload.title, body: payload.body, author:payload.author})
    });

    if(response.ok){
        const blog = await response.json()
        return { blog }
    }
})

const blogSlice = createSlice({
    name:'blogs',
    initialState: [],
    reducers:{
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {

        builder.addCase(getBlogsAsync.fulfilled, (state, action)=> {
            return action.payload.blogs;
        });

        builder.addCase(addBlogsAsync.fulfilled, (state, action) => {
            state.push(action.payload.blog);
        });
    }
})

export default blogSlice.reducer;