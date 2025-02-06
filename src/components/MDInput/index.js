import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled, type, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MDInputRoot
      {...rest}
      ref={ref}
      type={type === "password" && !showPassword ? "password" : "text"}
      ownerState={{ error, success, disabled }}
      InputProps={{
        ...rest.InputProps,
        endAdornment: type === "password" && (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
            sx={{
              marginRight: "8px", // Adjust this value as needed
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        ),
      }}
      disabled={disabled}
    />
  );
});

MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default MDInput;
