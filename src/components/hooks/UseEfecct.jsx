import { useEffect, useState } from "react";

const UseEfecct = () => {
  const [count, setCount] = useState(0);
  // Actualiza el titulo de la pagina
  // el efecto secundario se ejecutara cada que vez count cambie
  useEffect(() => {
    document.title = `You clicked ${count} state`;
  }, [count]);

  // TODO : Array []
  const [data, setData] = useState(null);
  // TODO : Como la url de la api no cambia no es importante ejecutar el efecto secundario mas de una vez
  // TODO : Es util para sincronizar con entidadades externas, hacer cosas asincroas :
  // * endpoint,
  // * servicios,
  // * componentes,
  // * Observables
  // * cosas ajenas al componente
  // * Manejo de suscripciones como sockets y websockets
  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Parametros, 1.- La funcion a ejecutar, 2.- El array de dependencias
  // sin array es como si fuera un loop
  useEffect(() => {
    console.log("Codigo a ejecutar cuando el componente se monte");
  });

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const users = await fetchUsers();
  //     setUsers(users);
  //   };

  //   getUsers(); // run it, run it

  //   return () => {
  //     // this now gets called when the component unmounts
  //   };
  // }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> click me!</button>
      <div>{data ? `Data : ${data}` : "LOADING"}</div>
    </div>
  );
};

export default UseEfecct;
