import React from "react";
import {shallow} from 'enzyme';
import DeleteChannelButton from "./DeleteChannelButton";
import sinon from "sinon"; 

describe("<DeleteChannelButton />", ()=> {

    const props = {
        history: {},
        channel: { isOperatorWithUserId: jest.fn() }, 
        sb: { getCurrentUserId: jest.fn() }, 
        openSnackbar: jest.fn(),
      };


    test("it renders", () => {
        const wrapper = shallow(<DeleteChannelButton {...props} />).dive();
        const button = wrapper.find({id: "deleteChannel"});
        expect(wrapper).toBeDefined();
        expect(button).toHaveLength(1);
    }) 

    
    test("it's not disabled for operators", () => {
        props.channel.isOperatorWithUserId = jest.fn(x => true);
        const wrapper = shallow(<DeleteChannelButton {...props} />).dive(); 
        const button = wrapper.find({ id: 'deleteChannel'});
        const spy = sinon.spy(wrapper.instance(), "deleteChannel");
        button.simulate('click');
        expect(spy.called).toBe(true);
    })

    test("it's disabled for non-operators", () => {
        props.channel.isOperatorWithUserId = jest.fn(x => false);
        const wrapper = shallow(<DeleteChannelButton {...props} />).dive(); 
        const button = wrapper.find({ id: 'deleteChannel'});
        const spy = sinon.spy(wrapper.instance(), "deleteChannel");
        button.prop('onClick')();
        //console.log(spy.calledWith());
        expect(spy.called).toBe(false);
    })
})