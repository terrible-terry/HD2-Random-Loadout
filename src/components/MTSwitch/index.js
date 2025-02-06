import { forwardRef } from "react";

import InputLabel from "@mui/material/InputLabel";

import MTSwitchRoot from "components/MTSwitch/MTSwitchRoot";

/*
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";*/



const  MTSwitch = forwardRef(({ width, label="", error=false,checked=false, success=false, disabled=false, ...rest }, ref) =>{ 

  
  
  return(
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {label && (
        <InputLabel 
          size="small" 
          style={{
            transform:"unset",
            margin: 0,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            height: "100%", // Ensures it stretches to match the height of the container
          }}
        >
          {label}
        </InputLabel>
      )}
      <MTSwitchRoot
        {...rest}
        sx={{ padding: "11px" }}
        ref={ref}
        checked={checked}
        ownerState={{ error, success, disabled }}
        disabled={disabled}
        label={label}
        width={width}
      />
    </div>
)});


export default  MTSwitch;
