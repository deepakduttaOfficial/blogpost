import React, { useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import Base from "../core/Base";
import {
  AccountFeild,
  AlertFeild,
  ButtonFeild,
  InputFeild,
  TypographyFeild,
} from "./UserCore";
import { authenticate, isAuthenticate, signin } from "../auth/helper";
import { Navigate } from "react-router-dom";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const { loading, email, password, success, error } = values;
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      loading: false,
    });
  };
  const isSubmit = () => {
    setValues({
      ...values,
      loading: true,
      errror: false,
      success: false,
    });

    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              email: "",
              password: "",
              error: false,
              success: data,
              loading: false,
            });
          });
        }
      })
      .catch((error) => {
        console.log("Sign up error", error);
      });
  };
  return (
    <>
      {isAuthenticate() && <Navigate to={"/profile"} />}
      <Base>
        <Container maxWidth="sm">
          {success && (
            <AlertFeild
              severity={"success"}
              AlertHeader={"Sign in successfully"}
              AlertBody={"Redirecting..."}
            />
          )}
          {error && (
            <AlertFeild
              severity={"error"}
              AlertHeader={"Sign in Fail"}
              AlertBody={error}
            />
          )}
          <TypographyFeild TypographyText={"Sign In page"} />
          <Box>
            <Paper elevation={2} sx={{ padding: "50px 40px" }}>
              <InputFeild
                label={"Email"}
                value={email}
                onChange={handleChange("email")}
                error={error}
                type={"email"}
              />
              <InputFeild
                label={"Password"}
                value={password}
                onChange={handleChange("password")}
                error={error}
                type={"password"}
              />
              <ButtonFeild
                onClick={isSubmit}
                buttonText={"Sign in"}
                open={loading}
              />
              <AccountFeild
                AccountText={"Don't have an account?"}
                AccountLink={"/signup"}
                AccountLinkText={"Sign up"}
              />
            </Paper>
          </Box>
        </Container>
      </Base>
    </>
  );
};

export default Signin;
