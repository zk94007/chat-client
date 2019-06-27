import React from "react";
import { shallow } from "enzyme";
import ParticipantsList from "./ParticipantsList";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

describe("<ParticipantsList />", () => {
  const props = {
    isOpen: true,
    toggle: jest.fn(),
    participants: ["One", "Two", "Three", "Four"]
  };

  test("it renders correctly", () => {
    const wrapper = shallow(<ParticipantsList {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  test("it renders the right number of items", () => {
    const wrapper = shallow(<ParticipantsList {...props} />).dive();
    const list = wrapper.find(List).dive();
    const listItem = list.find(ListItem);
    //console.log(list.dive().debug());
    expect(list).toHaveLength(1);
    expect(listItem).toHaveLength(4);
  });
});
