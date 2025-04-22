import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { createRequest, RequestBody } from "../../../services/auth/request";

const useCreateRequestMutation = () => {
  return useMutation(
    async (data: RequestBody) => {
      return await createRequest(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: "درخواست با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
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

export default useCreateRequestMutation;
