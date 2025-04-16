import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { initiateSetting } from "../../../services/admin/initiateSetting";

const UseInitiateSettingMutation = () => {
  return useMutation(
    async (data) => {
      return await initiateSetting(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data || "بازدید جدید با موفقیت ایجاد شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "خطا",
          text: error.response?.data || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseInitiateSettingMutation;
