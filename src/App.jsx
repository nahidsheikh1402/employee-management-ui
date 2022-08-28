import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListEmployeeComponent from './pages/ListEmployeeComponent';
import HeaderComponent from './pages/HeaderComponent';
import FooterComponent from './pages/FooterComponent';
import CreateEmployeeComponent from './pages/CreateEmployeeComponent';
import ViewEmployeeComponent from './pages/ViewEmployeeComponent';
function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListEmployeeComponent}></Route>
            <Route path="/employees" component={ListEmployeeComponent}></Route>
            <Route path="/update-employee/:id" component={CreateEmployeeComponent}></Route>
            <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
            <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
