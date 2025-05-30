import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const verifyAnnounce = async (data: any, token?: string) => {
  const url = getRoute({ route: `${apiRoutes.admin.verifyAnnounce}` });
  return await client({
    url,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};
