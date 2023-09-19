import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./UserList.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

/**
 *
 * @param {object} props
 * @param {object} props.user
 */
function User({ user }) {
  const [editing, setEditing] = useState(false);
  if (!editing) {
    console.log(user.fullName);
  }
  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: (event) =>
      fetch(`/users/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...user,
          fullName: event.target.elements.fullName.value,
        }),
      }).then((res) => res.json()),
    onMutate: (event) => {
      const newUser = {
        ...user,
        fullName: event.target.elements.fullName.value,
      };
      queryClient.setQueryData(["users", "detail", newUser.id], newUser);
      queryClient.setQueriesData(["users", "list"], (previous) =>
        previous.map((user) => (user.id === newUser.id ? newUser : user))
      );
      // This flickers very briefly
      // setEditing(false)
      window.setTimeout(() => setEditing(false), 0);
    },
  });
  return editing ? (
    <form
      onSubmit={(event) => {
        // console.log("Submitting");
        event.preventDefault();
        event.stopPropagation();
        updateUser.mutate(event, {
          onSuccess: () => {
            // setEditing(false);
          },
        });
        // console.log("Submitting done");
      }}
    >
      <input type="text" name="fullName" defaultValue={user.fullName} />
    </form>
  ) : (
    <div
      key={user.id}
      style={{ lineHeight: 1.6 }}
      onClick={() => setEditing(true)}
    >
      {user.fullName}
    </div>
  );
}

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "list"],
    queryFn: () => fetch(document.baseURI + "users").then((res) => res.json()),
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
        <User user={user} key={user.id} />
      ))}
      <Link to="addUser">
        <button type="button">Add User</button>
      </Link>
    </>
  );
}

export default UserList;
