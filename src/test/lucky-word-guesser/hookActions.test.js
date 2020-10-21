import moxios from "moxios";

import "../../pages/lucky-word-guesser/actions/hookActions";
import { getSecretWord } from "../../pages/lucky-word-guesser/actions/hookActions";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("calls the getSecretWord callback on axios response", async () => {
    const secretWord = "test";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    /// create mock for callback arg
    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);

    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
