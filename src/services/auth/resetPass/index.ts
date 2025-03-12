import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

export const resetPass = async (data: { phone: string; code: number; password: string }) => {
  const url = getRoute({ route: `${apiRoutes.auth.setnewpass}` });
  return await client({ url, method: "POST", data });
};
