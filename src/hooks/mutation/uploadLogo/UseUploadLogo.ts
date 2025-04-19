import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadLogo } from "../../../services/admin/uploadLogo";

const UseUploadLogo = () => {
  return useMutation(
    async (data: { files: File[] }) => {
      return await uploadLogo(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "لوگو با موفقیت آپلود شد",
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

export default UseUploadLogo;
