import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateBlog from './CreatBlog';
import BlogDetails from './BlogDetails';

function App() {
  // const title = 'welcome to blog site'
  return (
    <Router>
      <div className="App">
      <Navbar />
        <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/createBlog">
            <CreateBlog />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetails/>
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
