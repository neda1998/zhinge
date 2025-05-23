import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllregions = async () => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.getAllRegions}` });
  const response = await client({
    url,
    method: "GET",
  });
  return Array.isArray(response) ? response : [];
};
