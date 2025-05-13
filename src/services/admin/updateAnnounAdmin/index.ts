import Cookies from "js-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const updateAnnoun = async (data: any) => {
  const token = Cookies.get("accessToken");
  if (!data?.Uid) {
    throw new Error("Uid الزامی است.");
  }

  // Map frontend fields to backend expected fields
  const body = {
    Uid: data.Uid,
    type: data.type,
    address: data.address,
    location: data.location,
    usage: data.usage,
    document_type: data.document_type,
    land_metrage: data.land_metrage,
    useful_metrage: data.useful_metrage,
    floor_number: data.floor_number,
    floor: data.floor,
    Unit_in_floor: data.Unit_in_floor,
    year_of_build: data.year_of_build,
    full_name: data.full_name, // ساختمان بهارستان
    price: data.price,
    room_number: data.room_number,
    features: data.features,
    phone: data.phone, // مقدار phone را از data.phone بگیرید
    state_code: data.state_code,
    // ...add more mappings if needed
  };

  return await client({
    url: getRoute({ route: apiRoutes.admin.updateAnnoun }),
    method: "PUT",
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
