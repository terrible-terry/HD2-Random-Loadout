
import Icon from "@mui/material/Icon";
import MKBox from "components/MDBox";
import MKTypography from "components/MDTypography";

function RotatingCardFront({ color, image, video, icon, title, description }) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      coloredShadow={color}
      width="100%"
      position="relative"
      zIndex={2}
      sx={{
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        overflow: "hidden", // Ensures video does not overflow the card
      }}
    >
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
            borderRadius: "inherit", // Ensure the video respects border radius
          }}
        />
      ) : (
        <MKBox
          sx={{
            backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
              `${linearGradient(
                rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.85),
                rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.85)
              )}, url(${image})`,
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
            borderRadius: "inherit", // Ensure the background respects border radius
          }}
        />
      )}

      {/* Overlay for better text readability */}
      <MKBox
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: ({ palette: { black } }) => black.main,
          opacity: 0.5,
          zIndex: -1,
          borderRadius: "inherit",
        }}
      />

      <MKBox py={12} px={3} textAlign="center" lineHeight={1}>
        {icon && (
          <MKTypography variant="h2" color="white" my={2}>
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </MKTypography>
        )}
        <MKTypography variant="h3" color="white" gutterBottom>
          {title}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8}>
          {description}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}



export default RotatingCardFront;
