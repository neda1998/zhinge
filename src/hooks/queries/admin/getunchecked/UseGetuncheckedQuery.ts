// UseGetuncheckedQuery.ts
import { useQuery } from "react-query";
import { getunchecked } from "../../../../services/admin/getunchecked";

const UseGetuncheckedQuery = () => {
  return useQuery("getunchecked", getunchecked, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching getunchecked:", error);
    },
  });
};

export default UseGetuncheckedQuery;
