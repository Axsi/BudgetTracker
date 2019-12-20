import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../style/loginpage.css';

class LoginForm extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div id="Login-Form-Container">
                <div id="Sign-In-Title">Sign in with username</div>
                <form id="Login-Form">
                    <div className="Form-Group">
                        <input id="Form-Username" type="username" name="username" placeholder="Username" maxLength="30"/>
                    </div>
                    <div className="Form-Group">
                        <input id="Form-Password" type="password" name="password" placeholder="Password" maxLength="30"/>
                    </div>
                    <div id="Form-Buttons">
                        <input id="Form-SignIn" type="submit"/>
                        <a id="Form-Register">Register</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginForm;