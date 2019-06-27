import React from "react";
import { shallow } from "enzyme";
import CreateChannelButton from "./CreateChannelButton";
import sinon from "sinon";

describe("<CreateChannelButton />", () => {
  let wrapper;

  const props = {
    sb: {},
    history: {},
    enterChannel: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<CreateChannelButton {...props} />);
  });

  test("it renders only the button when isOpen=false", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("it renders the Dialog when isOpen=true/ + button has been clicked", () => {
    wrapper.setState({
      isOpen: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  test("entering a channel name into the dialog updates state->channelName", () => {
    wrapper.setState({
      isOpen: true
    });
    const inputField = wrapper.find({ label: "Channel Name" });
    expect(inputField).toHaveLength(1);
    inputField.simulate("change", { target: { value: "test channel" } });
    expect(wrapper.state().channelName).toEqual("test channel");
  });

  test("clicking the create channel button triggers the createChannel function", () => {
    const spy = sinon.spy(wrapper.instance(), "createChannel");
    wrapper.setState({
      isOpen: true
    });
    const createButton = wrapper.find({ id: "createChannel" });
    expect(createButton).toHaveLength(1);
    createButton.simulate("click");
    //console.log(spy.returned(null));
    expect(spy.called).toBe(true);
  });

});
