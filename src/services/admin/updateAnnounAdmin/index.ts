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
  const rawBody = {
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

  // Clean body: remove undefined, null, and empty string values
  const body: any = {};
  (Object.keys(rawBody) as Array<keyof typeof rawBody>).forEach((key) => {
    const value = rawBody[key];
    // اگر مقدار رشته‌ای است و خالی است، ارسال نشود
    if (typeof value === "string" && value.trim() === "") return;
    // اگر مقدار undefined یا null است، ارسال نشود
    if (value === undefined || value === null) return;
    body[key] = value;
  });

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
