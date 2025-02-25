import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { newCode } from "../../../services/auth/newCode";

const useResendOtpMutation = () => {
  return useMutation(
    async (data: { phone?: string }) => {
      return await newCode(data);
    },
    {
      onSuccess: async () => {
        Swal.fire({
          title: "ارسال مجدد کد",
          text: "کد تایید جدید با موفقیت ارسال شد.",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی در ارسال کد جدید رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default useResendOtpMutation;
