import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { aboutUpdating } from "../../../services/admin/aboutUpdating";

const UseAboutUpdatingMutation = () => {
  return useMutation<any, any, { id?: number; about?: string; goals?: string; logo?: any }>(
    async (data) => {
      return await aboutUpdating(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message,
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseAboutUpdatingMutation;
