import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { newcode } from "../../../services/auth/getGenerateCode";

const useSignupMutation = () => {
  const navigate = useNavigate();
  return useMutation(
    async ({ phone }: { phone: number |string }) => await newcode(phone),
    {
      onSuccess: async function (data) {
        navigate("/auth/newcode");
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

export default useSignupMutation;
