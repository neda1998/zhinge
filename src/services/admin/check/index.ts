import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const check = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.request.checkRequest}` });
  return await client({
    url,
    method: "PUT",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
