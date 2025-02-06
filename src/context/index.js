/*eslint-disable no-unused-vars*/
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Loading from "components/Loading";
import MDSnackbar from "components/MDSnackbar";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import themeDark from "../assets/theme";

import colors from "assets/theme-dark/base/colors";

// Material Dashboard 2 React main context
const MaterialUI = createContext();

export const AuthContext = createContext();
// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "Random Loadout Generator";
export const AuthProvider = ({ children }) => {

  const [warningSB, setWarningSB] = useState(false);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState();
  const closeWarningSB = () => setWarningSB(false);
  const [warningMess, setWarningMess] = useState([""]);

  const navigate = useNavigate();
  const renderWarningSB = (
    <ThemeProvider theme={themeDark}>
      <MDSnackbar
        color="warning"
        icon="star"
        title={warningMess[0]}
        content={warningMess[1] || ""}
        dateTime="now"
        open={warningSB}
        onClose={closeWarningSB}
        close={closeWarningSB}
      />
    </ThemeProvider>
  );


  const SBMess = (errorTitle, errorMessage) => {
    setWarningSB(true);
    setWarningMess([errorTitle, errorMessage]);
  };



  return (
    <AuthContext.Provider
      value={{

        SBMess,
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {children}
          {renderWarningSB}
        </>
      )}
    </AuthContext.Provider>
  );
};

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "CURRENT_USER": {
      return { ...state, CurrentUser: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const storedDarkState = localStorage.getItem("Dark") === "true";
  const storedColorState = localStorage.getItem("TabColor") || "info";
  const storedColorMatchState = localStorage.getItem("TabColorMatch") || "#49a3f1";
  const sidenavColorsMatch = ["#EC407A", "#42424a", "#49a3f1", "#66BB6A", "#FFA726", "#EF5350"];
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: storedColorState,
    sidenavColorMatch: storedColorMatchState,
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "subscription",
    CurrentUser: "",
    darkMode: storedDarkState,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  return context;
}

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setSidenavColorMatch = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setCurrentUser = (dispatch, value) => dispatch({ type: "CURRENT_USER", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  setCurrentUser,
  setDarkMode,
  setDirection,
  setFixedNavbar,
  setLayout,
  setMiniSidenav,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavColorMatch,
  setTransparentNavbar,
  setTransparentSidenav,
  setWhiteSidenav,
  useMaterialUIController,
};
