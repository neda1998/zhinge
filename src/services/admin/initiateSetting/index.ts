import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const initiateSetting = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.admin.initiateSetting}` });
  return await client({
    url,
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
