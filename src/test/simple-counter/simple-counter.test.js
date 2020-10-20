import React from "react";
import App from "../../pages/simple-counter";
import { shallow } from "enzyme";

const selector = (wrapper, attrName) => {
  const query = `[data-test='${attrName}']`;
  return wrapper.find(query);
};

test("render without error", () => {
  const wrapper = shallow(<App />);
  const appComponent = selector(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("render button", () => {
  const wrapper = shallow(<App />);
  const incBtn = selector(wrapper, "increment-button");
  const decBtn = selector(wrapper, "decrement-button");

  expect(incBtn.length).toBe(1);
  expect(decBtn.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = shallow(<App />);
  const counterDisplay = selector(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = shallow(<App />);
  const counter = selector(wrapper, "count");
  expect(counter.text()).toBe("0");
});

test("clicking on button increments counter display", () => {
  const wrapper = shallow(<App />);
  const incBtn = selector(wrapper, "increment-button");
  incBtn.simulate("click");

  const counter = selector(wrapper, "count");
  expect(counter.text()).toBe("1");
});

test("clicking on decrement decrements the counter display", () => {
  const wrapper = shallow(<App />);

  const incBtn = selector(wrapper, "increment-button");
  incBtn.simulate("click");

  const decBtn = selector(wrapper, "decrement-button");
  decBtn.simulate("click");

  expect(selector(wrapper, "count").text()).toBe("0");
});

test("counter cannot go below zero", () => {
  const wrapper = shallow(<App />);

  const decBtn = selector(wrapper, "decrement-button");
  decBtn.simulate("click");

  expect(selector(wrapper, "count").text()).toBe("0");
});
