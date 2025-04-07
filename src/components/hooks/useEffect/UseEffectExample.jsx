import { useEffect, useState } from "react";

const UseEffectExample = () => {
  const [users, setUsers] = useState([]);

  const fetcher = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const resuslt = await response.json();
    if (response.ok) {
      setUsers(resuslt);
    } else {
      console.log("Error al obtener los datos");
    }
  };

  // Sole se ejecuta una vez
  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          Name : <p>{user.name}</p>
          Correo: <p>{user.email}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default UseEffectExample;
