// react-router-dom components
//import { Link } from "react-router-dom";

// @mui material components

// Material Kit 2 React components
//import MKBox from "components/MKBox";
import { Link } from "react-router-dom";
import MKTypography from "components/MDTypography";
import { Container, Grid, Card } from "@mui/material";

import CardBG1 from "../../../assets/images/Feature_Image4.jpg";
import CardBG2 from "../../../assets/images/Feature_Image2.jpg";
import CardBG3 from "../../../assets/images/Feature_Image.jpg";
// Data
const features = [
  {
    title: "Optimize Bar Stock Material",
    description: "Maximize material usage with precise cut planning for bar stock materials.",
    imgUrl: CardBG1,
    Link: "/Home/Features",
  },
  {
    title: "Custom Saw Kerf Settings",
    description: "Account for custom saw kerf settings to ensure every cut is perfect.",
    imgUrl: CardBG2,
    Link: "/Home/Features",
  },
  {
    title: "Factory Edge Precision",
    description: "Automatically set material ends for clean, factory-edge finishes.",
    imgUrl: CardBG3,
    Link: "/Home/Features",
  },
];
const FeaturedSection = () => {
  return (
    <Container sx={{ py: 8 }}>
      <MKTypography variant="h4" align="center" gutterBottom>
        Key Features
      </MKTypography>
      <Grid container spacing={4} direction="column" alignItems="flex-start">
        {features.map((feature, index) => (
          <Grid item xs={12} key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Card
                  component={Link}
                  to={feature.Link}
                  sx={{
                    width: "150px",
                    height: "150px",
                    backgroundImage: `url(${feature.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 2,
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <div>
                  <MKTypography
                    variant="h6"
                    color="textPrimary"
                    fontWeight="bold"
                    sx={{ marginBottom: 1 }}
                  >
                    {feature.title}
                  </MKTypography>
                  <MKTypography variant="body2" color="textSecondary">
                    {feature.description}
                  </MKTypography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedSection;
