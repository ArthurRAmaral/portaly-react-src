//From depedencies
import React from "react";

//From Material-ui
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

//From here
import "./style.css";

const Paginador = (qnt, mudarPagina) => {
  let vet = [];
  for (let i = 0; i < qnt; i++) {
    vet[i] = i + 1;
  }
  return (
    <div className="paginador" style={{ cursor: "pointer" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
        className="grid"
      >
        {vet.map((e) => (
          <div key={e} onClick={() => mudarPagina(e)}>
            <Typography variant="body1" className="text">
              Página <span className="pag">{e}</span>
            </Typography>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default Paginador;
