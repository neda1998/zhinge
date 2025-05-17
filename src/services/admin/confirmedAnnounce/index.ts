import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const confirmedAnnounce = async () => {
  const url = getRoute({ route: `${apiRoutes.admin.confirmedAnnounce}` });
  console.log("CONFIRMED ANNOUNCE URL:", url); // اضافه کنید
  return await client({ url, method: "GET" });
};
