import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { verifyAnnounce } from "../../../services/admin/verifyAnnounce";

const UseVerifyAnnounceMutation = () => {
  return useMutation(
    async (data) => {
      return await verifyAnnounce(data);
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: "ملک مورد نظر تایید شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseVerifyAnnounceMutation;
