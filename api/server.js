const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let blogs = [
	{
		id: nanoid(),
		title: 'Learn React',
		body: 'Follow my steps  to learn every thing about react',
		author: "yoshi"
	},
	{
		id: nanoid(),
		title: 'Learn React part 2',
		body: 'Follow my steps  to learn every thing about react',
		author: "yoshi"
	},
	{
		id: nanoid(),
		title: 'Learn React part 3',
		body: 'Follow my steps  to learn every thing about react',
		author: "yoshi"
	},
	  
];

// get all blogs 
app.get('/blogs', (req, res) => res.send(blogs));

// add new blogs
app.post('/blogs', (req, res) => {
	const blog = { id: nanoid(), title: req.body.title, body: req.body.body, author: req.body.author};
	blogs.push(blog);
	return res.send(blog);
});

// get blog by id
app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;
	const index = blogs.findIndex((todo) => todo.id === id);
	const arr = [];
	arr.push(blogs[index])
	return res.send(arr);
});

// edit blog by id
app.patch('/blogs/:id', (req, res) => {
	const id = req.params.id;
	const index = blogs.findIndex((todo) => todo.id === id);
	const completed = Boolean(req.body.completed);
	if (index > -1) {
		blogs[index].completed = completed;
	}
	return res.send(blogs[index]);
});

// delete blog by id
app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id;
	const index = blogs.findIndex((todo) => todo.id === id);
	if (index > -1) {
		blogs.splice(index, 1);
	}
	res.send(blogs);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
