import React, { useState,useEffect } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";


const CodeBlock = ({ code,bgcolor, bgcolorGrad }) => {
  const [copied, setCopied] = useState(false);
  const [contrastColor, setcontrastColor] = useState("#fff");

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset tooltip after 2 seconds
    });
  };
  const getContrastColor = (bgColor) => {
    const hex = bgColor.startsWith('#') ? bgColor.slice(1) : bgColor; // Remove the '#' if present
    const rgb = parseInt(hex, 16); // Convert hex to an integer
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
  
    // Calculate luminance using the formula
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
    // Return either light or dark text based on luminance
    return luminance > 128 ? "#000000" : "#ffffff"; // Dark background => light text, Light background => dark text
  };

  useEffect(() => {
    setcontrastColor(getContrastColor(bgcolor));
  }, []);


  return (
    <Box
    backgroundColor={bgcolor}
    sx={{
      position: "relative",
      p: 2,
      backgroundImage: bgcolorGrad, // Apply the gradient as background image
      color: contrastColor, // Use calculated contrast color
      borderRadius: 1,
      border: "1px solid",
      borderColor: "divider",
      fontFamily: "monospace",
      overflowX: "auto",
      mt: "5px",
      boxShadow: "0px 3px 3.05px rgba(0, 0, 0, 0.17)", // Custom shadow
      elevation: 4, // Optional if you're using Material-UI v5 or later
    }}
  >
      <Typography
        component="pre"
        sx={{ m: 0, fontSize: "0.875rem", whiteSpace: "pre-wrap" }}
      >
        {code}
      </Typography>
      <Tooltip title={copied ? "Copied!" : "Copy to Clipboard"} placement="top">
        <IconButton
          size="small"
          onClick={handleCopy}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary",
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};


export default CodeBlock;
