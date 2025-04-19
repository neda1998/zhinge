import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const uploadLogo = async (data: { files: File[] }) => {
  const url = getRoute({ route: `${apiRoutes.admin.uploadLogo}` });
  const formData = new FormData();
  data.files.forEach(file => formData.append("images", file));
  return await client({
    url,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
