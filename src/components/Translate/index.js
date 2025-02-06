import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
