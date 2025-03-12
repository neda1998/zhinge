import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

export const forgetPass = async (data:{phone?:string}) => {
  const url = getRoute({ route: `${apiRoutes.auth.forgetPass}` });
  return await client({ url, method: "POST", data });
};