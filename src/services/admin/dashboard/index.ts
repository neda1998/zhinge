import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const dashboard = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.dashboard}` });
  return await client({ url, method: "GET",token: false });
};
