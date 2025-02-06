/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useRef } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


import { getAuth } from "firebase/auth";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import app, { storage } from '../../config/firebaseConfig';
import MDInput from "components/MDInput";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
// Material Dashboard 2 React base styles
import { useMaterialUIController,AuthContext } from "../../context";

// Images

function DieShapeForm({ Diedata, SubmitForm }) {
  ///need to handle light and dark mode better

  const [DieName, setDieName] = useState("");
  const ImageRef = useRef(null);
  const [Material, setMaterial] = useState("");
  const [DieWeight, setDieWeight] = useState(""); //
  const [DieApplication, setApplication] = useState("");
  const [Notes, setNotes] = useState("");
  const [SKU, setSKU] = useState("");
  const [Costft, setCostft] = useState("");
  const [ImageURL, setImageURL] = useState("");
  const [ImagePath, setImagePath] = useState("");

  const [controller, dispatch] = useMaterialUIController();
  const [fileData, setFileData] = useState(null);
  
  const { SBMess } = useContext(AuthContext); ///addMaterial

  const { darkMode } = controller;
  const [previewSrc, setPreviewSrc] = useState("");

  useEffect(() => {

    setDieName(Diedata);
  }, []);

  useEffect(() => {
    UpdateData();
  }, [DieName,
    ImageURL,
    Material, 
    DieWeight, 
    DieApplication,
    Notes, 
    SKU,
    Costft]);


  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const wrapper = ImageRef.current;
    const rect = wrapper.parentNode.parentNode.getBoundingClientRect();
    const scaleFactor = Math.max(rect.width, rect.height) / 100;
    if (!isClicked) {
      wrapper.style.zIndex = "99";
      wrapper.style.transform = `scale(1)`;
    } else if (wrapper.textContent != "p" && isClicked) {
      wrapper.style.zIndex = "9999999";
      wrapper.style.backgroundColor = "white";
      wrapper.style.transform = `scale(${scaleFactor})`;
    }
  }, [isClicked]);
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleblur = () => {
    setIsClicked(false);
  };

  const UpdateData = () => {
    const formData = {
      DieName,
      Material,
      DieWeight,
      ImageURL,
      ImagePath,
      DieApplication,
      Notes,
      SKU,
      Costft,
    };
    SubmitForm(formData);
  };

  const handleUpload = async (file) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
    if (!file) {
      console.error("No file selected.");
      SBMess("ERROR","No file selected.");
      return;
    }
  
    if (file.type !== "image/png") {
      console.error("Only PNG files are allowed.");
      SBMess("ERROR","Only PNG files are allowed.")
      return;
    }
  
    if (file.size > MAX_FILE_SIZE) {
      console.error("File size exceeds the 5 MB limit.");
      SBMess("ERROR","File size exceeds the 5 MB limit.")
      return;
    }


    // Initialize Firebase Storage service
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const timestamp = Date.now();
    
 
    const storagePath = `users/${user.uid}/images/${timestamp}.png`;  
  
    const storageRef = ref(storage, storagePath); 
  
    try {

      await uploadBytes(storageRef, file);  
      

      const downloadURL = await getDownloadURL(storageRef);  

      setImageURL(downloadURL);  
      setImagePath(`${timestamp}.png`);  
  
      console.log("File uploaded successfully:", downloadURL);  
    } catch (error) {
      console.error("Error uploading file:", error); 
    }
  };

    return (
      <MDBox>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <MDAvatar
              src={
                previewSrc !== ""
                  ? previewSrc
                  : ImageURL
              }
              alt="profile-image"
              size="xl"
              ref={ImageRef}
              shadow="sm"
              className={isClicked ? "project-clicked" : ""}
              onClick={handleClick}
              onMouseLeave={handleblur}
              style={{
                transition: "transform 0.3s ease",
                cursor: "pointer",
                transformOrigin: "left calc(25% + 0px)",
              }}
            />
            <MDButton
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              width="25%"
              variant="gradient"
              color="info"
            >
              Upload Image
              <input
                capture="image"
                type="file"
                style={{ display: "none" }}
                accept="image/png"
                name="PNGFile"
                onChange={(e) => {

                  const file = e.target.files[0];
                  if (file) {
                    const extension = file.name.split(".").pop().toLowerCase();
                    if (extension !== "png") {
                      SBMess("ERROR","No file selected.");
                      // Clear the file input
                      e.target.value = "";
                      return;
                    }
                    handleUpload(file);
                  }
                }}
              />
            </MDButton>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDInput
                fontWeight="medium"
                value={DieName}
                type="text"
                label="Shape Name"
                name="Shape_Name"
                onChange={(event) => setDieName(event.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
            </MDBox>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDInput
                fontWeight="medium"
                value={DieApplication}
                type="text"
                label="Shape Description / Application"
                onChange={(event) => setApplication(event.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  pt={2}
                  px={2}
                >
                  General Info
                </MDBox>

              </MDBox>

              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDInput
                  fontWeight="medium"
                  value={DieWeight}
                  type="number"
                  label="Die Weight Per Foot"
                  inputProps={{ step: "0.001" }}
                  onChange={(event) => setDieWeight(event.target.value)}
                  fullWidth
                />
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDInput
                  fontWeight="medium"
                  value={Costft}
                  type="number"
                  inputProps={{ step: "0.001" }}
                  label="Cost Per Foot"
                  onChange={(event) => setCostft(event.target.value)}
                  fullWidth

                />
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDInput
                  fontWeight="medium"
                  value={SKU}
                  type="text"
                  label="SKU"
                  onChange={(event) => setSKU(event.target.value)}
                  fullWidth
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                Material Settings
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDInput
                  fontWeight="medium"
                  value={Material}
                  type="text"
                  label="Material"
                  onChange={(event) => setMaterial(event.target.value)}
                  fullWidth
                />
              </MDBox>


        

              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={2}
                px={2}
              >
                <MDInput
                  fontWeight="medium"
                  value={Notes}
                  type="text"
                  label="Notes"
                  onChange={(event) => setNotes(event.target.value)}
                  fullWidth
                  multiline
                  rows={5}

                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    );
  }


  export default DieShapeForm;
