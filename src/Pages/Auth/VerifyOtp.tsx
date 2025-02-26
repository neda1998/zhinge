import { useState } from 'react';
import { useFormik } from 'formik';
import { verifyOtp } from '../../services/auth/varifyCode';
import useResendOtpMutation from '../../hooks/mutation/auth/useResendOtpMutation';

const VerifyOtp = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { mutate: resendOtp } = useResendOtpMutation();

  const formik = useFormik({
    initialValues: { phone: '', code: 0 },
    onSubmit: async (values) => {
      try {
        await verifyOtp(values);
        // ... handle success (e.g., navigate to dashboard) ...
        console.log("OTP verified successfully");
      } catch (error: any) {
        // Handle error: possibly wrong or expired code
        setErrorMsg(error.response?.data?.message || "خطا در تایید کد");
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* ... existing UI for phone and code inputs ... */}
        <label>شماره تلفن</label>
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />``
        <label>کد تایید</label>
        <input
          type="number"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
        />
        <button type="submit">تایید کد</button>
      </form>
      {errorMsg && (
        <div>
          <p>{errorMsg}</p>
          <button onClick={() => resendOtp({ phone: formik.values.phone })}>
            ارسال مجدد کد
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyOtp;
