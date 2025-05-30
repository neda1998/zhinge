import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadsliderPhotos } from "../../../services/admin/uploadsliderPhotos";

const UseUploadsliderPhotosMutation = () => {
  return useMutation<any, any, FormData>(
    async (formData: FormData) => {
      return await uploadsliderPhotos(formData);
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
          text: error.response?.data || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseUploadsliderPhotosMutation;
