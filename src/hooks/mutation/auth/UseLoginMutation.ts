import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { login } from "../../../services/auth/login";  // توجه داشته باش که login درست تایپ شود
import axios from "axios";

const useLoginMutation = () => {
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);
  const navigate = useNavigate();

  return useMutation<
    any,  // نوع داده برگشتی از درخواست (مثلاً data)
    any,  // نوع خطا (ممکنه هر چیزی باشه)
    { phone: string; password: string },  // نوع داده‌ای که می‌فرستی
    void  // نوع پاسخ بعد از ارسال درخواست
  >(async (data) => await login(data), {
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;
      setCookies("accessToken", accessToken, { path: "/" });
      setCookies("refreshToken", refreshToken, { path: "/" });
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export default useLoginMutation;
