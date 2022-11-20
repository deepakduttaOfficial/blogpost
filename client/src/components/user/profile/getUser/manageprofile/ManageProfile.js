import {
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Collapse,
  Card,
  CardHeader,
  Avatar,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { isAuthenticate } from "../../../../auth/helper";
import { ImageHelper } from "../../../../core/helper/ImageHelper";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletepost } from "../../../helper";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Core(props) {
  const {
    title,
    postBody,
    post,
    id,
    createdAt,
    setReload = (f) => f,
    reload = undefined,
  } = props;
  const { user, token } = isAuthenticate();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dateString = createdAt;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name[0]}
          </Avatar>
        }
        title={<Typography variant="subtitle2">{user.name}</Typography>}
        subheader={`${formatDate(dateString)}`}
      />
      <Box>
        <CardContent>
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
        <ImageHelper post={post} />
        <CardActions disableSpacing>
          <IconButton>
            <NavLink to={`/profile/update/${id}`}>
              <EditIcon sx={{ color: "gray" }} />
            </NavLink>
          </IconButton>
          <IconButton
            onClick={() => {
              setLoading(true);
              deletepost(user._id, id, token).then((data) => {
                if (data.error) {
                  setLoading(false);
                } else {
                  setReload(!reload);
                  setLoading(true);
                }
              });
            }}
          >
            <DeleteIcon />
          </IconButton>

          <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{postBody}</Typography>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}
