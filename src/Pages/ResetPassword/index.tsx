import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Input from '../../components/ui/atoms/input';
import Button from '../../components/ui/atoms/Button';
import useResetPasswordMutation from "../../hooks/mutation/auth/useResetPasswordMutation";

const ResetPassword = () => {
  const { state } = useLocation();
  const phone = state?.phone || "";
  const { mutate: resetPass } = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: { code: "", password: "" },
    onSubmit: (values) => {
      resetPass({
        phone,
        code: parseInt(values.code, 10),
        password: values.password,
      });
    },
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex flex-col items-center gap-4">
        <h2>تغییر رمز عبور</h2>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            base={'true'}
            width={'90%'}
            placeholder="کد تایید"
            height={'65px'}
            borderradius={'100px'}
            bgcolor={'#D9D9D926'}
            name="code"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.code}
          />
          <Input
            base={'true'}
            width={'90%'}
            placeholder="رمز عبور جدید"
            height={'65px'}
            borderradius={'100px'}
            bgcolor={'#D9D9D926'}
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button
            type="submit"
            bgcolor={'#09A380'}
            width={'90%'}
            borderradius={'100px'}
            color={'white'}
            height={'65px'}
          >
            <span className="font-bold">تغییر رمز عبور</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;