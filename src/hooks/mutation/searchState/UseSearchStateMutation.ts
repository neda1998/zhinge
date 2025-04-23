import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { adminSearch } from "../../../services/admin/adminSearch";

const UseSearchStateMutation = () => {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  return useMutation(
    async (data: Record<string, any>) => {
      return await adminSearch(data, token); // ارسال توکن
    },
    {
      onSuccess: async (response) => {
        console.log("✅ جستجو موفقیت‌آمیز بود", response);
        Swal.fire({
          title: "موفقیت",
          text: "✅ جستجو انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseSearchStateMutation;
