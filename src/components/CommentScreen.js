const CommentScreen = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState(commentsData);

  const handleAddCommentClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCommentClick}
        className={classes.addButton}
      >
        Add Comment
      </Button>
      <AddCommentModal
        open={modalOpen}
        onClose={handleModalClose}
        onSaveComment={handleSaveComment}
      />
      <Typography variant="h4" component="h1">
        Comments ({comments.length})
      </Typography>
      {comments.map((comment, index) => (
        <div key={index} className={classes.commentContainer}>
          {/* Replace the Avatar with initials */}
          <Avatar>{comment.updatedBy[0]}</Avatar>
          <div>
            <Typography variant="subtitle1">{comment.updatedBy}</Typography>
            <Typography variant="body1">{comment.comment}</Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentScreen;
