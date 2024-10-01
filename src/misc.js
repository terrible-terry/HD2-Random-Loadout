export function changeBackground() {
	const backgrounds = [
		"assets/bg1.png",
		"assets/bg2.png",
		"assets/bg3.png",
		"assets/bg4.png",
		"assets/bg5.png",
		"assets/bg6.png",
		"assets/bg7.png",
		"assets/bg8.png",
		"assets/bg9.png",
		"assets/bg10.png",
		"assets/bg11.png",
		"assets/bg12.png",
		"assets/bg13.png",
		"assets/bg14.png",
		"assets/bg15.png",
		"assets/bg16.png"
	];
	
	const index = Math.floor(Math.random() * backgrounds.length);
	const selectedBackground = backgrounds[index];
	document.body.style.backgroundImage = `linear-gradient(rgba(19, 25, 27, 0.5), #13191b), url(${selectedBackground})`;
}

export function getColorForOption(option) {
  // Define colors for each option
  const optionColors = {
    "Offensive": "Crimson",
    "Defensive": "MediumSpringGreen",
    "Support": "CornflowerBlue",
	"Backpack": "SkyBlue"
	};

  return optionColors[option] || "white"; // Default color if option not found
}