import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { NumericFormat } from "react-number-format";
import { formatNumber } from "../utils";

const Vivienda = () => {
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
    const raw = e.target.value
      .replace(/[^\d,]/g, "")   // deja solo dígitos y coma
      .replace(/\./g, "")       // elimina los puntos
      .replace(/,/g, ".");      // cambia coma por punto
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

    const capitalNum = Number.parseFloat(capital);
    const dolarNum = Number.parseFloat(dolar);
    const costHomeNum = Number.parseFloat(costHome);

    if (Number.isNaN(capitalNum) || Number.isNaN(dolarNum) || Number.isNaN(costHomeNum)) {
      return;
    }

    const savedMoney = capitalNum / dolarNum;
    const result = (costHomeNum - savedMoney) * dolarNum;

    setObjetive(formatNumber(result));
  };

  return (
    <React.Fragment>
      {objetive && (
        <Typography color="textPrimary" variant="h4">
          Te faltan{" "}
          <Typography color="primary" variant="h4" component="div">
            ${objetive}
          </Typography>{" "}
          pesos para comprar la casa de tus sueños.
        </Typography>
      )}

      <form className="form" onSubmit={calcular}>
        <NumericFormat
          value={capital}
          onChange={handleChangeNumber(setCapital)}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          valueIsNumericString
          helperText={errors.capital}
          error={Boolean(errors.capital)}
          variant="standard"
          fullWidth
          label="Capital"
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
            }
          }}
        />

        <NumericFormat
          value={dolar}
          onChange={handleChangeNumber(setDolar)}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          valueIsNumericString
          helperText={errors.dolar}
          error={Boolean(errors.dolar)}
          variant="standard"
          fullWidth
          label="Dólar"
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

        <NumericFormat
          value={costHome}
          onChange={handleChangeNumber(setCostHome)}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          valueIsNumericString
          helperText={errors.costHome}
          error={Boolean(errors.costHome)}
          variant="standard"
          fullWidth
          label="Costo de la vivienda"
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
    </React.Fragment>
  );
};

export default Vivienda;
