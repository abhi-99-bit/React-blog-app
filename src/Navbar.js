import { Link } from "react-router-dom";
const Navbar = () => {
    return ( 
    <nav className="navbar">
        <h1>The Dojo Blog</h1>
        <div className="link">
            <Link to="/">Home</Link>
            <Link to="/createBlog">New Blog</Link>
        </div>
    </nav>
    );
}

export default Navbar;