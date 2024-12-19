import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const pages = [
    { name: "Insurance products", path: "/" },
    { name: "Coverages", path: "/page2" },
    { name: "Rules", path: "/page3" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {pages.map((page, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={page.path}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
