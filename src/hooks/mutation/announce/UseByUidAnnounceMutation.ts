import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { getAnnouncementByUid } from "../../../services/getAllAnnounce/GetbyUid";

const UseByUidAnnounceMutation = () => {
  return useMutation<any, any, { Uid: string }>(
    async (data: { Uid: string }) => {
      return await getAnnouncementByUid(data);
    },
    {
      onSuccess: async (response) => {
        console.log("اطلاعات با موفقیت دریافت شد");
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

export default UseByUidAnnounceMutation;
