import React, { useState, useEffect } from "react";
import { Card, Grid, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Tooltip from "@mui/material/Tooltip";
import { CardContent } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const DraggableTable = ({ data, stockLength }) => {
  const [animatingCell, setAnimatingCell] = useState(null);
  const [draggingPart, setDraggingPart] = useState(null); // State to control the dragging part visibility

  useEffect(() => {
    // Function to calculate the height of the div
    setRows(processRows());
  }, [data]);
  const processRows = () => {
    if (data.length >= 1) {
      const rows = [];
      const maxRowCount = Math.max(...data.map((dataset) => dataset.data.length));

      for (let i = 0; i < maxRowCount; i++) {
        const rowParts = data
          .map((dataset) => dataset.data[i])
          .filter((item) => item && item[0] > 0)
          .map(([length, _, label], index) => ({
            id: `${index}-${label}-${i}`,
            width: length,
            label,
          }));
        if (rowParts.length > 0) rows.push(rowParts);
      }

      return rows;
    } else {
      return [];
    }
  };

  const [rows, setRows] = useState(processRows());

  const handleDragStart = (e, part, rowIndex) => {
    e.dataTransfer.setData("draggedPart", JSON.stringify({ part, fromRow: rowIndex }));
    setDraggingPart(part); // Set the part being dragged
  };

  const handleDragEnd = () => {
    setDraggingPart(null);

  };
  useEffect(() => {
    if (draggingPart) {
 
      document.addEventListener("mouseup", handleDragEnd);
    }
    return () => {
    
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [draggingPart]);
  const handleDrop = (event, targetRow) => {
    const draggedPartData = JSON.parse(event.dataTransfer.getData("draggedPart"));
    const draggedPart = draggedPartData.part;
    const fromRow = draggedPartData.fromRow;
  
    // Calculate the drop index based on mouse position
    const dropX = event.clientX; // Get the x position of the mouse cursor
    const rowElement = event.currentTarget; // The area where you're dropping
    const parts = [...rowElement.children]; // Get all children within the row
  
    let totalWidth = 0;
    let dropIndex = parts.length; // Default to the end
    for (let i = 0; i < parts.length; i++) {
      totalWidth += parseFloat(parts[i].style.width); // Accumulate widths
      if (dropX < (totalWidth + rowElement.offsetLeft)) {
        dropIndex = i; // Found the index where it should drop
        break;
      }
    }
  
    // Update the rows
    const newRows = [...rows];
    newRows[fromRow] = newRows[fromRow].filter((part) => part.id !== draggedPart.id); // Remove from the original row
  
    const updatedPart = { ...draggedPart, row: targetRow };
    newRows[targetRow].splice(dropIndex, 0, updatedPart); // Insert at the calculated index
  
    setRows(newRows);
    setAnimatingCell(updatedPart.id); // Trigger animation
    setTimeout(() => setAnimatingCell(null), 300); // Reset animation state after transition
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const addRow = () => {
    setRows([...rows, []]);
  };

  const renderStockLength = (row, rowIndex) => {
    const usedWidth = row.reduce((total, cell) => total + cell.width, 0);
    const remainingWidth = stockLength - usedWidth;
    return (
      <MDBox
        width={`${stockLength}px`}
        height="80px"
        border="1px solid #e0e0e0"
        borderRadius="12px"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        bgcolor={rowIndex % 2 === 0 ? "#f8f9fa" : "#ffffff"}
        boxShadow="0px 3px 6px rgba(0, 0, 0, 0.1)"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, rowIndex)}
        position="relative"
        marginBottom="16px"
        p={1}
      >
        {row.map((cell) => (
          <MDBox
            key={cell.id}
            draggable
            onDragStart={(e) => handleDragStart(e, cell, rowIndex)}
            width={animatingCell === cell.id ? "0px" : `${cell.width}px`}
            height="60px"
            bgColor="#5e72e4"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginRight="8px"
            fontSize="0.875rem"
            fontWeight="500"
            boxShadow="0px 3px 6px rgba(0, 0, 0, 0.2)"
            cursor="grab"
            style={{
              transition: "width 0.3s ease-in-out", // Smooth animation
            }}
          >
            <Tooltip disableFocusListener disableTouchListener title={cell.width}>
              <MDButton variant="text" color="#ffffff">
                {" "}
                {cell.label}
              </MDButton>
            </Tooltip>
          </MDBox>
        ))}

        <MDBox
          width={`${Math.abs(remainingWidth)}px`}
          height="60px"
          bgColor={remainingWidth < 0 ? "#ed1414" : "#e9ecef"}
          borderRadius="8px"
          display="flex"
          alignItems="center"
          postion="absolute"
          justifyContent="left"
          fontSize="0.875rem"
          fontWeight="400"
          color="#000"
          style={{
            transition: "all 0.3s ease-in-out", // Smooth animation
          }}
        >
          {`Remaining: ${remainingWidth}`}
        </MDBox>
      </MDBox>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <MDBox p={2}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="16px"
              >
                <MDTypography variant="h6" fontWeight="500">
                  Stock Material Optimization
                </MDTypography>
                <Button
                  onClick={addRow}
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#5e72e4",
                    color: "#ffffff",
                    textTransform: "none",
                    borderRadius: "8px",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Add Row
                </Button>
              </MDBox>
              <MDBox>
                {rows.map((row, index) => (
                  <MDBox key={index}>{renderStockLength(row, index)}</MDBox>
                ))}
              </MDBox>
            </MDBox>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DraggableTable;
