import InputState from "../../../components/ui/atoms/input/inputState";
import Button from "../../../components/ui/atoms/Button";

interface StepThreeUserProps {
  full_name: string; setFullName: (v: string) => void;
  onSubmit: () => void;
  isAnnouncementSubmitted: boolean;
  type?: string;
}

const StepThreeUser = ({
  full_name, setFullName,
  onSubmit,
  type,
  isAnnouncementSubmitted
}: StepThreeUserProps) => {
  return (
    <form
      className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputState
        label="نام مالک"
        placeholder="مثال: علی احمدی"
        value={full_name}
        onChange={e => setFullName(e.target.value)}
      />
      <div className="col-span-4 flex justify-end mt-4">
        <Button
          submit="true"
          width="100px"
          height="45px"
          bgcolor="#09A380"
          borderradius="30px"
          color="white"
          type="submit"
          className="font-bold"
          disabled={isAnnouncementSubmitted}
        >
          ثبت
        </Button>
      </div>
    </form>
  );
};

export default StepThreeUser;