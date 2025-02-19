import apiRoutes from "../../helpers/routes/apiRoutes";
import client from "../utils/client";
import { Property } from "../../types/property";

export const createProperty = async (property: Property): Promise<any> => {
  const url = apiRoutes.property.create;
  return await client({ url, method: "POST", data: property, token: false });
};
