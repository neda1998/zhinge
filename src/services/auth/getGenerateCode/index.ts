import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const newcode = async (phone:number | string) => {
    const url = getRoute({ route: `${apiRoutes.auth.newcode}?mobile=${phone}` });
    return await client({ url, method: "POST" });
  };