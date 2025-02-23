import { useQuery } from "react-query";
import { getAllAnnounce } from "../../../services/getAllAnnounce";

const UseGetAllAnnouncementQuery = () => {
    return useQuery("getAllAnnounce", getAllAnnounce);
};

export default UseGetAllAnnouncementQuery;