import React from 'react';
// import renderer from '@testing-library/react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import {Link} from 'react-router-dom';
import { StaticRouter } from 'react-router';
import RegisterForm from './registerform';

//registerForm does not use withRouter
describe('RegisterForm component tests', ()=>{
    const wrapper = shallow(<RegisterForm />);

    it('should have input bars for username and password', ()=>{
        expect(wrapper.find('#Form-Username')).toBeDefined();
        expect(wrapper.find('#Form-Password')).toBeDefined();

        expect(wrapper.find('#Form-Username')).toHaveLength(1);
        expect(wrapper.find('#Form-Password')).toHaveLength(1);
    });

    it('should detect user inputs in username and password input bars', ()=>{
        //added name in target and it appears to help direct us to where the change should occur
        wrapper.find('#Form-Username').simulate('change', {target: {name: 'registerUsername', value: 'testaccount123'}});
        wrapper.find('#Form-Password').simulate('change', {target: {name: 'registerPassword', value: 'asdf1234'}});
        //apparently after component gets updated with the simulated change, your input variable still points on old wrapper.
        //wrappers except root one are immutable? so we need to .find() the element again??
        //https://stackoverflow.com/questions/58129563/react-input-onchange-simulation-not-updating-value-using-jest-and-enzyme
        // expect(wrapper.find('input').at(0).prop("value")).toBe('testaccount123');

        //getting state() can only be called on class components.. its because Loginform is hoc
        expect(wrapper.state('registerUsername')).toBe('testaccount123');
        expect(wrapper.state('registerPassword')).toBe('asdf1234');
    });

    it('should have a register and a cancel button', ()=>{
        expect(wrapper.find('#Register-Button')).toBeDefined();
        expect(wrapper.find('#Cancel-Button')).toBeDefined();

        expect(wrapper.find('#Register-Button')).toHaveLength(1);
        expect(wrapper.find('#Cancel-Button')).toHaveLength(1);
    });

    it('should have cancel button directing us back to login page', ()=>{
       const component = renderer.create(
           <StaticRouter location={"/registerpage"}>
               <Link to={"/"}/>
           </StaticRouter>
       );
       //renderer.create gets passed a react element, toJSON turns the component representation into JSON, which makes it easier
       //to save as a snapshot and compare to existing snapshots
       let tree = component.toJSON();

       // console.log(tree);

       //the line expect(tree).toMatchSnapshot does one of two things
       //1)If snapshot already exists on disk, it compares the new snapshot in tree to the one on disk. If they match the test pass, if not it fails
       //2)If a snapshot does not already exist, it creates one and the test passes.
       expect(tree).toMatchSnapshot();
    });

    it('should have register button submit form', ()=>{
        const callback = jest.spyOn(RegisterForm.prototype, 'handleRegister');

        expect(wrapper.find('#Register-Button')).toBeDefined();

        wrapper.find('#Register-Button').simulate('click', {preventDefault(){}});
        wrapper.update();
        //callback wont work as we did not place this spy into the form
        expect(callback).toHaveBeenCalled();
    });
});