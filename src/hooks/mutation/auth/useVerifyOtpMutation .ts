import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {verifyOtp} from "../../../services/auth/varifyCode";

const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  return useMutation<void, any, { phone?: string; code?: number }>(async (data) => { await verifyOtp(data); }, {
    onSuccess: async function (data) {
      Swal.fire({
        title: "موفقیت",
        text: "کد تایید با موفقیت تایید شد!",
        icon: "success",
        confirmButtonText: "باشه",
      });
      navigate("/Login");  
    },
    onError: async (error: any) => {
      Swal.fire({
        title: "!خطا",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "باشه",
      });
    },
  });
};

export default useVerifyOtpMutation;
