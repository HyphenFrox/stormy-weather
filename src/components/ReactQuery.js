import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function ReactQuery(props) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default ReactQuery;
