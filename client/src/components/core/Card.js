import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InfoIcon from "@mui/icons-material/Info";
import { ImageHelper } from "./helper/ImageHelper";
import { NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const matches = useMediaQuery("(max-width:700px)");
  const { post } = props;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const dateString = post.createdAt;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <Card
      sx={{
        width: matches ? "100%" : 345,
        marginBottom: "20px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.user.name[0]}
          </Avatar>
        }
        title={<Typography variant="subtitle2">{post.user.name}</Typography>}
        subheader={`${formatDate(dateString)}`}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {post.title}
        </Typography>
      </CardContent>
      <ImageHelper post={post} />
      <CardActions disableSpacing>
        <>
          {/* <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <ThumbUpIcon />
          </IconButton> */}
          <IconButton>
            <NavLink to={`/user/post/${post._id}`}>
              <InfoIcon color={"info"} />
            </NavLink>
          </IconButton>
        </>

        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{post.post}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
