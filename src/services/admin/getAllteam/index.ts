import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllTeam = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllTeam}` });
  return await client({
    url,
    method: "GET",
  });
};
