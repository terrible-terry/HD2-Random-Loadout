// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import Linkedin from "@mui/icons-material/LinkedIn";

import MKTypography from "components/MDTypography";

// Images
import logoCT from "assets/images/logos/WALTEK.svg";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Waltek Company Ltd.",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/CreativeTim/",
    },
    {
      icon: <Linkedin />,
      link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    },
  ],
  menus: [
    {
      name: "company",
      items: [{ name: "about us", href: "https://www.waltekltd.com/Home" }],
    },
    {
      name: "help & support",
      items: [{ name: "contact us", href: "https://www.waltekltd.com/contact-us" }],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "https://www.waltekltd.com/terms" },
        { name: "privacy policy", href: "https://www.waltekltd.com/privacy" },
        { name: "licenses (EULA)", href: "https://www.waltekltd.com/license" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} by{" "}
      <MKTypography
        component="a"
        href="https://www.waltekltd.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Waltek Company Ltd
      </MKTypography>
      .
    </MKTypography>
  ),
};
