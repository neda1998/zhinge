import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const deletePhotos = async (uid: string) => {
  const url = getRoute({ route: `${apiRoutes.admin.deletePhotos}` });
  return await client({
    url,
    method: "PUT", 
    data: { uid },
    headers: {
      "Content-Type": "application/json",
    }
  });
};
