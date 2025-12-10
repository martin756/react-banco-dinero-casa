import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlazoFijo from "../components/PlazoFijo";

const PlazoFijoPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ px: 2 }}>
        <div className="content">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            variant="outlined"
          >
            Volver al inicio
          </Button>
          <PlazoFijo />
        </div>
      </Box>
    </>
  );
};

export default PlazoFijoPage;
