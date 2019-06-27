import React from "react";
import { shallow } from "enzyme";
import AlertDialog from './AlertDialog';

describe("<AlertDialog />", () => {

    let wrapper;

    let props = {
        showAlert: true,
        toggleAlert: jest.fn(),
        message: 'this is a test',
        title: 'test message'
    }
    beforeEach(()=>{
        wrapper = shallow(<AlertDialog {...props} />);
    })

    test('it renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
})