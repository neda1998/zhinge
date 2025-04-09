import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatSlider } from "../../../services/admin/creatSlider";

const UsecreatDealMutation = () => {
  return useMutation(
    async (data) => {
      return await creatSlider(data);
    },
    {
      onSuccess: async (response) => {
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

export default UsecreatDealMutation;
