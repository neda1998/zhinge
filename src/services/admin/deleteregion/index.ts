import Cookies from "js-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const deleteregion = async (id: string) => {
  const token = Cookies.get("accessToken"); 
  const url = getRoute({ route: `${apiRoutes.admin.deleteregion}/${id}` });
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
