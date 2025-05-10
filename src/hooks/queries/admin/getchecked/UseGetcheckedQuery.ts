import { useQuery } from "react-query";
import { getchecked } from "../../../../services/admin/getchecked";

const UseGetcheckedQuery = () => {
  return useQuery("getchecked", getchecked, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching getunchecked:", error);
    },
  });
};

export default UseGetcheckedQuery;
