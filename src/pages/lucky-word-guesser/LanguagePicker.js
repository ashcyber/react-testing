import React from "react";

export default function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: "en", symbol: "🇺🇸" },
    { code: "emoji", symbol: "😊" },
  ];

  const languageIcons = languages.map((lang) => (
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  ));

  return <div data-test="component-language-picker">{languageIcons}</div>;
}
