import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const searchRegion = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.searchRegion}` });

  const response = await client({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data
  });

  if (Array.isArray(response?.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  return [];
};
