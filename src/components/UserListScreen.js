import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userListContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
}));

const UserListScreen = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([
    "Dan Jenkin",
    "Ethel Howard Daniel",
    "Helen Stevens",
    "John Doe",
  ]);
  const [showAddUserInput, setShowAddUserInput] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");

  const handleAddUserInputChange = (event) => {
    setNewUser(event.target.value);
  };

  const handleAddUser = () => {
    if (newUser.trim() === "") {
      setError("Please enter a valid username.");
    } else if (users.includes(newUser)) {
      setError("User already exists.");
    } else {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser].sort((a, b) =>
          a.localeCompare(b)
        );
        return updatedUsers;
      });
      setNewUser("");
      setShowAddUserInput(false);
      setError("");
    }
  };

  const handleAddUserInputToggle = () => {
    setShowAddUserInput((prevValue) => !prevValue);
    setNewUser("");
    setError("");
  };

  return (
    <div>
      <div className={classes.userListContainer}>
        {showAddUserInput ? (
          <div>
            <FormControl>
              <InputLabel id="newUser-label">New User</InputLabel>
              <Select
                labelId="newUser-label"
                id="newUser"
                value={newUser}
                onChange={handleAddUserInputChange}
                autoFocus
              >
                <MenuItem value={newUser}>{newUser}</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" color="primary" onClick={handleAddUser}>
              Add
            </Button>
            <Button onClick={handleAddUserInputToggle}>Cancel</Button>
            {error && <Typography color="error">{error}</Typography>}
          </div>
        ) : (
          <Button onClick={handleAddUserInputToggle}>Add New</Button>
        )}
      </div>
      <Typography variant="h4" component="h1">
        User List
      </Typography>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListScreen;
