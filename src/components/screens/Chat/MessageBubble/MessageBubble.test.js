import React from "react";
import { shallow } from "enzyme";
import MessageBubble from "./MessageBubble";

describe("<MessagesDisplay />", () => {
  test("messages from 'sender: You' render correctly", () => {
    const props = {
      sender: "You",
      message: "test-you"
    };
    const wrapper = shallow(<MessageBubble {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("messages from 'sender: someoneElse' render correctly", () => {
    const props = {
      sender: "someoneElse",
      message: "other-test"
    };
    const wrapper = shallow(<MessageBubble {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("messages from 'info' render correctly", () => {
    const props = {
      sender: "info",
      message: "someone has left"
    };
    const wrapper = shallow(<MessageBubble {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
