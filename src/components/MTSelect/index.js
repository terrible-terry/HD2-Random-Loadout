import { forwardRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MTSelectRoot from "components/MTSelect/MTSelectRoot";

const MDSelect = forwardRef(({ width,label, options, error, success, disabled, ...rest }, ref) => (
  <FormControl fullWidth sx={{display:"block"}}>
    {label && <InputLabel>{label}</InputLabel>}
    <MTSelectRoot
      {...rest}
      sx={{padding:"10px"}}
      ref={ref}
      ownerState={{ error, success, disabled }}
      disabled={disabled}
      label={label}
      width={width}
    >
      {options.map((option) => (
     <MenuItem key={option.value} value={option.value} title={option.title || ""}>
     {option.label}
   </MenuItem>
      ))}
    </MTSelectRoot>
  </FormControl>
));

MDSelect.defaultProps = {
  options: [],
  error: false,
  success: false,
  disabled: false,
  label: "",
};

MDSelect.propTypes = {
  label: PropTypes.string,
  width: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

export default MDSelect;
