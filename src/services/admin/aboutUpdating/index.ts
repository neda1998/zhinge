import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const aboutUpdating = async (data: { id?: number; about?: string; goals?: string; logo?: any }) => {
  const url = getRoute({ route: `${apiRoutes.admin.aboutUpdating}` });
  return await client({
    url,
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
