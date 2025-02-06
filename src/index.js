

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context";
import ErrorBoundary from "./ErrorBoundary";

const container = document.getElementById("app");
const root = createRoot(container);
function addGoogleTranslateScript() {
  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}
const applyCustomStyles = () => {
  const menuFrame = document.querySelector("div.goog-te-gadget-simple");
  if (menuFrame) {
    menuFrame.style.borderRadius = "1rem";
  }
};

function googleTranslateElementInit() {
  if (window.google && window.google.translate) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,fr,de,es,it,ja,zh-CN",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        gadget: true,
      },
      "google_translate_element"
    );
    applyCustomStyles();
  }
}

window.googleTranslateElementInit = googleTranslateElementInit;
addGoogleTranslateScript();

root.render(
  <BrowserRouter>
   <ErrorBoundary>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
    </ErrorBoundary>
  </BrowserRouter>
);

serviceWorkerRegistration.register();
