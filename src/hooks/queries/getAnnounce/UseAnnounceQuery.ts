import { useQuery } from "react-query";
import { getAnnounce } from "../../../services/getAnnounce";

const UseGetAnnouncementQuery = () => {
    return useQuery("getAnnounce", getAnnounce);
};

export default UseGetAnnouncementQuery;