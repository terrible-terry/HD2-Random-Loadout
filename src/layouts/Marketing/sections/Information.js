import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MDBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import BackCard from "assets/images/Banner.webp";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={BackCard}
                video={"/images/banner.mp4"}
                icon="touch_app"
                title={
                  <>
                    Start Your Free
                    <br />
                    Trial Today!
                  </>
                }
                description="Experience Material Efficiency Like Never Before."
                sx={{ color: "green" }}
              />
              <RotatingCardBack
                image={BackCard}
                title="Sign Up"
                description="Sign up for a full featured free 7 day trial using email or Google Account"
                action={{
                  type: "internal",
                  route: "/authentication/sign-up",
                  label: "Sign Me Up!",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  sx={{
                    "&:hover .MuiPaper-root": {
                      transform: "scale(1.1) rotate(5deg)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                  icon="content_copy"
                  link="/Home/Features"
                  title="Cutlist Generation"
                  description="Create Accurate and Efficient Cutlists in Seconds."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  link="/Home/Features"
                  title="Special Part Markings"
                  description="Mark Miters and Add QR Codes for Easy Tracking."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  link="/Home/Features"
                  title="Import / Export"
                  description="Import parts using various file types, Export to excel. Export to CNC saw coming soon!"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  link="/Home/Features"
                  title="Multiple Optimizing Algorithms"
                  description="Choose between First Fit Decreasing(Fast) or Genetic Mutation Algorithm (Higher Yield)."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
