import { useState } from "react";
import { QueryClient } from "react-query";

const useConfigureQueryClient = (): QueryClient => {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: (count: number, error: any) => {
              if (error?.response?.status === 404 || count === 3) {
                return false;
              }
              return true;
            },
          },
        },
      })
  );
  return queryClient;
};

export default useConfigureQueryClient;
