import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getunchecked = async () => {
  const url = getRoute({ route: `${apiRoutes.request.getunchecked}` });
  return await client({
    url,
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
};
