import Cookies from "js-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const uploadPhotos = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.admin.uploadPhotos}` });

  const token = Cookies.get('accessToken'); 

  return await client({
    url,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  });
};

