import { useMutation } from "react-query";
import { login } from "../../../services/auth/login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import axios from "axios";

const useLoginMutation = () => {
    const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);
  const navigate = useNavigate();
  return useMutation(async (data) => await login(data), {
    onSuccess: async function (data) {
      const { accessToken, refreshToken } = data;

      setCookies("accessToken", accessToken, { path: "/" });
      setCookies("refreshToken", refreshToken, { path: "/" });
      
      axios.defaults.headers.common["Authorization"]=`Bearer ${accessToken}`;
      navigate("/");
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

export default useLoginMutation;
