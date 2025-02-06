import { useState, useEffect } from "react";


import MDButton from "components/MDButton";

function Dirty({ DirtyState, children, onDirtyChange }) {
  const [inDirty, setinDirty] = useState(false); //
  useEffect(() => {
    console.log(`inside ${DirtyState} ${inDirty}`);
    DirtyState = true;
    setinDirty(true);
  }, [onDirtyChange]);

  return (
    <div>
      <MDButton>{DirtyState}</MDButton> {/* Display DirtyState for debugging */}
      {inDirty && <button>Save</button>} {/* Render button if DirtyState is true */}
      {children}
    </div>
  );
}

export default Dirty;
