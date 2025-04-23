import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const notconfirmedannouncements = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.notconfirmedannouncements}` });
  return await client({
    url,
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
};
