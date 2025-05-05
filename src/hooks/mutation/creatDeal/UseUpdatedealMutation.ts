import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { updatedeal } from "../../../services/admin/updatedeal";

const UseUpdatedealMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data) => {
      return await updatedeal(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "ویرایش با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
        queryClient.invalidateQueries("getAllDeals");
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
