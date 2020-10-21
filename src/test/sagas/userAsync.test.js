import SagaTester from "redux-saga-tester";
import rootReducer from "../../store/reducers";
import rootSaga from "../../store/sagas";
import * as actions from "../../store/actions/users";

const initialState = {
  users: {
    items: [],
    errorMessage: "",
  },
};

const waitForAllUsers = (tester) => {
  return Promise.race([
    tester.waitFor(actions.Types.GET_USERS_SUCCESS, true),
    tester.waitFor(actions.Types.USERS_ERROR, true),
  ]);
};

describe("test fetch users", () => {
  let sagaTester = null;

  beforeEach(async () => {
    sagaTester = new SagaTester({
      initialState,
      reducers: rootReducer,
      ignoreReduxActions: false,
    });
    sagaTester.start(rootSaga);
    sagaTester.reset();
    sagaTester.dispatch(actions.getUsersRequest());
    await waitForAllUsers(sagaTester);
  });

  test("get users should get a list of users array", async () => {
    const { users } = sagaTester.getState();
    expect(users.items).toBeTruthy();
    expect(users.errorMessage).toBeFalsy();
    sagaTester.reset(true);
  });

  test("error should be caught if invalid user is removed", async () => {
    sagaTester.dispatch(actions.deleteUserRequest("123"));
    await waitForAllUsers(sagaTester);
    const {
      users: { errorMessage },
    } = sagaTester.getState();
    expect(errorMessage).not.toBe("");
  });

  test("a valid user should be removed", async () => {
    sagaTester.dispatch(
      actions.createUserRequest({ firstName: "test", lastName: "tester" })
    );
    await waitForAllUsers(sagaTester);

    const [{ _id }] = sagaTester.getState().users.items;

    sagaTester.dispatch(actions.deleteUserRequest(_id));
    await waitForAllUsers(sagaTester);

    const afterDeleteItems = sagaTester.getState().users.items;
    expect(afterDeleteItems.find((v) => v._id === _id)).toBe(undefined);
  });

  test("user should be created correctly if all details are correct", async () => {
    const beforeCreateLength = sagaTester.getState().users.items.length;

    sagaTester.dispatch(
      actions.createUserRequest({ firstName: "test", lastName: "tester" })
    );
    await waitForAllUsers(sagaTester);

    const currentState = sagaTester.getState();
    const afterCreateLength = currentState.users.items.length;

    expect(beforeCreateLength).toBe(afterCreateLength - 1);
    expect(
      currentState.users.items.find(
        (v) => v.firstName === "test" && v.lastName === "tester"
      )
    ).not.toBe(undefined);
  });
});
