import React from 'react';
import menuButtons from '../hoc/menubuttons';
import menus from '../hoc/menus';
// import RegisterForm from './registerform';
import {Link, withRouter} from 'react-router-dom';
import '../../style/loginpage.css';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerUsername: '',
            registerPassword: '',
            username:'',
            password:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })

    }
    handleLogin(event){
        event.preventDefault();
        let data = {username: this.state.username, password: this.state.password};
        let fetchData = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };

        fetch('/login', fetchData)
            .then(response => response.json())
            .then(data=>{
                this.props.history.push({pathname: data.url, username: data.username, userID: data.userID})
            }).catch(err=> {
                console.log('Error: ' + err);
        })
    }
    render(){
        return(
            <div id="Login-Form-Container">
                <div id="Sign-In-Title">Sign in with username</div>
                <form id="Login-Form">
                    <div className="Form-Group">
                        <input id="Form-Username" type="username" name="username" placeholder="Username" maxLength="30"
                        onChange={this.handleChange}/>
                    </div>
                    <div className="Form-Group">
                        <input id="Form-Password" type="password" name="password" placeholder="Password" maxLength="30"
                        onChange={this.handleChange}/>
                    </div>
                    <div id="Form-Buttons">
                        <input id="Form-SignIn" type="submit" value="Login" onClick={this.handleLogin}/>
                        <Link to="/registerpage" id="Form-Register">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);