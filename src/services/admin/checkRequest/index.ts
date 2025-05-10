import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const checkRequest = async (id: number) => {
  const url = getRoute({ route: `${apiRoutes.request.getunchecked}/${id}` });
  return await client({
    url,
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  });
};
