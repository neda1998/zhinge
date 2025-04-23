import { useQuery } from "react-query";
import { inprogress } from "../../../../services/admin/inprogress";

const UseInprogressQuery = () => {
  return useQuery("inprogress", inprogress, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching visits:", error);
    },
  });
};

export default UseInprogressQuery;

 