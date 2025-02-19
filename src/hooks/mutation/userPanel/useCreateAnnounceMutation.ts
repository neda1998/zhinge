import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { createAnnounce, AnnouncePayload } from "../../../services/userPanel/createAnnounce";

const useCreateAnnounceMutation = () => {
  return useMutation(
    async (payload: AnnouncePayload) => await createAnnounce(payload),
    {
      onSuccess: async function () {
      },
      onError: async (error: any) => {
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
