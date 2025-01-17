import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useNavigate } from "react-router-dom";
import { resetCoursesParams, fetchCoursesAsync } from "../courseSlice";
import { useAppDispatch } from "../../../app/store/configureStore";
import { Grid } from "@mui/joy";

export default function AppAppBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleNavigate = () => {
    dispatch(resetCoursesParams());
    dispatch(fetchCoursesAsync());
    navigate("/onlineStudy", { replace: true });
  };
  return (
    <Box
      //enableColorOnDark
      sx={{
        // width:"50%",
        // top: 30,
        boxShadow: 0,
        bgcolor: "background.paper",
        borderRadius: "22px",

        backgroundImage: "none",
        // mt: 10,
        //textAlign: "center",
        padding: 0,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
      }}
    >
      <Grid
        // maxWidth="lg"
        sx={{
          // position: "fixed",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          margin: 0,
          width: "100%",
        }}
      >
        <Toolbar
          // disableGutters
          variant="dense"
          sx={{
            // backdropFilter: "blur(36px)",
            // backgroundColor: "secondary.main",
            // border: "1px solid ",
            // borderColor: "text.secondary",
            padding: 0,
            width: "70%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              px: 0,
              justifyContent: "space-evenly",
              margin: 0,
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                margin: 0,
                padding: 0,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{
                  paddingX: 2,
                  borderRadius: "25pt",
                  color: "text.primary",
                  fontWeight: "bold",
                  transition: "all 0.5s ease", // Dodaje animaciju
                  backgroundColor: "transparent",
                  "&:hover": {
                    color: "action.hover", // Promijeni boju na hover
                    backgroundColor: "action.active",
                  },
                  fontFamily: "Raleway, sans-serif",
                }}
                component={Link}
                to="/courses?type=all"
              >
                Svi kursevi
              </Button>
            </Box>
            <Box
              onClick={handleNavigate}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer", // Dodano da miš postane pointer
                "&:hover": {
                  cursor: "pointer", // Osigurano i za hover stanje
                },
              }}
            >
              <SchoolIcon
                sx={{
                  color: "text.primary",
                  fontWeight: "bold",
                  margin: 0,
                  padding: 0,
                  transition: "all 0.5s ease", // Dodaje animaciju
                  // backgroundColor: "transparent",
                  "&:hover": {
                    color: "primary.main", // Promijeni boju na hover
                  },
                }}
              />
            </Box>
            
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                margin: 0,
                padding: 0,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{
                  paddingX: 2,
                  borderRadius: "25pt",
                  color: "text.primary",
                  fontWeight: "bold",
                  transition: "all 0.5s ease", // Dodaje animaciju
                  backgroundColor: "transparent",
                  "&:hover": {
                    color: "action.hover", // Promijeni boju na hover
                    backgroundColor: "action.active",
                  },
                  fontFamily: "Raleway, sans-serif",
                }}
                component={Link}
                to="/courses?type=my"
              >
                Moje učenje
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Grid>
    </Box>
  );
}
