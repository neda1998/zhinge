import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

export const login = async (data:any) => {
  const url = getRoute({ route: `${apiRoutes.auth.login}` });
  return await client({ url, method: "POST", data, withCredentials: true });
};