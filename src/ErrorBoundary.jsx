import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoBack = async () => {
    const { navigate } = this.props;
    if (window.history.length > 1) {
      navigate(-1); // Navigate back
      // To ensure the user is seeing the latest version of the page
      setTimeout(() => {
        window.location.reload(); // Reload the page after navigating back
      }, 100); // Small delay to allow for navigation
    } else {
      navigate("/", { replace: true });
      setTimeout(() => {
        window.location.reload(); // Reload the page if at the home page
      }, 100);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" color="error" gutterBottom>
              Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              We're sorry for the inconvenience. You can try refreshing the page or go back to the previous page.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleRefresh}
              >
                Refresh Page
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleGoBack}
              >
                Go Back
              </Button>
            </Box>
            <Box
              component="details"
              sx={{
                mt: 3,
                textAlign: "left",
                bgcolor: "#f9f9f9",
                p: 2,
                borderRadius: 2,
                border: "1px solid #ddd",
              }}
            >
              <summary>Error Details</summary>
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", mt: 1 }}
              >
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </Typography>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withRouter(ErrorBoundary);
