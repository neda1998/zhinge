import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const updateUser = async () => {
  const url = getRoute({ route: `${apiRoutes.user.updateUser}` });
  return await client({ url, method: "PUT",token: false });
};
    