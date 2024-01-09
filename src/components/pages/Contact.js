import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import "../styles/Contact.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Contact = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Contact Information
        </Typography>
        <Divider style={{ marginBottom: "20px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              <Typography style={{ display: "flex", alignItems: "center" }}>
                <a
                  href="https://www.linkedin.com/in/christian-lulaj"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "blue",
                    marginRight: "10px",
                  }}
                >
                  <LinkedInIcon style={{ marginRight: "5px" }} />
                  LinkedIn
                </a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography>
                <a href="mailto:lulajchristian@gmail.com">
                  lulajchristian@gmail.com
                </a>
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                Phone
              </Typography>
              <Typography>
                <a href="tel:+5869400293">+1 586-940-0293</a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
