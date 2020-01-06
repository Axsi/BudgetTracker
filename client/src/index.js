import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import LoginPage from './components/loginpage/loginpage';
import RegisterPage from './components/loginpage/registerform';
import UserHub from './components/userhub/userhub';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/registerpage" component={RegisterPage}/>
            <Route path="/userhub" component={UserHub}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
