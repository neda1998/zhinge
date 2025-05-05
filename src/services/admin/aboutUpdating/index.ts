import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

// خواندن توکن از کوکی به صورت دستی
function getAccessToken() {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("accessToken="))
    ?.split("=")[1];
}

export const aboutUpdating = async (data: any) => {
  const url = getRoute({ route: apiRoutes.admin.aboutUpdating });
  const accessToken = getAccessToken();

  return await client({
    url,
    method: "PUT",
    data,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    }
  });
};
