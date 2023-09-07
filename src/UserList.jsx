import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./UserList.css";

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "list"],
    queryFn: () => fetch("users").then((res) => res.json()),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }
  return (
    <>
      {data.map((user) => (
        <Link to={user.id} key={user.id}>
          {user.fullName}
        </Link>
      ))}
      <Link to="addUser">
        <button type="button">Add User</button>
      </Link>
    </>
  );
}

export default UserList;
