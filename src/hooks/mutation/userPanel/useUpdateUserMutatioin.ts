import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { updateUser } from "../../../services/userPanel/updateUser";

const useUpdateUserMutatioin = () => {
  return useMutation(
    async () => await updateUser(),
    {
      onSuccess: async function () {
        Swal.fire({
          title: "موفق",
          text: "تغییرات با موفقیت ثبت شد.",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    }
  );
};

export default useUpdateUserMutatioin;
