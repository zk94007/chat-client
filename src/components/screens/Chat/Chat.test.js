import React from "react";
import { shallow } from "enzyme";
import Chat from './Chat';

describe("<Chat />", () => {
    let wrapper;
    const props = {
        channel: {name: 'test-channel'}, 
        sb: {},
        history: {},
    }

    beforeEach(() => {
        wrapper = shallow(<Chat {...props} />).dive();
    })

    test("it renders a loading spinner while loading", () => {
        expect(wrapper).toMatchSnapshot();
    })

    test("it renders after loading", () => {
        wrapper.setState({ 
            loading: false, 
            channel: {},
            channelName: 'test-channel'
        })
        expect(wrapper).toMatchSnapshot();
    })
})