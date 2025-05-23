import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { deleteregion } from "../../../services/admin/deleteregion";
import { useCookies } from "react-cookie";

const UsedeleteregionMutation = () => {
  const queryClient = useQueryClient();
  const [cookies,setCookies] = useCookies(["accessToken"]);
  return useMutation(
    async ({id}: {id: string}) => {
      // ابتدا همه داده‌ها را بگیر
      const regionsData: any = await queryClient.fetchQuery("getAllregions");
      // آیتم موردنظر را پیدا کن (در صورت نیاز می‌توان اینجا چک یا لاگ کرد)
      const itemToDelete = Array.isArray(regionsData)
        ? regionsData.find((item) => String(item.id) === String(id))
        : null;
      if (!itemToDelete) {
        throw new Error("آیتم موردنظر پیدا نشد");
      }
      // نمایش پیلود در کنسول
      console.log("Delete region payload:", { id });
      // سپس حذف را انجام بده
      return await deleteregion(id);
    },
    {
      onSettled: async () => {
        queryClient.invalidateQueries("getAllregions");
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
          text: error?.message || error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه"
        });
      },
    }
  );
};

export default UsedeleteregionMutation;
