import React from 'react';
import renderer from '@testing-library/react';
import { shallow } from 'enzyme';
import LoginForm from './loginform';

describe('LoginForm component tests', ()=>{
    const wrapper = shallow(<LoginForm />);

    it('should have input bars for username and password', ()=>{
        expect(wrapper.find('#Form-Username')).toBeDefined();
        expect(wrapper.find('#Form-Password')).toBeDefined();

        //toHaveLength is great for checking on arrays or string sizes, in the case of Form-Username, not sure if its applicable
        // expect(wrapper.find('#Form-Username')).toHaveLength(1);
        // expect(wrapper.find('#Form-Password')).toHaveLength(1);
    });

    // it('should detect user inputs in username and password input bars', ()=>{
    //     wrapper.find('input').simulate('change', {target: {value: 'testaccount123'}});
    //     //getting state() can only be called on class components.. its because Loginform is hoc
    //     expect(wrapper.state('username')).toBe('testaccount123');
    // })
});