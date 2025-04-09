import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const creatDeal = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.admin.creatDeal}` });
  return await client({ url, method: "POST", data });
};
