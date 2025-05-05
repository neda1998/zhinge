import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deletedeal } from "../../../services/admin/deletedeal";

const UseDeletedealMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({id}: {id: string}) => {
      return await deletedeal(id);
    }
      ,

    {
      onSettled: async () => {
        queryClient.invalidateQueries("getAllDeals");
      },
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "حذف با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه"
        });
      },
    }
  );
};

export default UseDeletedealMutation;
