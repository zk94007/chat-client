import React from "react";
import {shallow} from 'enzyme';
import ChatMenu from "./ChatMenu";

describe("<ChatMenu />", () => {
  let wrapper;
  const props = {
    participants: ["test1", "test2", "test3"],
    channel: { isOperatorWithUserId: jest.fn() }, //get this to return true
    sb: { getCurrentUserId: jest.fn() },
    history: {},
  };

  beforeEach(() => {
    wrapper = shallow(<ChatMenu {...props} />);
    })

  test("does it render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

});
