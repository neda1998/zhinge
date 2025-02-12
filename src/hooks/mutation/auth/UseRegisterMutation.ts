import { useMutation } from "react-query";
import { register } from "../../../services/auth/register";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation(async (data) => await register(data), {
    onSuccess: async function (data, formData) {
      // هدایت کاربر به صفحه OTP
      navigate("/Otp");
    },
    onError: async (error: any) => {
      // نمایش خطای سرور
      Swal.fire({
        title: "!خطا",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "باشه",
      });
    },
  });
};


export default useSignupMutation;
