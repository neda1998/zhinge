import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const updateSlider = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.admin.updateSlider}` });
  return await client({
    url,
    method: "POST",
    data, 
  });
};
