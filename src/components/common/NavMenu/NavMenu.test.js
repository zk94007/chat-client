import React from "react";
import { shallow } from "enzyme";
import NavMenu from "./NavMenu";

describe("<NavMenu />", () => {
  test("it renders correctly", () => {
    let wrapper = shallow(<NavMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
