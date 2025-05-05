import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const deletedeal = async (id: string) => {
  const url = getRoute({ route: `${apiRoutes.admin.deleteDeal}` });
  return await client({
    url,
    method: "DELETE",
    data: { id },
    headers: {
      "Content-Type": "application/json",
    }    
  });
};
