import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../utils/testUtils.js";
import LuckWordApp from "../../pages/lucky-word-guesser";

const setup = () => {
  return shallow(<LuckWordApp />);
};

test("App renders correctly ", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});
