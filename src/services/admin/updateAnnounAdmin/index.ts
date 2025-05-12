import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const updateAnnoun = async (data: any) => {
  const { Uid, ...rest } = data;
  const body = {
    Uid: Uid,
    ...rest,
  };

  console.log("📦 Sending body:", body);

  return await client({
    url: getRoute({ route: apiRoutes.admin.updateAnnoun }),
    method: "PUT",
    data: body,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
