import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
  TextField,
  FormControl,
  Snackbar,
  Select,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userListButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  popover: {
    padding: theme.spacing(5),
  },
  comment: {
    marginBottom: theme.spacing(5),
  },
  loanID: {
    display: "flex",
    alignItems: "right",
    justifyContent: "right",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(110),
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(2),
      justifyContent: "center",
    },
    background: "#99ccff",
    position: "relative",
    padding: "5px",
  },
  spanComment: {
    marginBottom: theme.spacing(5),
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },
}));

const App = () => {
  const classes = useStyles();
  const [userListAnchorEl, setUserListAnchorEl] = useState(null);
  const [popupAnchorEl, setPopupAnchorEl] = useState(null);
  const [selectedComments, setSelectedComments] = useState([]);
  const [loanId, setLoanId] = useState("");
  const [commentsData, setCommentsData] = useState([]);
  const [comment, setComment] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [people, setPeople] = useState(["Alice", "Bob", "Charlie"]);
  const [newUser, setNewUser] = useState("");
  const [showAddNew, setShowAddNew] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleNewUserChange = (event) => {
    setNewUser(event.target.value);
  };

  const handleAddNewClick = () => {
    setShowAddNew(false);
    setTimeout(() => {
      const inputField = document.getElementById("newUserInput");
      if (inputField) {
        inputField.focus();
      }
    }, 0);
  };

  const handleTickClick = () => {
    if (newUser === "") {
      setSnackbarMessage("Please enter a valid username");
      setShowSnackbar(true);
      setTimeout(() => {
        const inputField = document.getElementById("newUserInput");
        if (inputField) {
          inputField.focus();
        }
      }, 0);
    } else if (people.includes(newUser)) {
      setSnackbarMessage("Username already exists");
      setShowSnackbar(true);
      setTimeout(() => {
        const inputField = document.getElementById("newUserInput");
        if (inputField) {
          inputField.focus();
          inputField.select();
        }
      }, 0);
    } else {
      const updatedPeople = [...people, newUser].sort();
      setPeople(updatedPeople);
      setNewUser("");
      setShowAddNew(true);
    }
  };

  const handleCrossClick = () => {
    setShowAddNew(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  const isSaveDisabled = !comment || !isChecked;

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
      .then((response) => {
        setCommentsData(response.data.comments);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, []);

  const handleUserListButtonClick = (event) => {
    setUserListAnchorEl(event.currentTarget);
  };

  const handleUserListMenuClose = () => {
    setUserListAnchorEl(null);
  };

  const handleAddCommentClick = (event) => {
    setLoanId(generateLoanId());
    setPopupAnchorEl(event.currentTarget);
  };

  const handlePopupClose = () => {
    setPopupAnchorEl(null);
    setSelectedComments([]);
    setLoanId("");
  };

  const handleCommentSelect = (event) => {
    setSelectedComments(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Exclude autoFocus behavior for checkbox items
    if (!checked) {
      setIsChecked(false);
      return;
    }

    setIsChecked(true);
    setSelectedComments((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handleSave = () => {
    const newComment = {
      updatedBy: "Finac Plus ",
      comment: comment,
      updatedOn: new Date().toISOString(),
      taggedTo: selectedComments,
    };

    const updatedComments = [...commentsData, newComment];
    setCommentsData(updatedComments);
    setComment("");
    setSelectedComments([]);

    console.log("Save button clicked");
  };

  const generateLoanId = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names[0].charAt(0) + names[names.length - 1].charAt(0);
    return initials.toUpperCase();
  };

  return (
    <Container>
      <IconButton
        className={classes.userListButton}
        color="inherit"
        onClick={handleUserListButtonClick}
      >
        <ArrowDropDownIcon />
        <p>Friends</p>
      </IconButton>
      <Menu
        anchorEl={userListAnchorEl}
        open={Boolean(userListAnchorEl)}
        onClose={handleUserListMenuClose}
      >
        {[...new Set(commentsData.map((comment) => comment.updatedBy))].map(
          (username, index) => (
            <MenuItem key={index} onClick={handleUserListMenuClose}>
              <strong>{username}</strong>
            </MenuItem>
          )
        )}
      </Menu>

      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <ButtonGroup variant="contained" color="primary">
              <Button
                startIcon={<AddIcon />}
                size="large"
                onClick={handleAddCommentClick}
              >
                Add Comment
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>

      <Popover
        anchorEl={popupAnchorEl}
        open={Boolean(popupAnchorEl)}
        onClose={handlePopupClose}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <div className={classes.popover}>
          <Button className={classes.loanID}>
            <strong>Loan ID - {loanId}</strong>
          </Button>
          <Typography className={classes.spanComment}>
            Comments({commentsData.length})
          </Typography>
          {commentsData.map((comment, index) => (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  style={{
                    marginBottom: "-15px",
                    marginTop: "-100px",
                    marginRight: "30px",
                  }}
                >
                  <Typography>{getInitials(comment.updatedBy)}</Typography>
                </Avatar>
                <Typography
                  key={index}
                  variant="body1"
                  className={classes.comment}
                >
                  <strong>{comment.updatedBy}</strong>
                  <br />
                  {comment.comment}
                  <>
                    {comment.taggedTo.length !== 0 && (
                      <>
                        <br />
                        <Button>{comment.taggedTo}</Button>
                      </>
                    )}
                  </>
                  <br />
                  {formatDate(comment.updatedOn)}
                </Typography>
              </div>
            </>
          ))}
          <FormControl className={classes.textField} fullWidth>
            <TextField
              id="outlined-basic"
              label="Your Comment"
              variant="outlined"
              multiline
              rows={4}
              value={comment}
              onChange={handleCommentChange}
            />
            <br />
            <Select
              multiple
              value={selectedComments}
              onChange={handleCommentSelect}
              renderValue={(selected) => selected.join(" ")}
              variant="outlined"
              placeholder="Tag To"
            >
              {people.map((person, index) => (
                <MenuItem key={index} value={person}>
                  <Checkbox
                    checked={isChecked && selectedComments.indexOf(person) > -1}
                    onChange={handleCheckboxChange}
                  />
                  <ListItemText primary={person} />
                </MenuItem>
              ))}
              {showAddNew && (
                <MenuItem value="Tag to:" onClick={handleAddNewClick}>
                  Add New user
                </MenuItem>
              )}
              {!showAddNew && (
                <div>
                  <TextField
                    id="newUserInput"
                    value={newUser}
                    onChange={handleNewUserChange}
                    autofocus
                  />
                  <span onClick={handleTickClick}> ✅</span> &nbsp;&nbsp;
                  <span onClick={handleCrossClick}>✖</span>
                </div>
              )}
              <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity="error">
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Select>

            <br />

            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={isSaveDisabled}
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Cancel</Button>
              </Grid>
            </Grid>
          </FormControl>

          <IconButton
            className={classes.closeButton}
            onClick={handlePopupClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </Popover>
    </Container>
  );
};

export default App;
