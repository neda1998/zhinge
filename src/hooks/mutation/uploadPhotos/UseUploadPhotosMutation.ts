import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadPhotos } from "../../../services/admin/uploadPhotos";

const UseUploadPhotosMutation = () => {
  return useMutation(
    async (data: FormData) => {
      return await uploadPhotos(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "عکس جدید با موفقیت آپلود شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "خطا",
          text: error?.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseUploadPhotosMutation;
