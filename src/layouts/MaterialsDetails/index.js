import React, { useState, useEffect, useContext } from "react";
// @mui icons
import { useParams } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Loading from "components/Loading";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDTypography from "components/MDTypography";
// Overview page components
import Header from "./components/Header";

// Images

function Overview() {
  const [CurrentMaterial, setCurrentMaterial] = useState({});
  const [loading, setLoading] = useState(false);
  const { materialId } = useParams();
/*
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (Materials) {
          const Materialoptions = Materials.find((project) => project.id == materialId);

          if (Materialoptions) {
            setCurrentMaterial(Materialoptions);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        setLoading(false);
      }
    };
    fetchData();

  }, [Materials]);
*/
  if (loading) {
    return <Loading />;
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <MDTypography variant="h6" sx={{ fontSize: "24px" }} color="white">
              Material Details
            </MDTypography>
          </Grid>
        </Grid>
      </MDBox>
      <Header Projectdata={CurrentMaterial}></Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
