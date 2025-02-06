import { forwardRef } from "react";


// Custom styles for MDTypography
import MDTypographyRoot from "components/MDTypography/MDTypographyRoot";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

const MDTypography = forwardRef(
  (
    { color="dark", fontWeight=false, textTransform="none", verticalAlign="unset", textGradient=false, opacity=1, children=<></>, ...rest },
    ref
  ) => {




    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <MDTypographyRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
          darkMode,
        }}
      >
        {children}
      </MDTypographyRoot>
    );
  }
);

export default MDTypography;
