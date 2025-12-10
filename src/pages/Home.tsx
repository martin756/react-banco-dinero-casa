import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        minHeight: "80vh",
      }}
    >
      <Typography variant="h3" component="h1" color="textPrimary" gutterBottom>
        Calculadora Banco Casa y Dinero
      </Typography>
      
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Selecciona una opción para calcular
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/plazofijo")}
        >
          Plazo Fijo
        </Button>
        
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/vivienda")}
        >
          Vivienda
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
