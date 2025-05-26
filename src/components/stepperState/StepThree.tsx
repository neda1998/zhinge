import React, { useState } from "react";
import InputState from "../ui/atoms/input/inputState";
import Swal from "sweetalert2";

interface StepThreeProps {
    showSubmitButton?: boolean;
    creatAnnouncementMutation?: { isLoading?: boolean; mutate?: (data: any) => void, mutateAsync?: (data: any) => Promise<void> };
    full_name: string; setFullName: (v: string) => void;
    phone: string; setPhone: (v: string) => void;
    type?: string;
    usage?: string;
    region?: string;
    address?: string;
    location?: string;
    setLocation: (v: string) => void;
    price?: number;
    loan?: number;
    year_of_build?: number;
    room_number?: number;
    land_metrage?: number;
    floor_number?: number;
    floor?: string;
    onReset?: () => void; 
    description: string;
    setDescription: (v: string) => void;
    features: string;
    setFeatures: (v: string) => void;
}

const shouldHideFields = (type?: string) =>
    type === "مغازه" || type === "زمین مسکونی" || type === "زمین کشاورزی";

const StepThree = ({
    showSubmitButton,
    creatAnnouncementMutation,
    full_name, setFullName,
    phone, setPhone,
    type, usage, region, address, location, setLocation, price,
    loan, year_of_build, room_number, land_metrage, floor_number, floor,
    onReset,
    description,
    setDescription,
    features,
    setFeatures
}: StepThreeProps) => {
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const hideFields = shouldHideFields(type);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (
            !full_name.trim() ||
            !phone.trim()
        ) {
            Swal.fire({
                icon: "warning",
                title: "اخطار",
                text: "لطفا همه فیلدهای ضروری را پر کنید!",
                confirmButtonText: "باشه"
            });
            return;
        }

        if (!showSubmitButton) {
            Swal.fire({
                icon: "warning",
                title: "اخطار",
                text: "لطفا اطلاعات را ثبت کنید!",
                confirmButtonText: "باشه"
            });
            return;
        }
        if (creatAnnouncementMutation?.mutateAsync) {
            try {
                await creatAnnouncementMutation.mutateAsync({
                    type, usage, region, address, location, price,
                    loan, year_of_build, room_number, land_metrage, floor_number, floor,
                    full_name, phone, description,features
                });
                if (onReset) onReset();
            } catch {
            }
        } else if (creatAnnouncementMutation?.mutate) {
            creatAnnouncementMutation.mutate({
                type, usage, region, address, location, price,
                loan, year_of_build, room_number, land_metrage, floor_number, floor,
                full_name, phone, description, features
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4">
            <InputState
                label="نام مالک"
                value={full_name}
                onChange={e => setFullName(e.target.value)}
                placeholder="مثال: علی احمدی"
            />
            <InputState
                label="شماره تماس"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="09183456789"
                numeric
            />
            {showSubmitButton && (
                <div className="flex justify-end col-span-4">
                    <button
                        type="submit"
                        className="bg-main-color text-white px-8 py-2 rounded-full mt-4"
                        disabled={creatAnnouncementMutation?.isLoading}
                    >
                        {creatAnnouncementMutation?.isLoading ? "در حال ثبت..." : "ثبت آگهی"}
                    </button>
                </div>
            )}
        </form>
    );
};

export default StepThree;
