import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function UserDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "detail", id],
    queryFn: () => fetch("users/" + id).then((res) => res.json()),
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }
  return (
    <>
      <p>Full Name: {data.fullName}</p>
      <p>Email: {data.email}</p>
      <p>Company: {data.company}</p>
      <Link to={`/${id}/edit`}>
        <button type="button">Edit</button>
      </Link>
    </>
  );
}
