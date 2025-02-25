import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { getByUidAnnounce } from "../../../services/getAllAnnounce/GetbyUid";

const UseByUidAnnounceMutation = () => {
  return useMutation(
    async () => {
      await getByUidAnnounce();
    },
    {
      onSuccess: async function () {
        Swal.fire({
          title: "موفقیت",
          text: "اطلاعات با موفقیت دریافت شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseByUidAnnounceMutation;
