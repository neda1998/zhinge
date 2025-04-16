import { useQuery } from "react-query";
import { getAllRequests } from "../../../../services/admin/getAllRequests";

const UseGetAllRequests = () => {
  return useQuery("getAllRequests", getAllRequests, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching requests:", error);
    },
  });
};

export default UseGetAllRequests;
