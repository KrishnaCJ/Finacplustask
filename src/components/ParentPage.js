import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import CommentModal from "./CommentModal";

const usersList = ["Alice", "Bob", "Charlie", "Dave", "Eve"];

const ParentPage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan ID: {Math.random().toString(36).substring(7)}
          </Typography>
          <IconButton color="inherit" edge="end">
            {usersList}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* Add CommentModal component here */}
        <Box display="flex" justifyContent="center">
          <CommentModal />
        </Box>
      </Container>
    </>
  );
};

export default ParentPage;
