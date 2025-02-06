import { useState } from "react";


// @mui material components
import Fade from "@mui/material/Fade";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the MDAlert
import MDAlertRoot from "components/MDAlert/MDAlertRoot";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

function MDAlert({ color="info", dismissible=false, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MDAlertRoot ownerState={{ color }} {...rest}>
        <MDBox display="flex" alignItems="center" color="white">
          {children}
        </MDBox>
        {dismissible ? (
          <MDAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MDAlertCloseIcon>
        ) : null}
      </MDAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}



export default MDAlert;
