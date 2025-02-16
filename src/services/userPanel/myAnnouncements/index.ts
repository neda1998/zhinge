import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const myAnnouncements = async () => {
  const url = getRoute({ route: `${apiRoutes.user.myAnnouncements}` });
  return await client({ url, method: "GET",token: false });
};
