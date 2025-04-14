import { useQuery } from "react-query";
import { getAllVisits } from "../../../../services/admin/getAllVisits";

const UseGetAllVisitsQuery = () => {
  return useQuery("getAllVisits", getAllVisits, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching visits:", error);
    },
  });
};

export default UseGetAllVisitsQuery;
