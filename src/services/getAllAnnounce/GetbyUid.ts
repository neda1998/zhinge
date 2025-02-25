import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

// Send static payload to get announcement by Uid
export const getAnnouncementByUid = async (data:any) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.getByUid}` });
  return await client({
    url,
    method: "post",
    data: {
      loan: 2199,
      usage: "any",
      floor_number: 2,
      type: "any",
      userID: "09181711690",
      features: "any",
      year_of_build: 1998,
      price: 20000,
      reject: false,
      tour3dRequest: false,
      id: 1,
      floor: 1,
      document_type: "any",
      address: "any",
      useful_metrage: 150,
      Unit_in_floor: 1,
      room_number: 4,
      photo: {},
      check: false,
      Uid: "1731598770627",
      full_name: "any",
      phone: "user ID",
      location: "any",
      region: "any",
      state_code: "",
      tour3dlink: "",
      land_metrage: 200
    }
  });
};
