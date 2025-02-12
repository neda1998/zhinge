import routes from "../../../helpers/routes/apiRoutes"
import { getRoute } from "../../service/index";
import client from "../../utils/client"

export const register = async (data: any) => {
  const url = getRoute({ route: `${routes.auth.register}` });
  
  // ارسال درخواست ثبت‌نام با `full_name`، `password` و `phone`
  return await client({ 
    url, 
    method: "POST", 
    data 
  });
};
