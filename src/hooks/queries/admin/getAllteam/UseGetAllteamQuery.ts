import { useQuery } from "react-query";
import { getAllTeam } from "../../../../services/admin/getAllteam";

const UseGetAllteamQuery = () => {
  return useQuery("getAllTeam", getAllTeam, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching sliders:", error);
    },
  });
};

export default UseGetAllteamQuery;
