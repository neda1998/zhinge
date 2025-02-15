// services/auth/register.js
import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

export const register = async (data: { full_name: string; phone: string; password: string }) => {
  const url = getRoute({ route: `${apiRoutes.auth.register}` }); // مطمئن شوید که apiRoutes.auth.register به /register اشاره می‌کند
  return await client({ url, method: "POST", data });
};
