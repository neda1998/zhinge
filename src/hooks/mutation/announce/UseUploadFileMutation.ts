import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { uploadFile } from "../../../services/uploadFile";

const UseUploadFileMutation = () => {
  return useMutation(
    async (data: { file: File; uid: string }) => {
      console.log(data, "data");
      return await uploadFile(data.file, data.uid);
    },
    {
      onError: async (error: any) => {
        Swal.fire({
          title: "خطا!",
          text: error.response?.data?.message || "خطایی در آپلود فایل رخ داده است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseUploadFileMutation;
