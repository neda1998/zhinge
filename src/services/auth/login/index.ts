import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";

export const login = async (data: any) => {
  try {
    const url = getRoute({ route: apiRoutes.auth.login });
    return await client({url,method: "POST", data});} 
    catch (error) {
    throw error;
  }
};
