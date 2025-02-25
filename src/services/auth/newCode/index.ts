import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

export const newCode = async (data:any) => {
  const url = getRoute({ route: `${apiRoutes.auth.newcode}` });
  return await client({ url, method: "POST", data });
};