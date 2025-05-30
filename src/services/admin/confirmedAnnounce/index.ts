import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const confirmedAnnounce = async () => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.confirmedAnnounce}` });
  return await client({ url, method: "GET" });
};
