import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./AddUser.css";
export default function EditUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: user } = useQuery({
    queryKey: ["users", "detail", id],
    queryFn: () => fetch(`/users/${id}`).then((res) => res.json()),
  });
  const updateUser = useMutation({
    mutationFn: (newUser) =>
      fetch(`/users/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...newUser }),
      }).then((res) => res.json()),
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users", "detail", newUser.id], newUser);
      queryClient.setQueriesData(["users", "list"], (previous) =>
        previous.map((user) => (user.id === newUser.id ? newUser : user))
      );
      navigate(`/${id}`);
    },
  });
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      let object = {};
      new FormData(event.target).forEach((value, key) => (object[key] = value));
      updateUser.mutate(object);
    },
    [updateUser]
  );
  if (!user) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <label htmlFor="fullName"> Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          required
          defaultValue={user.fullName}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          defaultValue={user.email}
        />

        <label htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          id="company"
          required
          defaultValue={user.company}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
