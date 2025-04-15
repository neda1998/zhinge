import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { updateVisit } from "../../../services/admin/updateVisits";

const UseUpdateVisitsutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: any) => {
      return await updateVisit(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "بازدید با موفقیت به‌روز شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
        queryClient.invalidateQueries("getAllVisits");
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

export default UseUpdateVisitsutation;
