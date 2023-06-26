import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
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
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";

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
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [userListAnchorEl, setUserListAnchorEl] = React.useState(null);
  const [popupAnchorEl, setPopupAnchorEl] = React.useState(null);
  const [selectedComments, setSelectedComments] = React.useState([]);
  const [loanId, setLoanId] = React.useState("");
  const [commentsData, setCommentsData] = useState(false);

  useEffect(() => {
    fetch("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
      .then((response) => response.json())
      .then((data) => setCommentsData(data))
      .catch((error) => console.log(error));
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

  const generateLoanId = () => {
    // Generate a unique loan ID here (e.g., using a library like uuid)
    // For simplicity, we'll just use a random number here
    return Math.floor(Math.random() * 1000000);
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

  return (
    <Container>
      <IconButton
        className={classes.userListButton}
        color="inherit"
        onClick={handleUserListButtonClick}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={userListAnchorEl}
        open={Boolean(userListAnchorEl)}
        onClose={handleUserListMenuClose}
      >
        <MenuItem onClick={handleUserListMenuClose}>User 1</MenuItem>
        <MenuItem onClick={handleUserListMenuClose}>User 2</MenuItem>
        <MenuItem onClick={handleUserListMenuClose}>User 3</MenuItem>
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
      >
        <div className={classes.popover}>
          <Typography variant="h6" className={classes.comment}>
            Loan ID: {loanId}
          </Typography>
          {commentsData.comments.map((comment, index) => (
            <Typography key={index} variant="body1" className={classes.comment}>
              <strong>{comment.updatedBy}</strong> -{" "}
              {formatDate(comment.updatedOn)}
              <br />
              {comment.comment}
            </Typography>
          ))}
          <FormControl className={classes.textField} fullWidth>
            <InputLabel>Tagged To</InputLabel>
            <Select
              multiple
              value={selectedComments}
              onChange={handleCommentSelect}
              renderValue={(selected) => selected.join(", ")}
            >
              {commentsData.comments.map((comment, index) => (
                <MenuItem key={index} value={comment.taggedTo}>
                  <Checkbox
                    checked={selectedComments.indexOf(comment.taggedTo) > -1}
                  />
                  <ListItemText primary={comment.taggedTo.join(", ")} />
                </MenuItem>
              ))}
            </Select>
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
