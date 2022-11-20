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
import { isAuthenticate, signup } from "../auth/helper";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const { loading, name, email, password, success, error } = values;
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

    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: false,
            success: true,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log("Sign up error", error);
      });
  };
  return (
    <>
      <Base>
        <Container maxWidth="sm">
          {success && (
            <AlertFeild
              severity={"success"}
              AlertHeader={"Sign up successfully"}
              AlertBody={"Sign in here"}
              AlertLink={"/signin"}
              AlertStrong={"Sign in"}
            />
          )}
          {error && (
            <AlertFeild
              severity={"error"}
              AlertHeader={"Sign up Fail"}
              AlertBody={error}
            />
          )}
          <TypographyFeild TypographyText={"Sign up page"} />
          <Box>
            <Paper elevation={2} sx={{ padding: "50px 40px" }}>
              <InputFeild
                label={"Name"}
                value={name}
                onChange={handleChange("name")}
                error={error}
                type={"text"}
              />
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
                buttonText={"Sign up"}
                open={loading}
              />
              <AccountFeild
                AccountText={"Already have an account?"}
                AccountLink={"/signin"}
                AccountLinkText={"Sign in"}
              />
              {isAuthenticate() && <Navigate to={"/"} />}
            </Paper>
          </Box>
        </Container>
      </Base>
    </>
  );
};

export default Signup;
