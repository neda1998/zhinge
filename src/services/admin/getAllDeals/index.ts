import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllDeals = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllDeals}` });
  return await client({ url, method: "GET" });
};
