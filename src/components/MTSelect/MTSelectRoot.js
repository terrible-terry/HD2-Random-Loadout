/* eslint-disable no-unused-vars */
// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useMaterialUIController } from "../../context";

export default styled(Select)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const { light, dark, grey, transparent, error: colorError, success: colorSuccess } = palette;
  const { pxToRem } = functions;

  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const disabledStyles = () => ({
    "& .MuiSelect-select.Mui-disabled": {
      backgroundColor: darkMode ? dark.main : grey[200],
      color: darkMode ? dark.text : grey[600],
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: grey[400],
    },
  });

  const errorStyles = () => ({
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colorError.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: colorError.main,
    },
  });

  const successStyles = () => ({

  });

  return {
    backgroundColor: transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(error && errorStyles()),
    ...(success && successStyles()),
    ...(disabled && disabledStyles()),
    "& .MuiSelect-select": {
      padding: pxToRem(10),
    },
  };
});
