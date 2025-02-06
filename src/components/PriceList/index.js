import { useContext, useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./style.css"; // Import the CSS file
// Material Dashboard 2 React components
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import colors from "assets/theme-dark/base/colors";
import MDBox from "components/MDBox";
import { AuthContext } from "context";
import { useNavigate } from "react-router-dom";

function PriceCard({
  image,
  label,
  title,
  description,
  action,
  authors,
  selectPlan,
  sub,
  openCheck,
}) {
  const [isYearly, setIsYearly] = useState(0);
  const { CheckoutSession } = useContext(AuthContext);

  const navigate = useNavigate();

  
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: isYearly ? "$100/year" : "$10/month",
      priceID: isYearly ? "price_1QEsME07yZ3BH4Lp5dclllUO" : "price_1QEtTk07yZ3BH4LprhfMwypB",
      description: "Includes essential features for small projects.",
      features: [
        { name: "Up to 10 projects", included: true },
        { name: "Custom QR Codes for parts", included: true },
        { name: "Up to 100 Unique Material", included: true },
        { name: "Real-time collaboration and updates across devices" , included: true},
        { name: "Offline Functionality", included: true },

        { name: "Basic support", included: true },
        { name: "100 Unique parts per Cutlist", included: true },
        { name: "1000 Maximum parts per Cutlist", included: true },
        { name: "Automatic optimization of material cutting for minimal waste" , included: true},
        { name: "Support for various stock lengths and materials" , included: true},
        { name: "Batch processing for multiple cutting jobs" , included: true},
        { name: "Support for imperial and metric units" , included: true},
        { name: "User-friendly drag-and-drop interface for manual adjustments" , included: true},
        { name: "Exportable cutting plans in various formats (PDF, CSV, DXF)", included: true },
        { name: "Real-time inventory management for stock materials" , included: true},
        { name: "Notifications and alerts for job status or low inventory" , included: true},
        { name: "Detailed cutting plans with graphical visualization" , included: true},
        { name: "Adjustable priority for minimizing waste versus minimizing cuts" , included: true}
      ],
      isPopular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: isYearly ? "$300/year" : "$30/month",
      priceID: isYearly ? "price_1QEtT607yZ3BH4Lpcg2H52oJ" : "price_1QEtUG07yZ3BH4LpG6CmV7xN",
      description: "Advanced tools for growing businesses.",
      features: [
        { name: "Up to 100 projects", included: true },
        { name: "3000 Maximum parts per Cutlist", included: true },
        { name: "Custom QR Codes for parts", included: true },
        { name: "1Gb of Storage for Material Images", included: true },
        { name: "Offline Functionality", included: true },
        { name: "Basic support", included: true },
        { name: "Job cost estimation with material cost tracking", included: true },
        { name: "Customizable reports and analytics for material usage", included: true},

      ],
      isPopular: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom Pricing",
      priceID: "",
      href: "forward user to contact form",
      description: "Tailored solutions for large organizations.",
      features: [
        { name: "Custom Intergrations, Reports", included: true },
        { name: "Custom Workflows to match your business", included: true },
        { name: "CNC Post Processing", included: true },
        { name: "Custom domains", included: false },
        { name: "Multi-user collaboration with role-based access", included: true },
        { name: "Integration with ERP systems for seamless operations", included: true },
        { name: "Integration with CNC machines for automatic cutting" , included: true},
        { name: "Role-based audit logs for tracking changes" , included: true},
        { name: "Advanced settings for complex cutting rules", included: true },
        { name: "Job scheduling and prioritization", included: true },
        { name: "Customer and vendor portal for order and inventory tracking" , included: true},
        { name: "Multi-location inventory tracking for distributed warehouses" , included: true},
        { name: "Dynamic pricing updates based on material costs", included: true },
        { name: "Environmental impact tracking for sustainable cutting practices" , included: true},
        { name: "Custom branding for white-label solutions" , included: true},

      ],
      isPopular: false,
    },
  ];

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <div className="pricing-options-container">
        <div className="pricing-switch">
          <AppBar position="static">
            <Tabs
              sx={{ backgroundColor: `${colors["grey"]["300"]} !important` }}
              orientation="horizontal"
              value={isYearly}
              onChange={() => setIsYearly(isYearly === 0 ? 1 : 0)}
            >
              <Tab label="Monthly" sx={{ fontWeight: "bold" }} />
              <Tab label="Yearly" sx={{ fontWeight: "bold" }} />
            </Tabs>
          </AppBar>
        </div>

        <Grid container spacing={3} justifyContent="center" sx={{ ml: "-12px", mt: "12px" }}>
          {plans.map((plan, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={4} // Each plan takes 4 columns on medium screens and 12 on small screens
              className={`pricing-card ${plan.isPopular ? "popular" : ""} ${
                sub == plan.id ? "PlanSelected" : ""
              }`}
            >
              {plan.isPopular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">{plan.price}</p>
              <p className="plan-description">{plan.description}</p>
              <ul className="feature-list">
                {plan.features.map((feature, i) => (
                  <li key={i} className="feature-item">
                    {feature.name}{" "}
                    {feature.included ? (
                      <span className="checkmark">✔</span>
                    ) : (
                      <span className="xmark">✘</span>
                    )}
                  </li>
                ))}
              </ul>
              <button
                className="select-button"
                onClick={() => {
                  if (plan.price === "Custom Pricing") {
                    navigate("/Home/Contact");
                  } else {
                    CheckoutSession(plan.priceID);
                  }
                }}
              >
                {plan.price === "Custom Pricing"
                  ? "Contact Us"
                  : sub == plan.id
                  ? "Current Plan"
                  : "Select Plan"}
              </button>
            </Grid>
          ))}
        </Grid>
      </div>
    </Card>
  );
}

export default PriceCard;
