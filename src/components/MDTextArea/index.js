import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDTextAreaRoot from "components/MDTextArea/MDTextAreaRoot";

const MDTextArea = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDTextAreaRoot maxrows={10} {...rest} ref={ref} ownerState={{ error, success, disabled }} disabled={disabled} />
));

// Setting default values for the props of MDInput
MDTextArea.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDTextArea.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDTextArea;
