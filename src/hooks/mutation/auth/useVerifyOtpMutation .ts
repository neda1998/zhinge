import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getRoute } from "../../../services/service";
import client from "../../../services/utils/client";
import apiRoutes from "../../../helpers/routes/apiRoutes";

// ارسال درخواست تأیید کد به بک‌اند
const verifyOtp = async (data: any) => {
  const url = getRoute({ route: `${apiRoutes.auth.verifyOtp}` });  // آدرس تأیید کد
  return await client({ 
    url, 
    method: "POST", 
    data 
  });
};

const useVerifyOtpMutation = () => {
  const navigate = useNavigate();
  return useMutation(async (data) => await verifyOtp(data), {
    onSuccess: async function (data) {
      Swal.fire({
        title: "موفقیت",
        text: "کد تایید با موفقیت تایید شد!",
        icon: "success",
        confirmButtonText: "باشه",
      });
      navigate("/dashboard");  // هدایت کاربر به صفحه اصلی
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
