import { useQuery } from "react-query"; 
import { confirmedAnnounce } from "../../../../services/admin/confirmedAnnounce";

const UseConfirmedAnnounceQuery = () => {
    return useQuery("confirmedAnnounce", confirmedAnnounce);
};

export default UseConfirmedAnnounceQuery;
