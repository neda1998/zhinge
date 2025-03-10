import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

export const search = async (data: any ) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.search}` });
  
  return await client({
    url,
    method: "POST",
    data
  });
};
