import React, { useState } from "react";
import { Box, Button, Typography, Avatar, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { InfoOutlined, StarBorder } from "@mui/icons-material";

// Dummy Data
const rows = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `test ${index + 1}`,
  created: "03/04/2025 03:53 PM",
  modified: "03/04/2025 03:53 PM",
  shared: "Personal",
  owner: "Personal",
}));

// Column Definitions
const columns = [
  {
    field: "id",
    headerName: "#",
    width: 50,
    headerClassName: "custom-header",
    description: "Row Number",
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    headerClassName: "custom-header",
    description: "Workspace Name",
    renderCell: (params) => (
      <Box display="flex" alignItems="center">
        <Avatar
          sx={{ width: 30, height: 30, mr: 1 }}
          aria-label={`Avatar for ${params.value}`}
        >
          S
        </Avatar>
        <span aria-label={`Workspace name: ${params.value}`}>{params.value}</span>
      </Box>
    ),
  },
  {
    field: "created",
    headerName: "Date Created",
    width: 180,
    headerClassName: "custom-header",
    description: "Date when the workspace was created",
  },
  {
    field: "modified",
    headerName: "Date Last Modified",
    width: 200,
    headerClassName: "custom-header",
    description: "Last modified date of the workspace",
  },
  {
    field: "shared",
    headerName: "Shared",
    width: 150,
    headerClassName: "custom-header",
    description: "Sharing status of the workspace",
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 150,
    headerClassName: "custom-header",
    description: "Owner of the workspace",
  },
  {
    field: "starred",
    headerName: "Starred",
    width: 100,
    headerClassName: "custom-header",
    description: "Mark as favorite",
    renderCell: () => (
      <Tooltip title="Mark as favorite" arrow>
        <IconButton aria-label="Mark workspace as favorite">
          <StarBorder sx={{ color: "#ccc" }} />
        </IconButton>
      </Tooltip>
    ),
  },
];

const WorkspaceDataGrid = () => {
  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <Box sx={{ width: "98.5%", p: 2 }}>
      {/* Title & Add Space Button */}
      <Typography variant="h6" sx={{ mb: 2 }} aria-label="Workspace Section">
        WCAG Test
      </Typography>
      <Button variant="outlined" sx={{ mb: 2 }} aria-label="Add a new space">
        + Add Space
      </Button>

      {/* Data Grid */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          aria-label="Workspace data table"
          rows={rows}
          columns={columns}
          checkboxSelection
          pageSizeOptions={[10, 20, 25]}
          pagination
          onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
          selectionModel={selectionModel}
          sx={{
            "& .custom-header": {
              fontWeight: "bold",
            },
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Tooltip title="Get more info" arrow>
          <Button variant="outlined" startIcon={<InfoOutlined />} aria-label="Get more information">
            Info
          </Button>
        </Tooltip>
        <Tooltip title="Invite users" arrow>
          <Button variant="contained" color="primary" sx={{ ml: 2 }} aria-label="Invite users to workspace">
            Invite
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default WorkspaceDataGrid;
