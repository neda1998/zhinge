import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllregions = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllRegions}` });
  const response = await client({
    url,
    method: "GET",
  });
  return {
    users: response?.users || [],
    number: response?.user?.number ?? response?.users?.length ?? 0
  };
};
