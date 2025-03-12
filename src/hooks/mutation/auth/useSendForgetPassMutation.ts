import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { forgetPass } from "../../../services/auth/forgetPass";

const useSendForgetPassMutation = () => {
  const navigate = useNavigate();
  return useMutation<void, any, { phone?: string }>(
    async (data) => {
      return await forgetPass(data);
    },
    {
      onSuccess: async (_, variables) => {
        Swal.fire({
          title: "موفقیت",
          text: "کد تایید ارسال شد!",
          icon: "success",
          confirmButtonText: "باشه",
        });
        navigate("/reset-password", { state: { phone: variables.phone } });
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

export default useSendForgetPassMutation;
