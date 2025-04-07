/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// *** Fetching y abortoar peticion
// TODO : con el abort es algo complejo pero puede ser muy util
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortcontroller = new AbortController();
    setController(abortcontroller);
    setLoading(true, { signal: abortcontroller.signal });
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => {
        if (e.name === "AbortError") {
          console.log("Request cancelled");
        }
        SetError(e);
      })
      .finally(() => setLoading(false));

    // Funcion de limpieza
    return () => abortcontroller.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      SetError("Request Cancelled");
    }
  };
  // * es mas facil desuctrurar un objeto que un array
  return { data, loading, error, handleCancelRequest };
}

// RENDER AS YOU FETCH : Que se renderice solo cuando haya fetching de datos
