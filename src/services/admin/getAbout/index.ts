import Cookies from "js-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAbout = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAbout}` });
  const token = Cookies.get("accessToken");
  return await client({
    url, method: "GET"
    ,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
