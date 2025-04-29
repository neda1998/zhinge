import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadPhotosAnnounc } from "../../../services/admin/uploadPhotosAnnounc";

const UseUploadPhotosAnnouncMutation = () => {
  return useMutation(
    async (formData: FormData) => {
      // formData should contain 'images' (files) and 'Uid'
      return await uploadPhotosAnnounc(formData);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "عکس جدید با موفقیت ایجاد شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseUploadPhotosAnnouncMutation;
