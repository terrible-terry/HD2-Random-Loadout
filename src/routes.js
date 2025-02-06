
import MaterialsDetails from "layouts/MaterialsDetails";



import Contact from "layouts/Contact";

import Marketing from "layouts/Marketing";
// @mui icons
import Icon from "@mui/material/Icon";
//import { Collapse } from "@mui/material";
const Homepage = "";
const routes = [

  {
    type: "collapse",
    name: "contact",
    key: "contact",
    icon: <Icon fontSize="small">content_cut</Icon>,
    route: Homepage + "/Home/contact",
    display: false,

    component: <Contact />,
  },
{
    type: "collapse",
    name: "Sales",
    key: "sales",
    icon: <Icon fontSize="small">content_cut</Icon>,
    route: Homepage + "/Home",
    display: false,
    component: <Marketing />,
  },


  {
    type: "collapse",
    name: "MaterialDetails",
    key: "materialDetails",
    icon: <Icon fontSize="small">inventory_2</Icon>,
    route: Homepage + "/Material/:materialId",
    access:1,
    display: false,
    component: <MaterialsDetails />,
  },

];

export default routes;
