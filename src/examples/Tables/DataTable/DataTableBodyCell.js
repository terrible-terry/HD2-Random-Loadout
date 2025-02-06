
import MDBox from "components/MDBox";

function DataTableBodyCell({ noBorder, align, children }) {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
        fontSize: size.sm,
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <MDBox display="inline-block" width="max-content" sx={{ verticalAlign: "middle" }}>
        {children}
      </MDBox>
    </MDBox>
  );
}



export default DataTableBodyCell;
