import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const adminSearch = async (data: any ) => {
  const url = getRoute({ route: `${apiRoutes.admin.search}` });
  
  return await client({
    url,
    method: "POST",
    data
  });
};
