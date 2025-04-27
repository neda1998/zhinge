import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const uploadLogo = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.uploadLogo}` });
  return await client({
    url,
    method: "GET",
  });
};
