
import { useState, useEffect, useContext } from "react";
// @mui material components
import Menu from "@mui/material/Menu";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
// Material Dashboard 2 React context
import { AuthContext } from "context";

function DefaultNavbarMobile({ open, close }) {

  const { width } = open && open.getBoundingClientRect();
  const {AppcurrentUser}= useContext(AuthContext);
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if(AppcurrentUser){
      setLoggedIn(true);
    }

  }, [AppcurrentUser]);
  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <MDBox px={0.5}>
      <DefaultNavbarLink
            icon="apps"
            name="Features"
            route="/Home/Features"
     
          />
                <DefaultNavbarLink
            icon="attach_money"
            name="Pricing"
            route="/Home/Pricing"
     
          />
          <DefaultNavbarLink
          icon="support_agent"
          name="Support"
          route="/Home/Support"
       
        />
         
        {!LoggedIn && <DefaultNavbarLink
            icon="login"
            name="sign in"
            route="/authentication/sign-in"

          />}
          
          
          {!LoggedIn &&
          <DefaultNavbarLink
          icon="how_to_reg"
          name="sign up"
          route="/authentication/sign-up"

        />}
             {LoggedIn &&
              <DefaultNavbarLink icon="donut_large" name="subscription" route="/subscription" light={false} />}
                {LoggedIn && <DefaultNavbarLink icon="person" name="profile" route="/Account" light={false} />}
                {LoggedIn &&
              <DefaultNavbarLink
            icon="exit_to_app"
            name="Start Cutting"
            route="/optimizer"
   
          />}
      </MDBox>
    </Menu>
  );
}


export default DefaultNavbarMobile;
