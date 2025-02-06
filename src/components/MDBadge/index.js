
import { forwardRef } from "react";

// Custom styles for the MDBadge
import MDBadgeRoot from "components/MDBadge/MDBadgeRoot";

const MDBadge = forwardRef(
  ({ color="info", variant="gradient", size="sm", circular=false, indicator=false, border=false, container=false, children, ...rest }, ref) => (
    <MDBadgeRoot
      {...rest}
      ownerState={{ color, variant, size, circular, indicator, border, container, children }}
      ref={ref}
      color="default"
    >
      {children}
    </MDBadgeRoot>
  )
);


// Typechecking props of the MDBadge


export default MDBadge;
