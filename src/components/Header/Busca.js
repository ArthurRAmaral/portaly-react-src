import React from "react";

const Busca = () => {
  return (
    <div className="row">
      <form>
        <div className="search-area">
          <input
            type="text"
            className="search-input"
            placeholder="Busque um produto"
          />
        </div>
      </form>
    </div>
  )
}

export default Busca;