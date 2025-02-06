import React, { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";
import MDTypography from "../MDTypography";
import Button from "../MDButton";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

function UrlInputWithButtons({ initialUrls, setLink }) {
  const [inputValue, setInputValue] = useState("");
  const [urls, setUrls] = useState(initialUrls);
  useEffect(() => {
    if (initialUrls && initialUrls.length > 0) {
      setLink(initialUrls);
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddUrl = () => {
    if (inputValue.trim() !== "") {
      const newUrls = [...urls, inputValue];
      setUrls(newUrls);
      setLink(newUrls);
      setInputValue("");
    }
  };

  return (
    <Box width="100%" maxHeight="200px">
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter URL"
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment: (
            <Button
              onClick={handleAddUrl}
              variant="contained"
              color="info"
              endIcon={
                <Icon fontSize="small" color="white" sx={{ mt: -0.25 }}>
                  add
                </Icon>
              }
            >
              <MDTypography fontSize="small" color="white">
                Add Link
              </MDTypography>
            </Button>
          ),
        }}
      />
      <Box mt={2}>
        {initialUrls.map((url, index) => (
          <Button
            key={index}
            variant="outlined"
            startIcon={
              <Icon fontSize="small" color="info" sx={{ mt: -0.25 }}>
                link
              </Icon>
            }
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            fontSize="small"
            style={{
              marginRight: "8px",
              marginBottom: "8px",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <MDTypography color="info" noWrap>
              {url}
            </MDTypography>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

UrlInputWithButtons.propTypes = {
  initialUrls: PropTypes.array,
  setLink: PropTypes.func,
};
export default UrlInputWithButtons;
