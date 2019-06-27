import React from "react";
import { shallow } from "enzyme";
import LoginButton from "./LoginButton";
import sinon from "sinon";

describe("<LoginButton />", () => {
  let wrapper;
  const props = {
    history: {},
    username: "test",
    setSB: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<LoginButton {...props} />);
  });

  test("renders correctly", () => {
    const button = wrapper.find({ id: "loginButton" });
    expect(button).toHaveLength(1);
  });

  test("onClick works as expected with username", () => {
    const button = wrapper.find({ id: "loginButton" });
    const spy = sinon.spy(wrapper.instance(), "connectToSendbird");
    button.prop("onClick")();
    expect(spy.called).toBe(true);
    expect(spy.calledWith('test')).toEqual(true);
  });

  test("onClick works as expected without username", () => {
    props.username = '';
    let wrapper = shallow(<LoginButton {...props} />);
    const button = wrapper.find({ id: "loginButton" });
    const spy = sinon.spy(wrapper.instance(), "connectToSendbird");
    button.prop("onClick")();
    expect(spy.called).toBe(false);
  });
});
