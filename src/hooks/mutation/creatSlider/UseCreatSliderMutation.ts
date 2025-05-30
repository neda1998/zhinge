import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatSlider } from "../../../services/admin/creatSlider";

const UseCreatSliderMutation = () => {
  return useMutation(
    async (data) => {
      return await creatSlider(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "اسلایدر با موفقیت ایجاد شد",
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

export default UseCreatSliderMutation;
