import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const inprogress = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.inprogress}` });
  return await client({
    url,
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
};
