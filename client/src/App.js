import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Create from "./components/create.component";
import Edit from "./components/edit.component";
import List from "./components/list.component";

function App() {
  return (
    <Router>
    <div className="container">
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
      <Route path="/" exact component={List} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create" component={Create} />
    </div>
    </Router>
  );
}

export default App;
