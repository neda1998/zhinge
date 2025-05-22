import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const useCreateAnnounce = () => {
  const createAnnounce = async (data: any) => {
    const url = getRoute({ route: `${apiRoutes.AllAnnounce.creatAnnounce}` });
    return await client({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: JSON.stringify(data)
    });
  };

  return createAnnounce;
};
