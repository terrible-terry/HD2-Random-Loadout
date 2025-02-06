/*eslint-disable no-unused-vars*/
// @mui material components
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useMaterialUIController } from "../../context";

export default styled(TextField)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const { light,dark,grey, transparent, error: colorError, success: colorSuccess } = palette;
  const { pxToRem } = functions;

  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const disabledStyles = () => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: dark.main + " !important",
    },
    "& .MuiOutlinedInput-input.Mui-disabled": {
      "WebkitTextFillColor": grey[600] + " !important",
    },
    ".MuiInputLabel-root.Mui-disabled": {
      color: disabled && darkMode ? `${dark.text} !important` : light.text,

    },

  });

  // styles for the input with error={true}
  const errorStyles = () => ({

    "& .MuiInputBase-root": {
      backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `calc(100% - ${pxToRem(16)}) center`, // Ensures only vertical centering
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,
    paddingRight: pxToRem(24), // Adds space for the icon
    },
    "& .MuiOutlinedInput-root": {
      height: pxToRem(48), // Adjust the height to match the icon size
      lineHeight: pxToRem(48),
    },
    "& .MuiOutlinedInput-input": {
      padding: `${pxToRem(12)} ${pxToRem(16)} ${pxToRem(12)} ${pxToRem(16)}`,
    },
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorError.main,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colorError.main,
    },
  });

  // styles for the input with success={true}

  const successStyles = () => ({
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `calc(100% - ${pxToRem(16)}) center`, // Ensures only vertical centering
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,
    paddingRight: pxToRem(24), // Adds space for the icon
    "& .MuiOutlinedInput-root": {
      height: pxToRem(48), // Adjust the height to match the icon size
      lineHeight: pxToRem(48),
    },
    "& .MuiOutlinedInput-input": {
      padding: `${pxToRem(12)} ${pxToRem(16)} ${pxToRem(12)} ${pxToRem(16)}`,
    },
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorSuccess.main,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSuccess.main,
    },
  });

  return {
    backgroundColor: disabled && !darkMode ? `${grey[200]} !important` : transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(error && errorStyles()),
    ...(success && successStyles()),
    ...(disabled && disabledStyles()),
  };
});
