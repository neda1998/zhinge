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
    Unit_in_floor?: number;
    useful_metrage?: number;
    document_type?: string;
    setDocumentType?: (v: string) => void;
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
    setFeatures,
    Unit_in_floor,
    useful_metrage,
    document_type,
    setDocumentType
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

        if (phone.trim().length !== 11) {
            Swal.fire({
                icon: 'warning',
                title: 'خطا',
                text: 'شماره همراه باید دقیقا ۱۱ رقم باشد.',
                confirmButtonText: 'باشه'
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
                    type: type || "-",
                    usage,
                    region,
                    address,
                    location: location || "-",
                    price,
                    loan: loan !== undefined && loan !== null ? loan : 0,
                    year_of_build,
                    room_number,
                    land_metrage,
                    floor_number,
                    floor: floor || "-",
                    full_name,
                    phone,
                    description,
                    features: features || "-",
                    Unit_in_floor: Unit_in_floor !== undefined && Unit_in_floor !== null ? Unit_in_floor : 0,
                    useful_metrage: useful_metrage !== undefined && useful_metrage !== null ? useful_metrage : 0,
                    document_type: document_type || "-"
                });
                if (onReset) onReset();
            } catch {
            }
        } else if (creatAnnouncementMutation?.mutate) {
            creatAnnouncementMutation.mutate({
                type: type || "-",
                usage,
                region,
                address,
                location: location || "-",
                price,
                loan: loan !== undefined && loan !== null ? loan : 0,
                year_of_build,
                room_number,
                land_metrage,
                floor_number,
                floor: floor || "-",
                full_name,
                phone,
                description,
                features: features || "-",
                Unit_in_floor: Unit_in_floor !== undefined && Unit_in_floor !== null ? Unit_in_floor : 0,
                useful_metrage: useful_metrage !== undefined && useful_metrage !== null ? useful_metrage : 0,
                document_type: document_type || "-"
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
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
