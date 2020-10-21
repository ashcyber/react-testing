import React from "react";
import { findByTestAttr } from "../../utils/testUtils.js";
import Input from "../../pages/lucky-word-guesser/Input";
import { shallow } from "enzyme";

const setup = (props = {}) => {
  return shallow(<Input {...props} />);
};

test("Input component renders correctly", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

describe("state controlled input field", () => {
  const mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });

  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "test" } };

    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("test");
  });

  test("field is cleared up submit button click", () => {
    const submitBtn = findByTestAttr(wrapper, "submit-button");

    submitBtn.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
