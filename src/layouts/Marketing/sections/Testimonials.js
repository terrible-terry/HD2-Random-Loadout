import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MDBox";
import MKTypography from "components/MDTypography";

// Material Kit 2 React examples
import DefaultReviewCard from "examples/Cards/ReviewCards/DefaultReviewCard";
import BoschLogo from "assets/images/logos/Bosch.svg";
import WaltekLogo from "assets/images/logos/WALTEK.svg";
// Images
import "../style.css";

function Information() {
  const Bosch = {
    src: BoschLogo,
    alt: "Bosch",
  };
  const Waltek = { src: WaltekLogo, alt: "Waltek" };

  const images = [Bosch, Waltek,Bosch, Waltek,Bosch, ];
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKTypography variant="h2" color="info" textGradient mb={2}>
            Trusted by Leading Manufacturers
          </MKTypography>
          <MKTypography variant="body1" color="text" mb={2}>
            Join the Many Businesses Optimizing Their Cutting Operations.
          </MKTypography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="John D."
              date="August 13, 2024"
              review="We've reduced material waste by 5% since using this software! The cutlists are incredibly accurate, and the ability to track each part with QR codes has revolutionized our process."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              color="info"
              name="Shailesh K."
              date="August 13, 2024"
              review="This software has been a game-changer for our operations. The management screens provide real-time updates on active cuts and part histories, allowing us to quickly identify and rectify any issues. We've saved both time and money."
              rating={5}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DefaultReviewCard
              name="David R."
              date="August 13, 2024"
              review="The special part markings and QR code features are fantastic. We can now easily track the history and specifications of each part, which has significantly improved our quality control process."
              rating={4.5}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 6 }} />
        <div className="logo-scroller">
      <div className="logo-wrapper">
        {[...images, ...images].map((image, index) => (  // Duplicating images
          <div key={index} className="logo-item">
            <MKBox component="img" src={image.src} alt={image.alt} width="15rem" opacity={0.6} />
          </div>
        ))}
      </div>
    </div>
      </Container>
    </MKBox>
  );
}

export default Information;
