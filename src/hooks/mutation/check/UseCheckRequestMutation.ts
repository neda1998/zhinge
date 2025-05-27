import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { check } from "../../../services/admin/check";

const UseCheckRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { status: string }) => await check(data),
    {
      onSuccess: async (_: any, variables: { status: string }) => {
        queryClient.invalidateQueries("getunchecked");
        queryClient.invalidateQueries("inprogress");
        queryClient.invalidateQueries("getchecked");

        Swal.fire({
          icon: "success",
          title: "موفق",
          text: variables.status === "inprogress" 
            ? "درخواست به در حال بررسی منتقل شد." 
            : "درخواست با موفقیت تأیید نهایی شد.",
        });
      },
      onError: async (error: any) => {
        if (error.response?.status === 409) {
          Swal.fire({
            title: "خطا",
            text: "این شماره موبایل قبلاً ثبت شده است.",
            icon: "error",
            confirmButtonText: "باشه",
          });
        } else {
          Swal.fire({
            title: "!خطا",
            text: error.response?.data?.message || "خطایی رخ داده است.",
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
      },
    }
  );
};

export default UseCheckRequestMutation;
