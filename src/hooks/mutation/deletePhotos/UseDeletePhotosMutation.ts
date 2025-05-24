import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import client from "../../../services/utils/client";

const deletePhoto = async ({ uid, image }: { uid: string; image: string }) => {
  return await client({
    url: "http://185.231.115.236:3000/api/V1/announce/deletePhoto",
    method: "POST",
    data: { Uid: uid, image },
  });
};

const UseDeletePhotosMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    deletePhoto,

    {
      onSettled: async () => {
        queryClient.invalidateQueries("getAllDeals");
      },
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "حذف با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه"
        });
      },
    }
  );
};

export default UseDeletePhotosMutation;
