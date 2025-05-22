import { useQuery } from "react-query";
import { getAllregions } from "../../../../services/admin/getAllRegions";

const UseGetAllregionsQuery = () => {
  return useQuery("getAllregions", getAllregions, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
    },
  });
};

export default UseGetAllregionsQuery;
