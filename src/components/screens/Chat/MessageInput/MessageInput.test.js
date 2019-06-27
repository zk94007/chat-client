import React from "react";
import { shallow } from "enzyme";
import MessageInput from "./MessageInput";
import TextField from "@material-ui/core/TextField";

describe("<MessageInput />", () => {
  test("it renders correctly", () => {
    const wrapper = shallow(<MessageInput />).dive();
    console.log(wrapper.debug());
    expect(wrapper).toMatchSnapshot();
  });

  test("inputting a message updates component state", () => {
    const wrapper = shallow(<MessageInput />).dive();
    const textField = wrapper.find(TextField);
    expect(textField).toHaveLength(1);
    textField.simulate("change", { target: { value: "test message" } });
    expect(wrapper.state().message).toEqual("test message");
  });
});
