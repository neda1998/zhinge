import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { updatedeal } from "../../../services/admin/updatedeal";

const UseUpdatedealMutation = () => {
  return useMutation(
    async (data) => {
      return await updatedeal(data);
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

export default UseUpdatedealMutation;
