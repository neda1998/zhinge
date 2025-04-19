import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadsliderPhotos } from "../../../services/admin/uploadsliderPhotos";

const UseUploadsliderPhotosMutation = () => {
  return useMutation<any, any, { files: File[]; id: string }>(
    async (data: { files: File[]; id: string }) => {
      return await uploadsliderPhotos(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data || "بازدید جدید با موفقیت ایجاد شد",
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
