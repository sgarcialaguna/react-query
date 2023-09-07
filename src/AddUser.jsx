import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./AddUser.css";
export default function AddUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addUser = useMutation({
    mutationFn: (newUser) =>
      fetch("/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then((res) => res.json()),
    onSuccess: (newUser) => {
      //   queryClient.setQueriesData(["users", "list"], (previous) => [
      //     ...previous,
      //     newUser,
      //   ]);
      navigate("/");
    },
  });
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      let object = {};
      new FormData(event.target).forEach((value, key) => (object[key] = value));
      addUser.mutate(object);
    },
    [addUser]
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        <label htmlFor="fullName"> Full Name</label>
        <input type="text" name="fullName" id="fullName" required />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" required />

        <label htmlFor="company">Company</label>
        <input type="text" name="company" id="company" required />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
