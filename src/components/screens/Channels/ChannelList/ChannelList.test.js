import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import ChannelList from "./ChannelList";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";

describe("<ChannelList />", () => {
  const props = {
    channels: [
      { name: "test-channel1", url: "www.test1.com" },
      { name: "test-channel2", url: "www.test2.com" },
      { name: "test-channel3", url: "www.test3.com" }
    ], 
    history: {},
    enterChannel: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ChannelList {...props} />).dive();
  });

  test("it renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("it renders the correct number of items", () => {
    const list = wrapper.find(List);
    expect(list).toHaveLength(1);
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(3);
  });

  test("handleClick is called when clicking on a list item", () => {
    const spy = sinon.spy(wrapper.instance(), "handleClick");
    const button1 = wrapper.find({ "data-testid": "test-channel10" }).dive();
    expect(button1).toHaveLength(1);
    console.log(button1.debug());
    button1.simulate("click");
    expect(spy.called).toBe(true);
  });

});
