import { useQuery } from "react-query";
import { getAllSliders } from "../../../../services/admin/getAllSliders";

const UseGetAllSliders = () => {
  return useQuery("getAllSliders", getAllSliders, {
    refetchOnWindowFocus: false,
    onError: (error: any) => {
      console.error("Error fetching sliders:", error);
    },
  });
};

export default UseGetAllSliders;
