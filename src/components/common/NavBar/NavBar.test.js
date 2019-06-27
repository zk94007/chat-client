import React from "react";
import { shallow } from "enzyme";
import NavBar from "./NavBar";

describe("<NavMenu />", () => {
  test("it renders correctly", () => {
    let wrapper = shallow(<NavBar />).dive();
    expect(wrapper).toMatchSnapshot();
  })
})