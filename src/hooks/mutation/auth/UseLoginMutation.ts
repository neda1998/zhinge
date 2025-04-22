import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { login } from "../../../services/auth/login";  
import axios from "axios";
import Swal from "sweetalert2";

const useLoginMutation = () => {
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken","name","phone","full_name"]);
  const navigate = useNavigate();

  return useMutation<
    any, 
    any, 
    { phone: string; password: string }, 
    void
  >(async (data) => await login(data), {
    onSuccess: async (data) => {
      const { AccessToken: accessToken, refreshToken } = data; 
      if (!accessToken || !refreshToken) {
        Swal.fire("خطا", "توکن دریافتی نامعتبر است", "error");
        return;
      }
      setCookies("accessToken", accessToken, { path: "/" });
      setCookies("refreshToken", refreshToken, { path: "/" });
      setCookies("name", data.name, { path: "/" });
      setCookies("phone", data.phone, { path: "/" });
      setCookies("full_name", data.name, { path: "/" });
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      navigate("/");
    },
    onError: (error) => {
      Swal.fire("خطا", error?.response?.data?.message || "خطایی رخ داده است", "error");
    },
  });
};

export default useLoginMutation;
