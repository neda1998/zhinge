import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deleteSlider } from "../../../services/admin/deleteslider";

const UseDeleteSliderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({id}: {id: number}) => {
      return await deleteSlider(id);
    }
      ,

    {
      onSettled: async () => {
        queryClient.invalidateQueries("getAllSliders");
      },
      onSuccess: async (response) => {
        console.log("✅ حذف با موفقیت:", response);
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "حذف با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        console.error("❌ خطا در حذف:", error);
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

export default UseDeleteSliderMutation;
