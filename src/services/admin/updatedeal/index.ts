import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../service";
import client from "../../utils/client";

export const updatedeal = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.admin.updateDeal}` });
  // آماده‌سازی بادی طبق مستندات و تبدیل به عدد
  const {
    id,
    Uid,
    seller,
    region,
    type,
    number,
    client: clientName,
    price,
    commission,
    date,
    note
  } = data;

  const body: any = {
    id: id ? Number(id) : undefined,
    Uid: Uid ? String(Uid) : undefined,
    seller,
    region,
    type,
    number,
    client: clientName,
    price: price !== undefined ? Number(price) : undefined,
    commission: commission !== undefined ? Number(commission) : undefined,
    date,
    note: note ? note : undefined
  };

  // حذف فیلدهای undefined
  Object.keys(body).forEach(key => body[key] === undefined && delete body[key]);

  return await client({
    url,
    method: "POST",
    data: body,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
