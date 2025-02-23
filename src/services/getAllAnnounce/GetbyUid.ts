import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

export const getByUidAnnounce = async () => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.getByUid}` });
  return await client({ url, method: "GET" });
};
