import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const deleteSlider = async (id: number) => {
  const url = getRoute({ route: `${apiRoutes.admin.deleteSlider}` });
  console.log("🔴 Sending DELETE request to:", url);
  console.log("🟠 With payload:", { id });
  return await client({
    url,
    method: "DELETE",
    data: { id },
    headers: {
      "Content-Type": "application/json",
    }    
  });
};
