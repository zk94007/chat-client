import React from "react";
import { shallow } from "enzyme";
import MessagesDisplay from "./MessagesDisplay";
import MessageBubble from "../MessageBubble/MessageBubble";

describe("<MessagesDisplay />", () => {
  let wrapper;
  const props = {
    messages: [
      { sender: "You", message: "test-you" },
      { sender: "someoneElse", message: "other-test" },
      { sender: "info", message: "someone has left" }
    ]
  };

  beforeEach(() => {
    wrapper = shallow(<MessagesDisplay {...props} />).dive();
  });

  test("does it render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("it renders the correct number of message bubbles", () => {
    const MessageBubbles = wrapper.find(MessageBubble);
    expect(MessageBubbles).toHaveLength(3);
  });
});
