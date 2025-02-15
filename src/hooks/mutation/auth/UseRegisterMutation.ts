import { useMutation } from "react-query";
import { register } from "../../../services/auth/register";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation<{ code: string }, any, { full_name: string; phone: string; password: string }>(
    async (data) => await register(data),
    {
      onSuccess: async function (data, formData) {
        // هدایت کاربر به صفحه OTP
        navigate("/Otp", { state: { phone: formData.phone, code: data.code } });
      },
      // نمایش خطای سرور
      onError: async (error: any) => {
        if (error.response?.status === 409) {
          Swal.fire({
            title: "خطا",
            text: "این شماره موبایل قبلاً ثبت شده است. لطفاً وارد شوید یا شماره دیگری استفاده کنید.",
            icon: "error",
            confirmButtonText: "باشه",
          });
        } else {
          Swal.fire({
            title: "!خطا",
            text: error.response?.data?.message || "خطایی رخ داده است.",
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
      },
    }
  );
};

export default useSignupMutation;
