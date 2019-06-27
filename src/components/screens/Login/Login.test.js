import React from "react";
import {shallow} from 'enzyme';
import Login from "./Login";


describe("<Login />", () => {

    const props = {
        history: {},
        setSB: jest.fn(),
    }

    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<Login {...props} />).dive();
    })

    test("it renders", () => {
        const usernameTextField = wrapper.find({id: "username"});
        const loginButton = wrapper.find({id: "loginButton"});
        expect(usernameTextField).toHaveLength(1);
        expect(loginButton).toHaveLength(1);
    })

    test("the entire login page renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    })

    test("updating username is reflected in state", () => {
        const usernameTextField = wrapper.find({id: "username"});
        usernameTextField.simulate("change", { target: { value: 'test123'}});
        expect(wrapper.state().username).toEqual('test123');       
    })

})