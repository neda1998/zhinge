import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export interface AnnouncePayload {
  loan?: number;
  type?: string;
  region?: string;
  address?: string;
  location?: string;
  usage?: string;
  document_type?: string;
  land_metrage?: number;
  useful_metrage?: number;
  floor_number?: number;
  floor?: number;
  Unit_in_floor?: number;
  year_of_build?: number;
  full_name?: string;
  price?: number;
  room_number?: number;
  features?: string;
}

export const createAnnounce = async (payload: AnnouncePayload) => {
  const url = getRoute({ route: `${apiRoutes.user.creatAnnounce}` });
  return await client({ url, method: "POST", token: false, data: payload });
};
