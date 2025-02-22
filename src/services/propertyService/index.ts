import apiRoutes from "../../helpers/routes/apiRoutes";
import client from "../utils/client";
// import { Property } from "../../types/property";

export const createProperty = async () => {
  const url = apiRoutes.property.create;
  return await client({ url, method: "POST", token: false });
};
