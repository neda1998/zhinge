import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";


export const verifyOtp = async (data: { phone?: string; code?: number }) => {
  const url = getRoute({ route: `${apiRoutes.auth.varify}` });
  return await client({ url, method: "POST", data });
};