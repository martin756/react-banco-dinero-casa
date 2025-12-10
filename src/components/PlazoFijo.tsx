import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { NumericFormat } from "react-number-format";
import { formatNumber } from "../utils";

const PlazoFijo = () => {
  const [capital, setCapital] = React.useState("");
  const [tasa, setTasa] = React.useState("");
  const [dias, setDias] = React.useState("");
  const [result, setResult] = React.useState("");

  const [errors, setErrors] = React.useState({
    capital: "",
    tasa: "",
    dias: "",
  });

  const handleChangeNumber = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
      .replace(/[^\d,]/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".");
    setter(raw);
  };

  const isFormValid = () => {
    const newErrors = { capital: "", tasa: "", dias: "" };
    let isValid = true;

    if (!capital.trim()) {
      newErrors.capital = "El capital es obligatorio";
      isValid = false;
    }

    if (!tasa.trim()) {
      newErrors.tasa = "La tasa es obligatoria";
      isValid = false;
    }

    if (!dias.trim()) {
      newErrors.dias = "Los días son obligatorios";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calcular = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) return;

    const capitalNum = Number.parseFloat(capital);
    const tasaNum = Number.parseFloat(tasa);
    const diasNum = Number(dias);

    if (Number.isNaN(capitalNum) || Number.isNaN(tasaNum) || Number.isNaN(diasNum)) {
      return;
    }
    const savedMoney = (capitalNum * (tasaNum / 100) * (diasNum / 365));

    setResult(formatNumber(savedMoney));
  };

  return (
    <React.Fragment>
      {result && (
        <Typography color="textPrimary" variant="h4">
          Tu inversión generará{" "}
          <Typography color="primary" variant="h4" component="div">
            ${result}
          </Typography>{" "}
          pesos al finalizar el plazo fijo.
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
          value={dias}
          onChange={handleChangeNumber(setDias)}
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          helperText={errors.dias}
          error={Boolean(errors.dias)}
          variant="standard"
          fullWidth
          label="Días"
          slotProps={{
            input: {
              endAdornment: dias && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setDias("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <NumericFormat
          value={tasa}
          onChange={handleChangeNumber(setTasa)}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          valueIsNumericString
          helperText={errors.tasa}
          error={Boolean(errors.tasa)}
          variant="standard"
          fullWidth
          label="Tasa (%)"
          slotProps={{
            input: {
              endAdornment: tasa && (
                <InputAdornment position="end">
                  %
                  <IconButton size="small" onClick={() => setTasa("")}>
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

export default PlazoFijo;
