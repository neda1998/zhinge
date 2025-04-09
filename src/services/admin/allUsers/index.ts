import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const allUsers = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.allUsers}` });
  return await client({ url, method: "GET" });
};
