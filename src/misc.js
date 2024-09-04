export function changeBackground() {
  const backgrounds = ["assets/bg1.jpeg"];

  const index = Math.floor(Math.random() * backgrounds.length);
  const selectedBackground = backgrounds[index];
  document.body.style.backgroundImage = `linear-gradient(rgba(19, 25, 27, 0.5), #13191b), url(${selectedBackground})`;
}

export function getColorForOption(option) {
  // Define colors for each option
  const optionColors = {
    Offensive: "Crimson",
    Defensive: "MediumSpringGreen",
    Support: "CornflowerBlue",
    Backpack: "SkyBlue",
  };

  return optionColors[option] || "white"; // Default color if option not found
}
