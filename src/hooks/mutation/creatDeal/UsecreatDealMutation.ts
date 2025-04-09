import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatDeal } from "../../../services/admin/creatDeal";

const UsecreatDealMutation = () => {
  return useMutation(
    async (data) => {
      return await creatDeal(data);
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
