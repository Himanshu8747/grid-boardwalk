import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

// Define grid settings
const GRID_COLUMNS = 4;

// Nodes Data
const initialNodes = [
  { id: "1", type: "accessible", data: { label: "Flow" }, position: { x: 0, y: 0 } },
  { id: "2", type: "accessible", data: { label: "expect..." }, position: { x: 200, y: 0 } },
  { id: "3", type: "accessible", data: { label: "step3" }, position: { x: 400, y: 0 } },
  { id: "4", type: "accessible", data: { label: "Free_Te..." }, position: { x: 600, y: 0 } },
  { id: "5", type: "accessible", data: { label: "21232@..." }, position: { x: 0, y: 100 } },
  { id: "6", type: "accessible", data: { label: "New Sp..." }, position: { x: 200, y: 100 } },
  { id: "7", type: "accessible", data: { label: "new" }, position: { x: 400, y: 100 } },
  { id: "8", type: "accessible", data: { label: "Test.txt" }, position: { x: 600, y: 100 } },
  { id: "9", type: "accessible", data: { label: "Chat" }, position: { x: 0, y: 200 } },
  { id: "10", type: "accessible", data: { label: "somnat..." }, position: { x: 200, y: 200 } },
  { id: "11", type: "accessible", data: { label: "New.txt" }, position: { x: 400, y: 200 } },
  { id: "12", type: "accessible", data: { label: "ripple..." }, position: { x: 600, y: 200 } },
];

// Edges Data
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "Flow to expect..." },
  { id: "e2-3", source: "2", target: "3", label: "expect... to step3" },
  { id: "e3-4", source: "3", target: "4", label: "step3 to Free_Te..." },
  { id: "e5-6", source: "5", target: "6", label: "21232@... to New Sp..." },
  { id: "e6-7", source: "6", target: "7", label: "New Sp... to new" },
  { id: "e7-8", source: "7", target: "8", label: "new to Test.txt" },
  { id: "e9-10", source: "9", target: "10", label: "Chat to somnat..." },
  { id: "e10-11", source: "10", target: "11", label: "somnat... to New.txt" },
  { id: "e10-12", source: "10", target: "12", label: "somnat... to ripple..." },
];

// Combine nodes & edges
const allElements = [...initialNodes, ...initialEdges];

const FlowComponent = () => {
  const [focusedElementIndex, setFocusedElementIndex] = useState(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.target.tagName !== "BODY") return;

      let newIndex = focusedElementIndex ?? 0; // Start at first element if no selection
      const isNode = newIndex < initialNodes.length;
      const isEdge = newIndex >= initialNodes.length;

      if (isNode) {
        // Move within nodes
        switch (event.key) {
          case "ArrowUp":
            newIndex = newIndex - GRID_COLUMNS >= 0 ? newIndex - GRID_COLUMNS : newIndex;
            break;
          case "ArrowDown":
            newIndex = newIndex + GRID_COLUMNS < initialNodes.length ? newIndex + GRID_COLUMNS : newIndex;
            break;
          case "ArrowLeft":
            if (newIndex % GRID_COLUMNS !== 0) newIndex -= 1;
            break;
          case "ArrowRight":
            if ((newIndex + 1) % GRID_COLUMNS !== 0) newIndex += 1;
            break;
        }
      } else if (isEdge) {
        // Move within edges
        switch (event.key) {
          case "ArrowUp":
          case "ArrowDown":
            newIndex = newIndex - initialNodes.length > 0 ? newIndex - 1 : newIndex;
            break;
          case "ArrowLeft":
            newIndex = newIndex - 1 >= initialNodes.length ? newIndex - 1 : newIndex;
            break;
          case "ArrowRight":
            newIndex = newIndex + 1 < allElements.length ? newIndex + 1 : newIndex;
            break;
        }
      }

      if (event.key === "Tab") {
        newIndex = (newIndex + 1) % allElements.length;
        event.preventDefault();
      } else if (event.key === "Shift+Tab") {
        newIndex = (newIndex - 1 + allElements.length) % allElements.length;
        event.preventDefault();
      }

      setFocusedElementIndex(newIndex);
    },
    [focusedElementIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div style={{ height: "100vh", width: "100vw" }} tabIndex={0}>
      <ReactFlow
        nodes={initialNodes.map((node, index) => ({
          ...node,
          style: {
            border: focusedElementIndex === index ? "3px solid #ff4500" : "2px solid #ddd",
            backgroundColor: focusedElementIndex === index ? "#ffddc1" : "#fff",
            borderRadius: "5px",
            padding: "10px",
            textAlign: "center",
          },
        }))}
        edges={initialEdges.map((edge, index) => ({
          ...edge,
          animated: focusedElementIndex === initialNodes.length + index,
          style: {
            stroke: focusedElementIndex === initialNodes.length + index ? "#ff1493" : "#ccc",
            strokeWidth: focusedElementIndex === initialNodes.length + index ? 5 : 2,
            opacity: focusedElementIndex === initialNodes.length + index ? 1 : 0.6,
          },
          labelStyle: {
            fill: focusedElementIndex === initialNodes.length + index ? "#ff1493" : "#000",
            fontWeight: focusedElementIndex === initialNodes.length + index ? "bold" : "normal",
          },
        }))}
        fitView
        attributionPosition="top-right"
      >
        <Background color="#aaa" gap={16} />
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  );
};

export default FlowComponent;
