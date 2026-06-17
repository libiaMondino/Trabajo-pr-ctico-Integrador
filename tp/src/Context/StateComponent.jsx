import { useState } from "react";

function StateComponent() {
  const [contador, setContador] = useState(0);

  return (
    <>
      <h2>Productos agregados: {contador}</h2>

      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </>
  );
}

export default StateComponent;