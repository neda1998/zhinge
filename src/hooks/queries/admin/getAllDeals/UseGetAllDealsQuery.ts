import { useQuery } from "react-query";
import { getAllDeals } from "../../../../services/admin/getAllDeals";

const UseGetAllDealsQuery = () => {
    return useQuery("getAllDeals", getAllDeals);
};

export default UseGetAllDealsQuery;
