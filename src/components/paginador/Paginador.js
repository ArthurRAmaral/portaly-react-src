//From depedencies
import React from "react";

const Paginador = (qnt, mudarPagina) => {
  let vet = [];
  for (let i = 0; i < qnt; i++) {
    vet[i] = i + 1;
  }
  return (
    <div className="paginador" style={{ cursor: "pointer" }}>
      {vet.map((e) => (
        <div key={e} onClick={() => mudarPagina(e)}>
          <span>página {e}</span>
        </div>
      ))}
    </div>
  );
};

export default Paginador;
