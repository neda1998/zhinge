import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { adminSearch } from "../../../services/admin/adminSearch";

const UseSearchStateMutation = (options?: { onSuccess?: (response?: any) => void, onError?: (error?: any) => void }) => {
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  return useMutation(
    async (data: Record<string, any>) => {
      return await adminSearch(data, token);
    },
    {
      onSuccess: async (response) => {
        if (options?.onSuccess) {
          options.onSuccess(response);
        } else {
        }
      },
      onError: async (error: any) => {
        if (options?.onError) {
          options.onError(error);
        } else {
          Swal.fire({
            title: "!خطا",
            text: error?.response?.data?.message || "خطایی رخ داده است",
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
      },
    }
  );
};

export default UseSearchStateMutation;
