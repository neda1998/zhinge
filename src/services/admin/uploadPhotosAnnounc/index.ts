import Cookies from "js-cookie";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const uploadPhotosAnnounc = async (formData: FormData) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.uploadFile}` });

  const token = Cookies.get('accessToken'); 

  return await client({
    url,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  });
};
