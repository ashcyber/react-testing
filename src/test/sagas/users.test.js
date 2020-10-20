import { createUser, deleteUser, getUsers } from "../../store/sagas/users";
import * as api from "../../api";
import * as actions from "../../store/actions/users";

import { call, put } from "redux-saga/effects";

describe("get users saga", () => {
  const result = { data: [] };

  test("it should work correctly", () => {
    const gen = getUsers();
    expect(gen.next().value).toEqual(call(api.getUsers));
    expect(gen.next(result).value).toEqual(
      put(actions.getUsersSuccess({ items: result.data }))
    );
  });

  test("it should handle error correctly", () => {
    const gen = getUsers();
    expect(gen.next().value).toEqual(call(api.getUsers));
    expect(gen.throw(new Error("get users error")).value).toEqual(
      put(actions.usersError({ errorMessage: "get users error" }))
    );
  });
});

describe("create users", () => {
  const action = { payload: { firstName: "test", lastName: "testing" } };

  test("it should work correctly", () => {
    const gen = createUser(action);
    expect(gen.next().value).toEqual(
      call(api.createUser, { ...action.payload })
    );
    expect(gen.next().value).toEqual(call(getUsers));
  });

  test("it should handle error correctly", () => {
    const gen = createUser(action);
    expect(gen.next().value).toEqual(
      call(api.createUser, { ...action.payload })
    );
    expect(gen.throw(new Error("create users error")).value).toEqual(
      put(actions.usersError({ errorMessage: "create users error" }))
    );
  });
});

describe("delete user", () => {
  const uid = "123";

  test("it should work correctly", () => {
    const gen = deleteUser({ userId: uid });
    expect(gen.next().value).toEqual(call(api.deleteUser, uid));
    expect(gen.next().value).toEqual(call(getUsers));
  });

  test("it should handle error correctly", () => {
    const gen = deleteUser({ userId: uid });
    expect(gen.next().value).toEqual(call(api.deleteUser, uid));

    expect(gen.throw(new Error("delete users error")).value).toEqual(
      put(actions.usersError({ errorMessage: "delete users error" }))
    );
  });
});
