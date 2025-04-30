import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllRequests = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllRequests}` });
  const response = await client({
    url,
    method: "GET",
  });
  return {
    users: response?.users || [],
    number: response?.user?.number ?? response?.users?.length ?? 0
  };
};
