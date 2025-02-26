import apiRoutes from "../../helpers/routes/apiRoutes";
import { getRoute } from "../service";
import client from "../utils/client";

// دریافت داده‌ها با استفاده از پارامتر ورودی dynamicPayload
export const getAnnouncementByUid = async (dynamicPayload: { Uid: string }) => {
  const url = getRoute({ route: `${apiRoutes.AllAnnounce.getByUid}` });
  return await client({
    url,
    method: "post",
    data: {
      ...dynamicPayload 
    }
  });
};
