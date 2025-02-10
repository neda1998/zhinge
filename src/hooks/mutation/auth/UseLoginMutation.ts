import { useMutation } from "react-query";
import { login } from "../../../services/auth/login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import axios from "axios";

const useLoginMutation = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  return useMutation(async (data) => await login(data), {
    onSuccess: async function (data) {
      navigate("/");
      setCookies("token",data.token,{path:"/"});
      axios.defaults.headers.common["Authorization"]=`Bearer ${data.token}`;
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
