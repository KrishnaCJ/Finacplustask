import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const CommentModal = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const classes = useStyles();

  useEffect(() => {
    // Fetch comments data from the API
    fetch("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));

    // Hardcoded list of users (sorted alphabetically)
    const userList = [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Emily",
      "Frank",
      "Grace",
      "Henry",
    ].sort();
    setUsers(userList);
  }, []);

  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const handleNewUserAdd = () => {
    if (newUser === "") {
      setSnackbarMessage("Please enter a valid username.");
      setSnackbarOpen(true);
      return;
    }

    const existingUser = users.find((user) =>
      user.toLowerCase().includes(newUser.toLowerCase())
    );
    if (existingUser) {
      setSnackbarMessage("This user already exists.");
      setSnackbarOpen(true);
      return;
    }

    const updatedUsers = [...users, newUser].sort();
    setUsers(updatedUsers);
    setNewUser("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSaveComment = () => {
    if (selectedUsers.length === 0) {
      setSnackbarMessage("Please tag at least one user.");
      setSnackbarOpen(true);
      return;
    }

    // Logic to save the comment with selected users
    // Here, you can implement your own logic to handle the comment and users data

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Comment</DialogTitle>
      <DialogContent>
        {/* Comment Input */}
        <TextField
          autoFocus
          margin="dense"
          label="Comment"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          required
        />

        {/* User Dropdown */}
        <FormControl fullWidth margin="normal" variant="outlined" required>
          <InputLabel id="user-select-label">Tagged Users</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            multiple
            value={selectedUsers}
            onChange={handleUserChange}
            renderValue={(selected) =>
              selected.map((user) => (
                <Avatar className={classes.avatar} key={user}>
                  {user.slice(0, 1).toUpperCase()}
                </Avatar>
              ))
            }
          >
            {users.map((user) => (
              <MenuItem key={user} value={user}>
                <Avatar className={classes.avatar}>
                  {user.slice(0, 1).toUpperCase()}
                </Avatar>
                {user}
              </MenuItem>
            ))}
            <MenuItem value="add-new">Add New</MenuItem>
          </Select>
        </FormControl>

        {/* New User Input */}
        {selectedUsers.includes("add-new") && (
          <TextField
            margin="dense"
            label="New User"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveComment} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default CommentModal;
