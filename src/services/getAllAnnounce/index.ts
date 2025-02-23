import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

export const getAllAnnounce = async () => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.getAllAnnounce}` });
  return await client({ url, method: "GET" });
};
