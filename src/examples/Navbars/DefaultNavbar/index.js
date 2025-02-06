/*eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import GoogleTranslate from "../../../components/Translate";
// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";
import breakpoints from "assets/theme/base/breakpoints";

// Material Dashboard 2 React context
import { useMaterialUIController, AuthContext } from "context";

function DefaultNavbar({ transparent = false, light = false, action = false, sticky = false }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { AppcurrentUser } = useContext(AuthContext);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }
    if (AppcurrentUser) {
      setLoggedIn(true);
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, [AppcurrentUser]);

  return (
    <Container
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
      }}
    >
      <MDBox
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={3}
        mx={3}
        width="calc(100% - 48px)"
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { gradients }, functions: { rgba } }) => ({
          backgroundImage: `linear-gradient(45deg, ${rgba(gradients.info.state, 0.9)}, ${rgba(
            gradients.info.main,
            0.9
          )})`, // Apply transparency to the gradient
          backdropFilter: `blur(2px) !important`,
          WebkitBackdropFilter: "blur(2px) !important",
        })}
      >
        <MDBox
          component={Link}
          to="/"
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          pl={{ xs: 0, lg: 1 }}
        >
          <MDTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Optim
          </MDTypography>
          <GoogleTranslate />
        </MDBox>
        <MDBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink icon="apps" name="Features" route="/Home/Features" light={light} />
          <DefaultNavbarLink
            icon="attach_money"
            name="Pricing"
            route="/Home/Pricing"
            light={light}
          />
          <DefaultNavbarLink
            icon="support_agent"
            name="Support"
            route="/Home/Support"
            light={light}
          />

          {!LoggedIn && (
            <>
              <DefaultNavbarLink
                icon="login"
                name="sign in"
                route="/authentication/sign-in"
                light={light}
              />
              <DefaultNavbarLink
                icon="how_to_reg"
                name="sign up"
                route="/authentication/sign-up"
                light={light}
              />
            </>
          )}
          {LoggedIn && (
            <>
              <DefaultNavbarLink
                icon="donut_large"
                name="subscription"
                route="/subscription"
                light={light}
              />
              <DefaultNavbarLink icon="person" name="profile" route="/Account" light={light} />
              <DefaultNavbarLink
                icon="exit_to_app"
                name="Start Cutting"
                route="/optimizer"
                light={light}
              />
            </>
          )}
        </MDBox>
        {action &&
          (action.type === "internal" ? (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
              >
                {action.label}
              </MDButton>
            </MDBox>
          ) : (
            <MDBox display={{ xs: "none", lg: "inline-block" }}>
              <MDButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                sx={{ mt: -0.3 }}
              >
                {action.label}
              </MDButton>
            </MDBox>
          ))}
        <MDBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </MDBox>
      </MDBox>
      {mobileView && (
        <DefaultNavbarMobile light={light} open={mobileNavbar} close={closeMobileNavbar} />
      )}
    </Container>
  );
}

export default DefaultNavbar;
