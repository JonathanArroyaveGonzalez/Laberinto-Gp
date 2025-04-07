import { useFetch } from "./useFetch";

const Fetching = () => {
  // En este ejercicio creamos un custom hook , por nomeclatura sera useFetch

  const { data, loading, error, handleCancelRequest } = useFetch(
    `https://jsonplaceholder.typicode.com/users`
    //`jsonplaceholder.typicode.com/this-url-does-not-exist`
  );
  return (
    <div>
      <button onClick={handleCancelRequest}>Cancelar solicitud</button>
      <h2>Fetching de datos</h2>
      <ul>
        {loading && <li>Loading ...</li>}
        {error && <p>Error al traer los datos, util toast</p>}
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fetching;
