import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Base from "./Base";
import Card from "./Card";
import { getposts } from "./helper";
import useMediaQuery from "@mui/material/useMediaQuery";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const Home = () => {
  const matches = useMediaQuery("(max-width:700px)");
  const [values, setValues] = useState([]);
  const [limit, setLimit] = useState(6);
  const [limitLoading, setLimitLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPost = () => {
    setLoading(true);
    getposts().then((data) => {
      if (data.error) {
        setValues({ ...values });
        setLoading(false);
      } else {
        setValues(data);
        setLoading(false);
        setLimitLoading(false);
      }
    });
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <div
      style={{
        height: matches ? "100vh" : "100vh",
        overflow: "scroll",
      }}
    >
      <Base
        className={{
          marginTop: matches ? "56px" : "65px",
          marginBottom: "50px",
        }}
      >
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: matches ? "center" : "left",
            }}
          >
            {values?.map((post, index) => {
              return (
                <Grid item key={index}>
                  <Card post={post} />
                </Grid>
              );
            })}
          </Grid>
          {limit > values.length ? (
            ""
          ) : (
            <Typography align="right">
              <DoubleArrowIcon
                sx={{ cursor: "pointer" }}
                fontSize="large"
                onClick={() => {
                  setLimit(limit + 6);
                  setLimitLoading(true);
                }}
              />
            </Typography>
          )}
          {limitLoading && (
            <Stack
              sx={{
                color: "grey.500",
                margin: "0px 0px 20px 0px",
                justifyContent: "center",
              }}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="primary" />
            </Stack>
          )}
        </Container>
      </Base>
    </div>
  );
};

export default Home;
