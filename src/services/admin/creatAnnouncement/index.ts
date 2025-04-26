import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

// نوع ورودی بر اساس داکیومنت
export interface CreatAnnouncementBody {
  loan?: number;
  usage?: string;
  floor_number?: number;
  type?: string;
  userID?: string;
  features?: string;
  year_of_build?: number;
  price?: number;
  reject?: boolean;
  tour3dRequest?: boolean;
  id?: number;
  floor?: number;
  document_type?: string;
  address?: string;
  useful_metrage?: number;
  Unit_in_floor?: number;
  room_number?: number;
  photo?: string;
  check?: boolean;
  Uid?: string;
  full_name?: string;
  phone?: string;
  location?: string;
  region?: string;
  state_code?: string;
  tour3dlink?: string;
  land_metrage?: number;
}

export const creatAnnouncement = async (data: CreatAnnouncementBody, token: string) => {
  const url = getRoute({ route: `${apiRoutes.admin.creatAnnouncement}` });

  return await client({
    url,
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    }
  });
};

