import { useQuery } from "react-query";
import { allUsers } from "../../../../services/admin/allUsers";

const UseallUsersQuery = () => {
    return useQuery("allUsers", allUsers);
};

export default UseallUsersQuery;
