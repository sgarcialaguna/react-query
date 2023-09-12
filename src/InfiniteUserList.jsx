import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import "./UserList.css";
import { useMemo } from "react";
import { produce } from "immer";

export default function UserList() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["users", "list", "infinite"],
      queryFn: ({ pageParam }) => {
        return fetch(pageParam || "infinite_users").then((res) => res.json());
      },
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const users = useMemo(() => {
    return data
      ? data.pages.reduce((prev, curr) => [...prev, ...curr.results], [])
      : null;
  }, [data]);

  const deleteFirstUser = useMutation({
    mutationFn: () =>
      fetch("/delete_first_user", {
        method: "DELETE",
      }),
    onMutate: () => {
      queryClient.setQueryData(["users", "list", "infinite"], (previous) => {
        return produce(previous, (draft) => {
          draft.pages[0].results = draft.pages[0].results.splice(1);
        });
      });
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(["users", "list"]);
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }
  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="user">
          {user.fullName}
        </div>
      ))}
      <button type="button" onClick={fetchNextPage} disabled={!hasNextPage}>
        Load More
      </button>
      <button
        type="button"
        onClick={() => deleteFirstUser.mutate()}
        disabled={data?.length === 0}
      >
        Delete First User
      </button>
    </>
  );
}
