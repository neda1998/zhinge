import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { creatregion } from "../../../services/admin/creatregion";

const UseCreatregionMutation = () => {
  return useMutation<{ /* response type */ }, any, { name: string }>(
    async (data) => {
      return await creatregion(data);
    },
    {
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

export default UseCreatregionMutation;
