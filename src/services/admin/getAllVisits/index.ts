import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllVisits = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllVisits}` });
  return await client({
    url,
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
};
