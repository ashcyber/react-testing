import React from "react";
import hookActions from "./actions/hookActions";
import Input from "./Input";
import languageContext from "./contexts/languageContexts";
import LanguagePicker from "./LanguagePicker";

function reducer(state, action) {
  switch (action) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function LuckyWordGuesser() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });
  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return <div data-test="spinner"></div>;
  }

  return (
    <div data-test="component-app">
      <h1>Lucky Word App</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </languageContext.Provider>
    </div>
  );
}

export default LuckyWordGuesser;
