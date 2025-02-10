import React, { useState } from 'react'
import RouteChevron from '../../../components/common/RouteChevron'
import ChooseItemsOfState from '../propertyManagement/ChooseItemsOfState'
import InitialLayout from '../../dashboard/initialLayoutAdmin'
import { pageFacilities } from '../../../utils/data'

const initialData = [
    { id: 1, label: "استخر", isChecked: false },
    { id: 2, label: "پرده", isChecked: false },
    { id: 3, label: "پکیج", isChecked: false },
    { id: 4, label: "کابینت MDF", isChecked: false },
    { id: 5, label: "کابینت نیم فلزی", isChecked: false },
    { id: 6, label: "کولر آبی", isChecked: false },
    { id: 7, label: "چیلر", isChecked: false },
    { id: 8, label: "توالت فرنگی", isChecked: false },
    { id: 9, label: "حیاط", isChecked: false },
    { id: 10, label: "گلخانه", isChecked: false },
    { id: 11, label: "پنجره PVC", isChecked: false },
    { id: 12, label: "کولر گازی", isChecked: false },
    { id: 13, label: "شوتینگ", isChecked: false },
    { id: 14, label: "لوستر", isChecked: false },
    { id: 15, label: "کف سرامیکی", isChecked: false },
    { id: 16, label: "کف پارکت", isChecked: false },
    { id: 17, label: "دوربین مدار بسته", isChecked: false },
    { id: 18, label: "درب ضد سرقت", isChecked: false },
    { id: 19, label: "درب ریموت دار", isChecked: false },
    { id: 20, label: "سقف کناف و نورپردازی", isChecked: false },
];

const Facilities = () => {
    const [checkboxes, setCheckboxes] = useState(initialData);

    const handleCheckboxChange = (id: number) => {
        setCheckboxes(prevCheckboxes =>
            prevCheckboxes.map(checkbox =>
                checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
            )
        );
    };
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageFacilities} />
            </div>
            <ChooseItemsOfState />
            <div className="flex flex-col justify-center">
                <span className="text-black text-xl text-center mb-14">انتخاب امکانات ملک</span>
                <div className='grid lg:grid-cols-6 grid-cols-2 gap-4 items-center'>
                    {checkboxes.map(checkbox => (
                        <div key={checkbox.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`checkbox-${checkbox.id}`}
                                checked={checkbox.isChecked}
                                onChange={() => handleCheckboxChange(checkbox.id)}
                                className="form-checkbox"
                            />
                            <label htmlFor={`checkbox-${checkbox.id}`} className='whitespace-nowrap'>{checkbox.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-main-color rounded-full flex justify-end ml-0 mr-auto mt-20 mb-10 text-white w-36 py-2 items-center">
                <button className='flex justify-center mx-auto'>ثبت امکانات</button>
            </div>
        </InitialLayout>
    )
}

export default Facilities