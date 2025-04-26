import { useCookies } from "react-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAbout = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAbout}` });
  return await client({ url, method: "GET" });
};
