import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const deleteVisit = async (id: number) => {
  const url = getRoute({ route: `${apiRoutes.admin.deleteVisit}` });
  return await client({
    url,
    method: "DELETE",
    data: { id },
    headers: {
      "Content-Type": "application/json",
    }    
  });
};
