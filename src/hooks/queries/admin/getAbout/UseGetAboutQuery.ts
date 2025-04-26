import { useQuery } from "react-query";
import { getAbout } from "../../../../services/admin/getAbout";

const UseGetAboutQuery = () => {
    return useQuery("getAbout", getAbout);
};

export default UseGetAboutQuery;
