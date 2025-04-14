import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { creatVisit } from "../../../services/admin/creatVisit";

const UseCreateVisitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (visitData: any) => {
      return await creatVisit(visitData);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data || "بازدید جدید با موفقیت ایجاد شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
        queryClient.invalidateQueries("getAllVisits");
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

export default UseCreateVisitMutation;
