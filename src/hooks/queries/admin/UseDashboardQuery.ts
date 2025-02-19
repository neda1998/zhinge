import { useQuery } from "react-query";
import { dashboard } from "../../../services/admin/dashboard";

const UseDashboardQuery = () => {
    return useQuery("dashboard", dashboard);
};

export default UseDashboardQuery;
