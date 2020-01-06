import React from 'react';
import {Link} from 'react-router-dom';
import '../../style/loginpage.css';

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerUsername: '',
            registerPassword: ''
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })

    }

    handleRegister(event){
        event.preventDefault();
        console.log("submit register");
        let data = {
            registerUsername: this.state.registerUsername,
            registerPassword: this.state.registerPassword
        };
        let fetchData = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json;charset=utf-8"}
        };
        fetch("/registerAccount", fetchData)
            .then(response=> response.json())
            .then(data=>{
                console.log("inside the return of fetch of /registerAccount");
                console.log(data);
                this.props.history.push(data.url);
            })

    }
    render(){
        return(
            <div id="Register-Form-Container">
                <div id="Register-Title">Register an account</div>
                <form id="Register-Form">
                    <div className="Form-Group">
                        <input id="Form-Username" name="registerUsername" onChange={this.handleChange}/>
                    </div>
                    <div className="Form-Group">
                        <input id="Form-Password" name="registerPassword" onChange={this.handleChange}/>
                    </div>
                    <div id="Form Buttons">
                        <input id="Register-Button" onClick={this.handleRegister} type="submit" value="Register"/>
                        <Link to={"/"} id="Cancel-Button">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}


export default RegisterForm;