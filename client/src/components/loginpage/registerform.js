import React from 'react';
import '../../style/loginpage.css';

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="Register-Form-Container">
                <div id="Register-Title">Register an account</div>
                <form id="Register-Form">
                    <div className="Form-Group">
                        <input id="Form-Username"/>
                    </div>
                    <div className="Form-Group">
                        <input id="Form-Password"/>
                    </div>
                    <div id="Form Buttons">
                        <input id="Register-Button" type="submit"/>
                        <button id="Cancel-Button">Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterForm;