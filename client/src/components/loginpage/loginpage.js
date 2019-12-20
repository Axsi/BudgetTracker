import React from 'react';
import LoginForm from './loginform';
import RegisterForm from './registerform';
import '../../style/loginpage.css';
import '../../style/foundation.css';

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Site-Content">
                <h1 id="App-Title">Budget Tracker</h1>
                <LoginForm />
            </div>
        )
    }
}

export default LoginPage;