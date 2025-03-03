import { getRoute } from "../../service";
import client from "../../utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

export type RequestBody = {
  full_name?: string;
  phone?: string;
  region?: string;
  type?: string;
  lowest_price?: number;
  highest_price?: number;
  location?: string;
  message?: string;
};

export const createRequest = async (data: RequestBody) => {
  const url = getRoute({ route: `${apiRoutes.request.createRequest}` });
  return await client({ url, method: "POST", data });
};
