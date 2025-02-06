

// Material Dashboard 2 React Base Styles
import colors from "assets/theme/base/colors";

const { info, dark, light,gradients } = colors;

const globals = {
  html: {
    scrollBehavior: "smooth",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important",
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${dark.main} !important`,
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.main} !important`,
  },
  ".bouncing-gradient div": {
    animation: "bounce 5s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55)",
    transition: "background-color 1s ease",
  },
  ".MuiTab-root.Mui-disabled": {
    color: `red !important`,
  },    
  "@keyframes bounce": {
    "0%, 100%": {
      backgroundColor: "#1f283e",
    },
    "25%": {
      backgroundColor: "#1a2035",
    },
    "50%": {
      backgroundColor: "#1a2035",
    },
    "75%": {
      backgroundColor: "#1a2035",
    },
  },
  "@keyframes slide": {
    "0%": {
      transform: "translateX(-25%)",
    },
    "100%": {
      transform: "translateX(25%)",
    },
  },
  ".bg": {
    animation: "slide 8s ease-in-out infinite alternate",
    backgroundImage: "linear-gradient(-60deg, #6c3 50%, #09f 50%)",
    bottom: "0",
    left: "-50%",
    opacity: ".5",
    position: "fixed",
    right: "-50%",
    top: "0",
    zIndex: "-1",
  },
  ".loading-container": {
    backgroundColor: light.main,
  },
  ".isDirty": {
    animation: "traceBorder 1s ease-out infinite",
    background:`linear-gradient(195deg, ${gradients.error.main}, ${gradients.error.state}) !important`,
  },
  ".bg2": {
    animationDirection: "alternate-reverse",
    animationDuration: "9s",
  },
  ".bg3": {
    animationDuration: "10s",
  },
  "& .MuiTablePagination-caption": {
    color: dark.main, // Adjust color based on darkMode
  },
  "& .MuiTablePagination-toolbar": {
    color: dark.main, // Adjust color based on darkMode
  },
  "& .MuiSelect-icon": {
    color: dark.main, // Adjust color based on darkMode
  },
  "@keyframes traceBorder": {
    "0%": {
      borderColor: "transparent",
      boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.6)",
    },
    "25%": {
      borderColor: "#FF4500",
      boxShadow: "0 0 0 5px rgba(255, 69, 0, 0.5)",
    },
    "50%": {
      borderColor: "#FF4500",
      boxShadow: "0 0 0 10px rgba(255, 69, 0, 0.4)",
    },
    "75%" :{
      borderColor: "#FF4500",
      boxShadow: "0 0 0 15px rgba(255, 69, 0, 0.3)",
    },
    "100%": {
      borderColor: "#FF4500",
      boxShadow: "0 0 0 20px rgba(255, 69, 0, 0)",
    },
  },
};

export default globals;
