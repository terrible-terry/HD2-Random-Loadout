/*eslint-disable no-unused-vars*/
import { useState, useEffect, useContext, useRef, useLayoutEffect, lazy } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";


import { createFilterOptions } from "@mui/material/Autocomplete";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import MDButton from "components/MDButton";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
import MDTextArea from "components/MDTextArea";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MTSelect from "components/MTSelect";
// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";
import MDSnackbar from "components/MDSnackbar";
import "./modalStyles.css";
import { useMaterialUIController } from "../../../../context";

import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Images
function Header({ Projectdata }) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const ImageRef = useRef(null);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const [materialName, setmaterialName] = useState(Projectdata.materialName || "");
  const [materialDesc, setmaterialDesc] = useState(Projectdata.materialDesc || "");

  const [Weightft, setWeightft] = useState(Projectdata.Weightft || "");
  const [Costft, setCostft] = useState(Projectdata.Costft || "");
  const [SKU, setSKU] = useState(Projectdata.SKU || "");
  const [Notes, setNotes] = useState(Projectdata.Notes || "");
  const [Status, setStatus] = useState(Projectdata.Status || "0");
  const [ImageURL, setImageURL] = useState(Projectdata.Image || "");
  const [ImagePath, setImagePath] = useState(Projectdata.ImagePath || "");

  const [isDirty, setisDirty] = useState(false);

  const [ModalOpen, setModalOpen] = useState(false);
  let confirmBGcolor = colors.grey[100];
  if(darkMode == true){
    confirmBGcolor = colors.dark.main;
  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleDeleteClick = (projectId) => {
    setProjectIdToDelete(projectId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProjectIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (projectIdToDelete) {
      await deleteMaterial(projectIdToDelete);
      handleCloseDialog(); // Close dialog after deletion
    }
  };
  const handleUpload = async (file) => {
    if (!file || file.type !== "image/png") {
      console.error("Only PNG files are allowed.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const storage = getStorage(); // Initialize Firebase Storage service
    const timestamp = Date.now();

    // Define the storage path (reference)
    const storagePath = `users/${user.uid}/images/${timestamp}.png`; // Timestamp helps avoid filename conflicts

    const storageRef = ref(storage, storagePath); // Create a reference to the file in Firebase Storage

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // After uploading, get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Set the image URL (for display or storage in your state/database)
      setImageURL(downloadURL);
      setImagePath(`${timestamp}.png`); // Store the path for future reference (e.g., to replace the file later)

      console.log("File uploaded successfully:", downloadURL); // Log the download URL
    } catch (error) {
      console.error("Error uploading file:", error); // Catch and log any errors during upload
    }
  };
  const handleReplace = async (file) => {
    if (!file || file.type !== "image/png") {
      console.error("Only PNG files are allowed.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    const storage = getStorage(); // Initialize Firebase Storage service
    const timestamp = Date.now();

    // Define the storage path (reference)
    const storagePath = `users/${user.uid}/images/${ImagePath}`; // Timestamp helps avoid filename conflicts
    const storageRef = ref(storage, storagePath); // Create a reference to the file in Firebase Storage

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // After uploading, get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
      setImageURL(downloadURL);
      handleSave();
      console.log("File uploaded successfully:", downloadURL); // Log the download URL
    } catch (error) {
      console.error("Error uploading file:", error); // Catch and log any errors during upload
    }
  };

  const SavedAlert = (
    <MDSnackbar
      color="success"
      icon="star"
      title="Saved!"
      content=""
      dateTime="now"
      open={ModalOpen}
      onClose={closeModal}
      close={closeModal}
      bgWhite
    />
  );
  const handleSave = (event) => {
    if (event) {
      event.preventDefault();
    }

    const SaveData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("No user is signed in.");
        return;
      }
      const userId = user.uid;
      const formDataObject = {
        Weightft,
        Costft,
        SKU,
        Status,
        Notes,
        materialName,
        materialDesc,
        ImagePath,
        Image: ImageURL,
      };
      const projectId = Projectdata.id;
      const projectRef = doc(getFirestore(), "customers", userId, "MaterialTypes", projectId);

      try {
        await updateDoc(projectRef, formDataObject);
        setisDirty(false);
        openModal();
      } catch (error) {
        console.error("Error updating Firestore document:", error);
      }
    };

    SaveData();
  };
  useEffect(() => {
    setmaterialName(Projectdata.materialName);
    setmaterialDesc(Projectdata.materialDesc);
    setWeightft(Projectdata.Weightft);
    setCostft(Projectdata.Costft);
    setSKU(Projectdata.SKU);
    setNotes(Projectdata.Notes);
    setStatus(Projectdata.Status);
    setImageURL(Projectdata.Image);
    setImagePath(Projectdata.ImagePath);

    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();
    // Remove event listener on cleanup
    return () => {
      // Cleanup code here (if needed)
      window.removeEventListener("resize", handleTabsOrientation);
    };
  }, [Projectdata]);

  const handleDirtyChange = () => {
    setisDirty(true);
  };



  const StatusOptions = [
    { value: "0", label: "Inactive" },
    { value: "1", label: "Deprecated" },
    { value: "2", label: "Active" },
  ];
  const children = ({ tabValue }) => {
    let content;
    switch (tabValue) {
      case 0:
        content = (
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  pt={2}
                  px={2}
                  color={darkMode ? "grey-400" : "dark"}
                >
                  General Info
                </MDBox>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  pt={2}
                  px={2}
                ></MDBox>
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
                    value={Weightft || ""}
                    label="Weight per Ft"
                    type="number"
                    onChange={(event) => {
                      setWeightft(parseFloat(event.target.value) || 0);
                      handleDirtyChange();
                    }}
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
                    value={Costft || ""}
                    onChange={(event) => {
                      setCostft(event.target.value);
                      handleDirtyChange();
                    }}
                    type="number"
                    label="Cost Per Ft"
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
                    value={SKU || ""}
                    onChange={(event) => {
                      setSKU(event.target.value);
                      handleDirtyChange();
                    }}
                    type="text"
                    label="SKU"
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  pt={2}
                  px={2}
                  color={darkMode ? "grey-400" : "dark"}
                >
                  Notes
                </MDBox>

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
                    width="100%" 
                  >
                    <MDInput
                      fontWeight="medium"
                      value={Notes || ""}
                      onChange={(event) => {
                        setNotes(event.target.value);
                        handleDirtyChange();
                      }}
                      label="Notes..."
                      fullWidth
                      multiline
                      rows={5}
                    />
                  </MDBox>

                  <MDBox
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={2}
                    px={2}
                    width="100%" 
                  >
                    <MTSelect options={StatusOptions} value={Status} label="Active Status" fullWidth 
                      onChange={(event) => {
                        console.log(event.target);
                        setStatus(event.target.value);
                        handleDirtyChange();
                      }} error={false} success={true} disabled={false} defaultValue="option1"/>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                {ModalOpen && SavedAlert}
              </Grid>
            </Grid>
          </MDBox>
        );
        break;
      case 1:
        content = <></>;
        break;
      default:
        content = null;
    }
    return content;
  };
  const handleSetTabValue = async (event, newValue) => {
    setTabValue(newValue);
  };
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    const wrapper = ImageRef.current;
    const rect = wrapper.parentNode.parentNode.getBoundingClientRect();
    const scaleFactor = Math.max(rect.width, rect.height) / 100;
    if (!isClicked) {
      wrapper.style.zIndex = "99";
      wrapper.style.transform = `scale(1)`;
      wrapper.style.borderTopLeftRadius = "";
    } else if (wrapper.textContent != "p" && isClicked) {
      (wrapper.style.borderTopLeftRadius = "0"), (wrapper.style.zIndex = "9999999");
      wrapper.style.backgroundColor = "white";
      wrapper.style.transform = `scale(${scaleFactor})`;
    }
  }, [isClicked]);
  const handleClick = (event) => {
    setIsClicked(true);
  };
  const handleblur = (event) => {
    setIsClicked(false);
  };

  useLayoutEffect(() => {
    setisDirty(false);

    return () => {
      // Clean-up code (if needed)
    };
  }, []);
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="5rem"
        borderRadius="xl"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "25%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={ImageURL}
              alt="profile-image"
              size="xl"
              shadow="sm"
              ref={ImageRef}
              className={isClicked ? "project-clicked" : ""}
              onClick={handleClick}
              onMouseLeave={handleblur}
              style={{
                transition: "transform 0.3s ease",
                cursor: "pointer",
                transformOrigin: "left calc(25% + 0px)",
                zIndex: "99",
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
              {ImageURL == "" ? "Upload" : "Replace"} Image
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
                      alert("Please select a PNG file.");
                      // Clear the file input
                      e.target.value = "";
                      return;
                    }
                    if (ImageURL != "") {
                      handleReplace(file);
                    } else {
                      handleUpload(file);
                    }
                  }
                }}
              />
            </MDButton>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDInput
                fontWeight="medium"
                value={materialName || ""}
                type="text"
                label="Material Name"
                onChange={(event) => {
                  setmaterialName(event.target.value);
                  handleDirtyChange();
                }}
                sx={{ mt: 2 }}
              />
              <MDBox>
                <MDInput
                  fontWeight="medium"
                  value={materialDesc || ""}
                  type="text"
                  label="Description"
                  onChange={(event) => {
                    setmaterialDesc(event.target.value);
                    handleDirtyChange();
                  }}
                  sx={{ mt: 2 }}
                />
                <MDButton
                  variant="gradient"
                  color="error"
                  onClick={() => handleDeleteClick(Projectdata.id)}
                >
                  Delete Material
                </MDButton>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8} lg={6} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="General Info"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>

          <Grid item>
            <MDButton
              variant="gradient"
              color="info"
              className={isDirty ? "isDirty" : ""}
              onClick={handleSave}
            >
              <Icon sx={{ fontWeight: "bold" }}>save</Icon>
              Save
            </MDButton>
          </Grid>
        </Grid>
        {children({ tabValue })}
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {

            background: confirmBGcolor,
          },
        }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Material? This
          action cannot be undone.
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="primary">
            Cancel
          </MDButton>
          <MDButton onClick={handleConfirmDelete} color="error">
            Delete
          </MDButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}

export default Header;
