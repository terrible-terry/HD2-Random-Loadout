import { forwardRef } from "react";


// Custom styles for MDAvatar
import MDAvatarRoot from "components/MDAvatar/MDAvatarRoot";

const MDAvatar = forwardRef(({ bgColor="transparent", size="md", shadow="none", ...rest }, ref) => (
  <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest}></MDAvatarRoot>
));


export default MDAvatar;
