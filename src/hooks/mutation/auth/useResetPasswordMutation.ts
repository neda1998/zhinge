import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPass } from "../../../services/auth/resetPass";

const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation<void, any, { phone: string; code: number; password: string }>(
    async (data) => {
      return await resetPass(data);
    },
    {
      onSuccess: async () => {
        Swal.fire({
          title: "موفقیت",
          text: "رمز عبور با موفقیت تغییر کرد!",
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
    }
  );
};

export default useResetPasswordMutation;
