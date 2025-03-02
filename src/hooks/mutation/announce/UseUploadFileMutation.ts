import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadFile } from "../../../services/uploadFile";

const UseUploadFileMutation = () => {
  return useMutation(
    async (data: { file: File; uid: string }) => {
      return await uploadFile(data.file, data.uid);
    },
    {
      onSuccess: async (response) => {
        console.log("اطلاعات با موفقیت دریافت شد");
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseUploadFileMutation;
