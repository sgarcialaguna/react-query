import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  // const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", "list"],
    queryFn: () => fetch("books").then((res) => res.json()),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }
  return (
    <ul>
      {data.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}

export default App;
