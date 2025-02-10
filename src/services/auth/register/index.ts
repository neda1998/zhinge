
import { getRoute } from "../../service/index.js";
import routes from "../../../helpers/routes/apiRoutes.js"
import client from "../../utils/client.js"

export const register = async (data:any) => {
  const url = getRoute({ route: `${routes.auth.register}` });//url
  return await client({ url, method: "POST", data});//request to backend
};