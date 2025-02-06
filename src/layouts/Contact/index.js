import React, { useState,useContext } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footer";
import routes from "routes";
import footerRoutes from "footer.routes";
import bgImage from "layouts/Marketing/imgs/Hero_Features.png";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { AuthContext } from "context";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);


  const { sendMail } = useContext(AuthContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const result = await  sendMail(formData.name, formData.email, formData.message);
        setResponse(result.data); // Use the response from your function
      } catch (error) {
        console.error("Error sending email:", error);
        setResponse({ success: false, message: "Failed to send email." });
      } finally {
        setLoading(false);
      }
    };



  return (
    <>
      <DefaultNavbar routes={routes} light={true} sticky />
      <MDBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MDTypography
              variant="h1"
              color="white"
              mt={-5}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["2xl"],
                },
                padding: "1rem",
                borderRadius: "2rem",
                textShadow:
                  "0 1px 7px #000, 0 1px 7px #000, 0 3px 7px #000,0 3px 7px #000, 0 3px 7px #000",
              })}
            >
              Explore Our Powerful Features
            </MDTypography>
            <MDTypography
              variant="body1"
              color="white"
              textAlign="top"
              px={{ xs: 6, lg: 12 }}
              sx={{
                padding: "1rem",
                borderRadius: "2rem",
                textShadow:
                  "0 1px 7px #000, 0 1px 7px #000, 0 3px 7px #000,0 3px 7px #000, 0 3px 7px #000",
              }}
              mt={1}
            >
              See how our application can streamline your workflows with ease and efficiency.
            </MDTypography>
          </Grid>
        </Container>
      </MDBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -16,
          mb: 0,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <MDBox pt={18} pb={6}>
          <Container>
            <MDBox display="flex" flexDirection="column" alignItems="center" p={4}>
              <MDTypography variant="h4" fontWeight="bold" mb={2}>
                Contact Us
              </MDTypography>
              <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="text"
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="email"
                    label="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </MDBox>
        
                <MDBox mb={2}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                    rows="6"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  />
                </MDBox>
                <MDBox display="flex" justifyContent="center">
                  <MDButton type="submit" variant="gradient" color="info">
                    Send
                  </MDButton>
                </MDBox>
                {status && (
                  <MDBox mt={2}>
                    <MDTypography
                      variant="caption"
                      color={status.includes("successfully") ? "success" : "error"}
                    >
                      {status}
                    </MDTypography>
                  </MDBox>
                )}
              </form>
            </MDBox>
          </Container>{" "}
        </MDBox>
      </Card>
      <MDBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MDBox>
    </>
  );
}

export default ContactForm;
