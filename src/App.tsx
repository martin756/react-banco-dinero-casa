import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Typography } from "@mui/material";
import "./App.css";

const formatNumber = (value: number | string) => {
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const App = () => {
  const [capital, setCapital] = React.useState("");
  const [dolar, setDolar] = React.useState("");
  const [costHome, setCostHome] = React.useState("");
  const [objetive, setObjetive] = React.useState("");

  const [errors, setErrors] = React.useState({
    capital: "",
    dolar: "",
    costHome: "",
  });

  const handleChangeNumber = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, ""); // solo números
    setter(raw);
  };

  const isFormValid = () => {
    const newErrors = { capital: "", dolar: "", costHome: "" };
    let isValid = true;

    if (!capital.trim()) {
      newErrors.capital = "El capital es obligatorio";
      isValid = false;
    }

    if (!dolar.trim()) {
      newErrors.dolar = "El valor del dólar es obligatorio";
      isValid = false;
    }

    if (!costHome.trim()) {
      newErrors.costHome = "El costo de la vivienda es obligatorio";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calcular = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) return;

    const capitalNum = Number(capital.replace(".", "").replace(",", "."));
    const dolarNum = Number(dolar.replace(".", "").replace(",", "."));
    const costHomeNum = Number(costHome.replace(".", "").replace(",", "."));

    if (Number.isNaN(capitalNum) || Number.isNaN(dolarNum) || Number.isNaN(costHomeNum)) {
      return;
    }

    const savedMoney = capitalNum / dolarNum;
    const result = (costHomeNum - savedMoney) * dolarNum;

    setObjetive(formatNumber(result));
  };

  return (
    <div className="content">
      {objetive && (
        <Typography color="textPrimary" variant="h4">
          Te faltan{" "}
          <Typography color="primary" variant="h4">
            ${objetive}
          </Typography>{" "}
          pesos para comprar la casa de tus sueños.
        </Typography>
      )}

      <form className="form" onSubmit={calcular}>
        <TextField
          fullWidth
          label="Capital"
          variant="standard"
          value={capital}
          onChange={handleChangeNumber(setCapital)}
          error={Boolean(errors.capital)}
          helperText={errors.capital}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: capital && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setCapital("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Dólar"
          variant="standard"
          value={dolar}
          onChange={handleChangeNumber(setDolar)}
          error={Boolean(errors.dolar)}
          helperText={errors.dolar}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: dolar && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setDolar("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Costo de la vivienda"
          variant="standard"
          value={costHome}
          onChange={handleChangeNumber(setCostHome)}
          error={Boolean(errors.costHome)}
          helperText={errors.costHome}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">USD</InputAdornment>,
              endAdornment: costHome && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setCostHome("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            },
          }}
        />
        <Button variant="contained" type="submit">
          Calcular
        </Button>
      </form>
    </div>
  );
};

export default App;
