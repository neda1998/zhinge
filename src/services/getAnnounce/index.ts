import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

export const getAnnounce = async () => {
  const url = getRoute({ route: `${apiRoutes.announce.getAnnounce}` });
  return await client({ url, method: "GET",token: false });
};
