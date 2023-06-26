import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 200,
    overflowY: "auto",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const CommentList = () => {
  const [comments, setComments] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    // Fetch comments data from the API
    fetch("https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9")
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Comments ({comments.length})
      </Typography>
      <List className={classes.root}>
        {Object.keys(comments).map((comment) => (
          <ListItem key={comment.id}>
            <ListItemAvatar>
              {/* <Avatar className={classes.avatar}>
                {comment.user
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase())
                  .join("")}
              </Avatar> */}
            </ListItemAvatar>
            <ListItemText
              primary={comment.user}
              secondary={new Date(comment.date).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CommentList;
