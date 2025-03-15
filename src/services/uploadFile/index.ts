import client from "../utils/client";

export const uploadFile = async (file: File, uid: string) => {
  const url = "http://185.231.115.236:3000/api/V1/announce/uploadPhotos"; 
  const formData = new FormData();
  formData.append("images", file, file.name);
  formData.append("Uid", uid);
  return await client({
    url,
    method: "POST",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" }
  });
};
