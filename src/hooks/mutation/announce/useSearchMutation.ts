import { useMutation } from "react-query";
import { search } from "../../../services/search";

const useSearchMutation = () => {
  return useMutation(
    async (data: any) => {
      return await search(data);
    },
  );
};

export default useSearchMutation;
