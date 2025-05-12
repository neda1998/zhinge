import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { updateAnnoun } from "../../../services/admin/updateAnnounAdmin";

const UseUpdateAnnounMutation = () => {
  return useMutation(updateAnnoun, {
    onSuccess: () => {
      Swal.fire({
        title: "موفق",
        text: "ملک با موفقیت ویرایش شد.",
        icon: "success",
        confirmButtonText: "باشه",
      });
    },
    onError: (error: any) => {
      console.error("❌ Error details:", error?.response);

      if (error.response?.status === 409) {
        Swal.fire({
          title: "خطا",
          text: "این ملک قبلا تایید شده است.",
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
  });
};

export default UseUpdateAnnounMutation;
