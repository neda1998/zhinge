import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const uploadsliderPhotos = async (data: { files: File[], id: string }) => {
  const url = getRoute({ route: `${apiRoutes.admin.uploadSliderPhotos}` });
  const formData = new FormData();
  data.files.forEach(file => formData.append("images", file));
  formData.append("id", data.id);

  return await client({
    url,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
