import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const uploadSliderPhotos = async (formData: FormData) => {
  const url = getRoute({ route: `${apiRoutes.admin.uploadSliderPhotos}` });
  return await client({
    url,
    method: "POST",
    data: formData // multipart/form-data: let the browser set the header automatically
  });
};
