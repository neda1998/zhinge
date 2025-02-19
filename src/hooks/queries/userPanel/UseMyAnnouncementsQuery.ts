import { useQuery } from "react-query";
import { myAnnouncements } from "../../../services/userPanel/myAnnouncements";

const UseMyAnnouncementsQuery = () => {
    return useQuery("myAnnouncements", myAnnouncements);
};

export default UseMyAnnouncementsQuery;