import React from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";

const TermsAndConditionsModal = ({onAccept, onDecline }) => {


  return (
    <Card style={overlayStyle}>
      <MDBox >
        <h2>Terms and Conditions</h2>
        <MDTypography>
        
          By signing in, you agree to our{" "}
          <MDTypography
      component={Link}
      to="/terms-and-conditions"
           href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </MDTypography>
          . Please review them before proceeding.
        </MDTypography>
        <MDBox style={buttonContainerStyle}>
          <MDButton onClick={onAccept}>
            I Agree
          </MDButton>
          <MDButton onClick={onDecline}>
            Decline
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};


const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

TermsAndConditionsModal.propTypes = {

    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
  };

export default TermsAndConditionsModal;
