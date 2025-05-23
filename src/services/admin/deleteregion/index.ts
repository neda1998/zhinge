import Cookies from "js-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const deleteregion = async (id: number) => {
  const token = Cookies.get("accessToken"); 
  const url = getRoute({ route: `${apiRoutes.admin.deleteregion}` });
  return await client({
    url,
    method: "DELETE",
    data: { id },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }    
  });
};
