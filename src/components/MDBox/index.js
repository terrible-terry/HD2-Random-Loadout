

import { forwardRef } from "react";

// Custom styles for MDBox
import MDBoxRoot from "components/MDBox/MDBoxRoot";

const MDBox = forwardRef(
  ({ variant="contained", bgColor="transparent", color="dark", opacity=1, borderRadius="none", shadow="none", coloredShadow="none", ...rest }, ref) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);


export default MDBox;
