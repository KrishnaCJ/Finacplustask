import React, { useState } from "react";
import UserListScreen from "./UserListScreen";
const AddCommentModal = ({ open, onClose }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [users, setUsers] = useState([
    "Dan Jenkin",
    "Ethel Howard Daniel",
    "Helen Stevens",
    "John Doe",
  ]);
  const [showAddUserInput, setShowAddUserInput] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleUserSelect = (selectedUsers) => {
    setTaggedUsers(selectedUsers);
  };

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
      setTaggedUsers((prevTaggedUsers) => [...prevTaggedUsers, newUser]);
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

  const handleModalClose = () => {
    setComment("");
    setTaggedUsers([]);
    onClose();
  };

  const handleSaveComment = () => {
    const newComment = {
      updatedBy: "Current User",
      comment,
      updatedOn: new Date().toISOString(),
      taggedTo: taggedUsers,
    };

    // Logic to save the comment or perform API call

    console.log("New Comment:", newComment);
    handleModalClose();
  };

  return (
    <Modal className={classes.modal} open={open} onClose={handleModalClose}>
      <div className={classes.modalContent}>
        <Typography variant="h5" component="h2">
          Add Comment
        </Typography>
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          margin="normal"
        />
        <UserListDropdown users={users} onUserSelect={handleUserSelect} />
        {showAddUserInput ? (
          <div>
            <TextField
              label="New User"
              value={newUser}
              onChange={handleAddUserInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="outlined" color="primary" onClick={handleAddUser}>
              Add
            </Button>
            <Button onClick={handleAddUserInputToggle}>Cancel</Button>
            {error && <Typography color="error">{error}</Typography>}
          </div>
        ) : (
          <Button onClick={handleAddUserInputToggle}>Add New</Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveComment}
          disabled={!comment || taggedUsers.length === 0}
          fullWidth
          className={classes.addButton}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddCommentModal;
