import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const searchRegion = async (data: any, token?: string) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.search_region}` });

  return await client({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    data
  });
};
