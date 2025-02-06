//import { useContext } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import './style.css';
import { stratagems, warbonds } from "../../content";
import { changeBackground } from "../../misc";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footer";


import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import routes from "routes";
import footerRoutes from "footer.routes";

// Images
import bgImage from "./imgs/HeroPreview.png";
//import { Padding } from "@mui/icons-material";

function Home() {
  const [selectedStratagems, setSelectedStratagems] = useState({
    supportWeapon: true,
    backpack: true,
    offensive: true,
    defensive: true,
  });

  const [selectedEquipment, setSelectedEquipment] = useState({
    primary: false,
    secondary: false,
    grenade: false,
    armor: false,
    booster: false,
  });

  const [randomizerOptions, setRandomizerOptions] = useState({
    singleSupportWeapon: true,
    singleBackpack: true,
  });

  const [warbonds, setWarbonds] = useState({
    helldiversMobilize: true,
    steeledVeterans: false,
    cuttingEdge: false,
    democraticDetonation: false,
    polarPatriot: false,
    viperCommandos: false,
    freedomsFlame: false,
    truthEnforcers: false,
    urbanLegends: false,
    superCitizen: false,
  });
  const [resultField, setResultField] = useState('Helldiver, wait for random loadout assignment!');

  useEffect(() => {
    changeBackground();
  }, []);

  const handleStratagemChange = (event) => {
    setSelectedStratagems((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.checked,
    }));
  };

  const handleEquipmentChange = (event) => {
    setSelectedEquipment((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.checked,
    }));
  };

  const handleRandomizerChange = (event) => {
    setRandomizerOptions((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.checked,
    }));
  };

  const handleWarbondChange = (event) => {
    setWarbonds((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.checked,
    }));
  };

  const randomizeLoadout = () => {
    setResultField('Helldiver, wait for random loadout assignment!');
  };


const Antitank = document.getElementById("Antitank");
const outputLoadout = { Strats: [], Weapon: "" };
const outputLoadoutHTML = {};
var weaponJSON = {};
function getNumericValue(str) {
  if (!str) return false; // Return false if the string is empty or not provided

  const letterValueMap = {
    L: 10,
    M: 20,
    H: 30,
  };

  const letter = str[0];
  const number = parseInt(str.slice(1), 10);

  const letterValue = letterValueMap[letter];

  if (letterValue !== undefined && !isNaN(number)) {
    return letterValue + number;
  } else {
    return false; // Return false if the string doesn't match the expected pattern
  }
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Allows cross-origin image loading for CORS-enabled images
    img.onload = () => {
      resolve(img);

      // Call the download function after the image is loaded
    };
    img.onerror = reject;
    img.src = src;
    img.style.borderRadius = "5px";
  });
}
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawRoundedImage(ctx, img, x, y, width, height, radius) {
  // Draw rounded rectangle background
  ctx.save();
  drawRoundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = "#3b3b39"; // Background color (change as needed)
  ctx.fill();
  ctx.clip();

  // Calculate the aspect ratio and fit the image within the rounded box
  const imgAspectRatio = img.width / img.height;
  let drawWidth, drawHeight, offsetX, offsetY;

  if (imgAspectRatio > 1) {
    // Image is wider than it is tall
    drawWidth = width;
    drawHeight = width / imgAspectRatio;
    offsetX = 0;
    offsetY = (height - drawHeight) / 2;
  } else {
    // Image is taller than it is wide
    drawWidth = height * imgAspectRatio;
    drawHeight = height;
    offsetX = (width - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight);
  ctx.restore();
}
async function drawLoadoutOnCanvas(strats, weapons) {
  const canvas = document.getElementById("loadoutCanvas");
  const ctx = canvas.getContext("2d");
  // Set the background or initial setup for the canvas
  ctx.fillStyle = "#000"; // Set the background color to white
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Coordinates for where to place images (example positions)
  const Weaponpositions = [
    { x: 50, y: 50 },
    { x: 200, y: 50 },
    { x: 350, y: 50 },
    { x: 500, y: 50 },
    { x: 650, y: 150 },
  ];

  const positions = [
    { x: 50, y: 150 },
    { x: 200, y: 150 },
    { x: 350, y: 150 },
    { x: 500, y: 150 },
  ];

  // Load and draw each strat image on the canvas
  const keys = Object.keys(strats.data);
  for (let i = 0; i < keys.length && i < positions.length; i++) {
    const strat = strats.data[keys[i]];
    const img = await loadImage(strat.image);
    const pos = positions[i];
    drawRoundedImage(ctx, img, pos.x, pos.y, 100, 100, 20); // Draw image at specified position
    ctx.fillStyle = "yellow";
    ctx.font = "bold 16px Arial";
    ctx.fillText(`AT=${strat.at}`, pos.x, pos.y + 120); // Draw the AT value below the name
  }

  const Weaponkeys = Object.keys(weapons);

  for (let i = 0; i < Weaponkeys.length && i < Weaponpositions.length; i++) {
    const strat = weapons[Weaponkeys[i]];
    if (strat) {
      const img = await loadImage(strat[0].image);
      const pos = Weaponpositions[i];
      drawRoundedImage(ctx, img, pos.x, pos.y, 100, 100, 20); // Draw image at specified position
      ctx.fillStyle = "yellow";
      ctx.font = "bold 16px Arial";
      ctx.fillText(strat[0].name, pos.x, pos.y - 20); // Draw the name below the image
    }
  }

  //const dataURL = canvas.toDataURL("image/png");

  //return dataURL;
}

function sendToGoogleAnalytics(eventAction, jsonData) {
  const jsonString = JSON.stringify(jsonData);
  /*
 try {
  gtag('event', eventAction, {
    'event_category': 'Loadout',
    'event_label': jsonString,
    'value': 1
});
} catch (error) {
  console.error( error);
}*/
}

const WarbondCont = document.getElementById("Warbond-Selector");
WarbondCont.innerHTML = "";
for (var bond in warbonds) {
  WarbondCont.innerHTML += `<input type="checkbox" id="warbond_${bond}" value="${warbonds[bond].name}" checked>
							<label for="warbond_${bond}">${warbonds[bond].name}</label></input>`;
}

document
  .getElementById("randomizeButton")
  .addEventListener("click", function () {
  
    let checkboxes = document.querySelectorAll(".stratagem_type:checked");

    const isSingleBackpack =
      document.getElementById("option_singleback").checked;
    document.getElementById("option_singleback").checked;
    const isSingleSupport = document.getElementById("option_support").checked;

    const offensiveCheckbox = document.getElementById("option3");
    const defensiveCheckbox = document.getElementById("option4");
    const isPrimary = document.getElementById("primary").checked;
    const isSecondary = document.getElementById("secondary").checked;
    const isGrenade = document.getElementById("grenade").checked;
    const isArmor = document.getElementById("armor").checked;
    const isBooster = document.getElementById("booster").checked;

    const lowestAT = getNumericValue(Antitank.value);

    //push warbond content if selected
    const warbondCon = document.querySelectorAll(
      "#Warbond-Selector input[type=checkbox]:checked"
    );
    const selectedWarbonds = Array.from(warbondCon).map((checkbox) =>
      checkbox.id.replace("warbond_", "")
    );
    //check warbond selections
    if (selectedWarbonds.length == 0) {
      document.getElementById("warbond_default").checked = true;
      selectedWarbonds.push("default");
    }

    var equip_primary = [];
    var equip_secondary = [];
    var equip_grenade = [];
    var equip_armor = [];
    var equip_boosters = [];

    //add pushed content to equipment list
    selectedWarbonds.forEach((warbond) => {
      equip_primary.push(...warbonds[warbond].primary);
      equip_secondary.push(...warbonds[warbond].secondary);
      equip_grenade.push(...warbonds[warbond].grenade);
      equip_armor.push(...warbonds[warbond].armor);
      equip_boosters.push(...warbonds[warbond].booster);
      stratagems.push(...warbonds[warbond].stratagems);
    });

    if (isPrimary) {
      var selected = randomizeStrategems(equip_primary, 1);

      weaponJSON.Primary = selected;
    } else {
      weaponJSON.Primary = false;
    }

    if (isSecondary) {
      var selected = randomizeStrategems(equip_secondary, 1);

      weaponJSON.Secondary = selected;
    } else {
      weaponJSON.Secondary = false;
    }

    if (isGrenade) {
      var selected = randomizeStrategems(equip_grenade, 1);

      weaponJSON.Grenade = selected;
    } else {
      weaponJSON.Grenade = false;
    }

    if (isArmor) {
      var selected = randomizeStrategems(equip_armor, 1);

      weaponJSON.Armor = selected;
    } else {
      weaponJSON.Armor = false;
    }

    if (isBooster) {
      var selected = randomizeStrategems(equip_boosters, 1);
      weaponJSON.Booster = selected;
    } else {
      weaponJSON.Booster = false;
    }
    //check at least defensive or offensive box if single backpack and support weapon is activated
    if (isSingleBackpack && isSingleSupport) {
      if (
        offensiveCheckbox.checked === false &&
        defensiveCheckbox.checked === false
      ) {
        if (Math.random() < 0.5) {
          offensiveCheckbox.checked = true;
          defensiveCheckbox.checked = false;
        } else {
          offensiveCheckbox.checked = false;
          defensiveCheckbox.checked = true;
        }
      }
      checkboxes = document.querySelectorAll(".stratagem_type:checked");
    }

    let stratValues = [];
    checkboxes.forEach(function (checkbox) {
      for (const strat of stratagems) {
        if (strat.category === checkbox.value) {
          stratValues.push(strat);
        }
      }
    });

    let selectedStrats = []; // Declare `selectedStrats` at a higher scope

    if (isSingleBackpack && isSingleSupport) {
      let count_backpack, count_support;

      do {
        // Reset counts for this iteration
        count_backpack = 0;
        count_support = 0;

        // Randomize stratagems

        selectedStrats = randomizeStrategems(stratValues, 4);

        // Count backpack and support stratagems in the randomized selection
        for (const strat of selectedStrats) {
          if (strat.isBackpack) {
            count_backpack += 1;
          }

          if (strat.category === "Support") {
            count_support += 1;
          }
        }
      } while (
        count_backpack !== 1 ||
        count_support !== 1 ||
        !selectedStrats.some((strat) => getNumericValue(strat.at) >= lowestAT)
      );
    } else if (isSingleBackpack) {
      let count_backpack;
      do {
        selectedStrats = randomizeStrategems(stratValues, 4);
        count_backpack = selectedStrats.filter(
          (strat) => strat.isBackpack
        ).length;
      } while (
        count_backpack !== 1 ||
        !selectedStrats.some((strat) => getNumericValue(strat.at) >= lowestAT)
      );
    } else if (isSingleSupport) {
      let count_support;
      do {
        selectedStrats = randomizeStrategems(stratValues, 4);
        count_support = selectedStrats.filter(
          (strat) => strat.category === "Support"
        ).length;
      } while (
        count_support !== 1 ||
        !selectedStrats.some((strat) => getNumericValue(strat.at) >= lowestAT)
      );
    } else {
      do {
        selectedStrats = randomizeStrategems(stratValues, 4);
      } while (
        !selectedStrats.some((strat) => getNumericValue(strat.at) >= lowestAT)
      );
    }

    let htmlContent = [];
    let countstrat = 0;
    outputLoadoutHTML.data = [];
    for (const strat of selectedStrats) {
      outputLoadoutHTML.data.push(strat);
      const name = strat.name;
      outputLoadout.Strats.push(name);

      countstrat++;
    }

    sendToGoogleAnalytics("Loadout", outputLoadout);
    document.getElementById("resultField").innerHTML =
      htmlContent.join("<br><br>");
    document.getElementById("resultHeader").innerHTML =
      "Helldiver, you have been granted the following Loadout:";
    drawLoadoutOnCanvas(outputLoadoutHTML, weaponJSON);
  });

/*
 */
const uniqueAtValues = [
  ...new Set(
    stratagems
      .filter((strt) => strt.at)
      .map((strt) => strt.at)
      .sort((a, b) => {
        const order = { L: 1, M: 2, H: 3 };

        const letterA = a[0];
        const letterB = b[0];

        const numA = parseInt(a.slice(1));
        const numB = parseInt(b.slice(1));

        if (order[letterA] === order[letterB]) {
          return numA - numB;
        } else {
          return order[letterA] - order[letterB];
        }
      })
  ),
];
console.log(uniqueAtValues);
function toRomanNumerals(num) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let roman = "";
  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      roman += symbol;
      num -= value;
    }
  }
  return roman;
}
uniqueAtValues.forEach((element) => {
  const letter = element[0];
  const number = parseInt(element.slice(1), 10);

  let description = "";

  // Convert letter to full description
  switch (letter) {
    case "L":
      description += "LIGHT ";
      break;
    case "M":
      description += "MEDIUM ";
      break;
    case "H":
      description += "HEAVY ";
      break;
    default:
      description += "UNKNOWN ";
  }

  // Convert number to Roman numerals
  description += toRomanNumerals(number);

  // Create and append option
  let item = new Option(description, element);
  Antitank.append(item);
});
function randomizeStrategems(strats, n_out) {
  shuffleArray(strats);
  const selectedStrats = strats.slice(0, n_out);
  return selectedStrats;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

window.onload = changeBackground;


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
              Revolutionize Your Operations with Our Cutting-Edge Solutions
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




    <div className="container">
      <div className="updated">
        <ul>
          <li>07 August 2024 - added <b>Freedoms Flame Warbond</b></li>
          <li>Last update: 03 September 2024 - added <b>Require Anti-Tank Option</b></li>
          <li>08 November 2024 - added <b>Truth Enforcers Warbond</b></li>
          <li>05 February 2025 - added <b>Urban Legends Warbond</b></li>
        </ul>
      </div>

      <header className="header">
        <h1>Welcome to the Helldivers 2<br />Loadout Randomizer</h1>
      </header>

      <main>
        <div className="options-wrapper">
          <section className="stratagem-section">
            <h2>Stratagems</h2>
            <div className="checkbox-group">
              {['supportWeapon', 'backpack', 'offensive', 'defensive'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      id={type}
                      checked={selectedStratagems[type]}
                      onChange={handleStratagemChange}
                    />
                  }
                  label={type.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
            </div>
            <div className="checkbox-group">
              <InputLabel>At Least 1 Anti-Tank option at or above</InputLabel>
              <FormControl style={{ minWidth: 200 }}>
                <Select style={{ color: 'black' }} id="Antitank">
                  <MenuItem value={1}>Option 1</MenuItem>
                  <MenuItem value={2}>Option 2</MenuItem>
                </Select>
              </FormControl>
            </div>
          </section>

          <section className="equipment-section">
            <h2>Equipment</h2>
            <div className="checkbox-group">
              {['primary', 'secondary', 'grenade', 'armor', 'booster'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      id={type}
                      checked={selectedEquipment[type]}
                      onChange={handleEquipmentChange}
                    />
                  }
                  label={type}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="options-wrapper">
          <section className="options-section">
            <h2>Randomizer</h2>
            <div className="checkbox-group">
              {['singleSupportWeapon', 'singleBackpack'].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      id={type}
                      checked={randomizerOptions[type]}
                      onChange={handleRandomizerChange}
                    />
                  }
                  label={type.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
            </div>
          </section>

          <section className="additional-section">
            <h2>Warbonds</h2>
            <div className="checkbox-group" id="Warbond-Selector">
              {Object.keys(warbonds).map((warbond) => (
                <FormControlLabel
                  key={warbond}
                  control={
                    <Checkbox
                      id={warbond}
                      checked={warbonds[warbond]}
                      onChange={handleWarbondChange}
                    />
                  }
                  label={warbond.replace(/([A-Z])/g, ' $1').trim()}
                />
              ))}
            </div>
          </section>
        </div>

        <Button
          id="randomizeButton"
          variant="contained"
          color="primary"
          onClick={randomizeLoadout}
        >
          Randomize Loadout
        </Button>

        <section id="results-section">
          <div id="resultHeader">Helldiver, wait for random loadout assignment!</div>
          <div id="resultField" contentEditable="true" />
        </section>
      </main>
    </div>

      </Card>
      <MDBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MDBox>
    </>
  );
}

export default Home;
