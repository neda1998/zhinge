import { useQuery } from "react-query";
import { notconfirmedannouncements } from "../../../../services/admin/notconfirmedannouncements";

const UseNotconfirmedannouncementsQuery = () => {
  return useQuery("notconfirmedannouncements", notconfirmedannouncements, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching visits:", error);
    },
  });
};

export default UseNotconfirmedannouncementsQuery;

 