import { readFileSync } from "node:fs";

function getGrammarJson(lang) {
  return JSON.parse(
    readFileSync(
      new URL(`./${lang}.tmLanguage.json`, import.meta.url),
      "utf-8",
    ),
  );
}

export const jq = getGrammarJson("jq");
export const ignore = getGrammarJson("ignore");
