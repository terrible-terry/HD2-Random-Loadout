import { useState } from "react";

const FeatureImage = ({FeatureGif, FeatureStill}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <img
      src={isHovered ? FeatureGif : FeatureStill}
      alt="Import and Export Functionality"
      style={{ width: "100%", borderRadius: "12px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default FeatureImage;
