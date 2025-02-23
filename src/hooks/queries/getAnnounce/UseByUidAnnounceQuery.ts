import { useQuery } from "react-query";
import { getByUidAnnounce } from "../../../services/getAllAnnounce/GetbyUid";

const UseByUidAnnounceQuery = () => {
    return useQuery("getbyUid", getByUidAnnounce);
};

export default UseByUidAnnounceQuery;