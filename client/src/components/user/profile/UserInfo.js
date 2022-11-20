import React from "react";
import { Paper, Table, TableBody, Stack, Avatar } from "@mui/material";
import { TableFeild, TypographyFeild } from "../UserCore";

const ProfileGride1 = (props) => {
  const { name, email, totalPost } = props;

  return (
    <Paper elevation={2} sx={{ padding: "8px" }}>
      <TypographyFeild TypographyText={`User info`} />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Avatar sx={{ bgcolor: "red" }}>{name[0]}</Avatar>
      </Stack>
      <Table>
        <TableBody>
          <TableFeild headText={"Name"} bodyText={name} />
          <TableFeild headText={"Email"} bodyText={email} />
          <TableFeild headText={"Total Post"} bodyText={totalPost} />

          {/* //////////////////////////////////////////////////////////////////////////////// */}
          {/* <TableRow>
            <TableCell>
              <IconButton onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography variant="h6">Posts</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Like</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <MiniTableFeild index={"1"} title={"Awesome"} like={5} />
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow> */}
          {/* //////////////////////////////////////////////////////////////////////////////// */}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProfileGride1;
