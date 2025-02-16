import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { updateUser } from "../../../services/userPanel/updateUser";

const useUpdateUserMutatioin = () => {
  return useMutation(
    async () => await updateUser(),
    {
      onSuccess: async function () {
      },
      onError: async (error: any) => {
        if (error.response?.status === 409) {
          Swal.fire({
            title: "خطا",
            text: "این شماره موبایل قبلاً ثبت شده است. لطفاً وارد شوید یا شماره دیگری استفاده کنید.",
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

export default useUpdateUserMutatioin;
