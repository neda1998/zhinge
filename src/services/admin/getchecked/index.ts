import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getchecked = async () => {
  const url = getRoute({ route: `${apiRoutes.request.getchecked}` });
  return await client({
    url,
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
};
