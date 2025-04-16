import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const getAllRequests = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.getAllRequests}` });
  const response = await client({
    url,
    method: "GET",
  });
  // بازگرداندن users و number
  return {
    users: response?.data?.users || [],
    number: response?.data?.number || 0
  };
};
