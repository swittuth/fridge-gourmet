import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

// should show login / register when the user is not logged in yet
export function UserModalLogin(prop) {
  const [loginMode, setLoginMode] = useState(false);

  return (
    <Modal
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "60%",
          width: "60%",
          backgroundColor: "white",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: "10px",
          backgroundColor: "primary.main",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "min-content",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "30px",
          }}
        >
          <HighlightOffIcon
            sx={{
              cursor: "pointer",
              color: "primary.dark",
              "&:hover": {
                color: "primary.light",
              },
            }}
            onClick={() => {
              prop.setLoginMode(false);
            }}
          ></HighlightOffIcon>
        </Box>

        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* user is attempting to login */}
          {loginMode && (
            <Paper
              elevation={5}
              sx={{
                height: "80%",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  marginTop: "5px",
                  width: "100%",
                  height: "max-content",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "2em",
                    color: "secondary.dark",
                  }}
                >
                  LOGIN
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <TextField
                  label="Username"
                  sx={{
                    width: "90%",
                  }}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  sx={{
                    width: "90%",
                  }}
                ></TextField>
                <Button
                  variant="contained"
                  sx={{
                    width: "90%",
                    backgroundColor: "primary.dark",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#64b5f6",
                    },
                  }}
                >
                  SUBMIT
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "90%",
                    backgroundColor: "#d32f2f",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ff1744",
                    },
                  }}
                >
                  <GoogleIcon></GoogleIcon>
                </Button>
                <Typography
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    transitionDuration: "0.3s",
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                  onClick={() => {
                    setLoginMode(false);
                  }}
                >
                  Don't have an account? Register!
                </Typography>
              </Box>
            </Paper>
          )}

          {/* user is attempting to register an account */}
          {!loginMode && (
            <Paper
              elevation={5}
              sx={{
                height: "80%",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  marginTop: "5px",
                  width: "100%",
                  height: "max-content",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "2em",
                    color: "secondary.dark",
                  }}
                >
                  REGISTER
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <TextField
                  label="Username"
                  sx={{
                    width: "90%",
                  }}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  sx={{
                    width: "90%",
                  }}
                ></TextField>
                <Button
                  variant="contained"
                  sx={{
                    width: "90%",
                    backgroundColor: "primary.dark",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#64b5f6",
                    },
                  }}
                >
                  REGISTER ACCOUNT
                </Button>
                <a
                  className="google-auth-button"
                  href="http://localhost:3001/auth/google"
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      backgroundColor: "#d32f2f",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#ff1744",
                      },
                    }}
                  >
                    <GoogleIcon></GoogleIcon>
                  </Button>
                </a>
                <Typography
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    transitionDuration: "0.3s",
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                  onClick={() => {
                    setLoginMode(true);
                  }}
                >
                  Return to Sign In
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
