import React from "react";
import { NavLink } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";

//Table Profile
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
//

export const InputFeild = (props) => {
  const { label, value, onChange, error, variant = "outlined", type } = props;
  return (
    <>
      <TextField
        label={label}
        sx={{ margin: "5px" }}
        fullWidth
        variant={variant}
        size="small"
        value={value}
        onChange={onChange}
        error={error}
        type={type}
      />
    </>
  );
};

export const ButtonFeild = (props) => {
  const { onClick, buttonText, open } = props;
  return (
    <Stack spacing={2} sx={{ width: "100%", marginLeft: "5px" }}>
      <Button onClick={onClick} variant="outlined">
        {" "}
        {buttonText}
      </Button>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
};

export const TypographyFeild = (props) => {
  const { TypographyText } = props;
  return (
    <Typography
      variant="h4"
      sx={{ margin: "20px", fontFamily: "'Lobster', cursive" }}
      align="center"
      component="h4"
      className="typography-page-heading"
    >
      {TypographyText}
    </Typography>
  );
};

export const AccountFeild = (props) => {
  const { AccountText, AccountLink, AccountLinkText } = props;
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="subtitle2" align={"right"}>
        {AccountText}
        <NavLink style={{ marginLeft: "3px" }} to={AccountLink}>
          {AccountLinkText}
        </NavLink>
      </Typography>
    </Box>
  );
};

export const AlertFeild = (props) => {
  const { severity, AlertHeader, AlertBody, AlertStrong, AlertLink } = props;
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity}>
        <AlertTitle>{AlertHeader}</AlertTitle>
        {AlertBody}{" "}
        <strong>
          {AlertLink && (
            <NavLink style={{ marginLeft: "3px" }} to={AlertLink}>
              — {AlertStrong}
            </NavLink>
          )}
        </strong>
      </Alert>
    </Stack>
  );
};

export const TableFeild = (props) => {
  const { headText, bodyText } = props;
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Typography variant="button" display="block">
          {headText} :
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Typography variant="subtitle2" component="div">
          {bodyText}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};
export const MiniTableFeild = (props) => {
  const { index, title, like } = props;
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {index}
      </StyledTableCell>
      <StyledTableCell>{title}</StyledTableCell>
      <StyledTableCell align="right">{like}</StyledTableCell>
    </StyledTableRow>
  );
};
