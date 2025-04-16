import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { adminUpdateUser } from "../../../services/admin/adminUpdateUser";

const UseAdminUpdateUserMutation = () => {
  return useMutation(
    async (data) => await adminUpdateUser(data),
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

export default UseAdminUpdateUserMutation;
