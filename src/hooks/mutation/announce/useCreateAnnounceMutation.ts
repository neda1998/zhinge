import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { createAnnounce } from "../../../services/userPanel/createAnnounce";

const useCreateAnnounceMutation = () => {
  return useMutation(
    async (data) => {
      console.log("🔵 داده ارسالی:", data);
      return await createAnnounce(data);
    },
    {
      onSuccess: async function (response) {
        Swal.fire({
          title: "موفق",
          text: response?.data?.message || "آگهی با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        console.log("🔴 خطای درخواست:", error.response?.data);
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default useCreateAnnounceMutation;
