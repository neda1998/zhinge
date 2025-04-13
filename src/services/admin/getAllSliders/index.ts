import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllSliders = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllSliders}` });
  return await client({
    url,
    method: "GET",
  });
};
