import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

export const uploadFile = async (file: File, uid: string) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.uploadFile}` });
  const formData = new FormData();
  // Include the filename so the file data is not empty
  formData.append("images", file, file.name);
  formData.append("Uid", uid);
  return await client({ url, method: "POST", data: formData });
};
