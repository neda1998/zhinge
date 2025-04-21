import React, { useState } from 'react'
import Swal from 'sweetalert2';
import UseInitiateSettingMutation from '../../../hooks/mutation/initiateSetting/UseInitiateSettingMutation'

const GeneralSettings = () => {
  const [about, setAbout] = useState("");
  const [goals, setGoals] = useState("");
  const { mutate: initiateSettingMutate } = UseInitiateSettingMutation();

  const handleInitiateSetting = async () => {
    if (!about || !goals) {
      Swal.fire({
        title: "خطا",
        text: "لطفا مقدار درباره ما و اهداف را وارد کنید.",
        icon: "warning",
        confirmButtonText: "باشه"
      });
      return;
    }
    initiateSettingMutate();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 mx-auto rounded-xl وfull my-6">
      <span className="text-black font-bold mb-4">مقداردهی اولیه تنظیمات سایت</span>
      <textarea
        className="w-full mb-3 p-2 rounded border"
        placeholder="درباره ما"
        value={about}
        onChange={e => setAbout(e.target.value)}
      />
      <textarea
        className="w-full mb-3 p-2 rounded border"
        placeholder="اهداف"
        value={goals}
        onChange={e => setGoals(e.target.value)}
      />
      <button
        className="bg-main-color text-white rounded-full px-8 py-2"
        onClick={handleInitiateSetting}
      >
        آپدیت تنظیمات اولیه سایت
      </button>
    </div>
  )
}

export default GeneralSettings