import { IoCloseSharp } from "react-icons/io5"
import { useState } from "react"

interface Props {
    handleModalClose: () => void;
    onSubmit: (regionName: string) => void;
    loading?: boolean;
}

const BasicEstateInformationModal = ({ handleModalClose, onSubmit, loading }: Props) => {
    const [regionName, setRegionName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (regionName.trim()) {
            onSubmit(regionName.trim());
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between border-b border-dashed border-b-gray-300 mb-4 pb-4">
                    <h2 className="text-lg font-bold">اضافه کردن منطقه جدید</h2>
                    <IoCloseSharp color='#6b7280' size={25} className="hover-btn" onClick={handleModalClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full border rounded p-2 mb-4"
                        placeholder="نام منطقه را وارد کنید"
                        value={regionName}
                        onChange={e => setRegionName(e.target.value)}
                        disabled={loading}
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded"
                            onClick={handleModalClose}
                            disabled={loading}
                        >
                            انصراف
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-main-color text-white rounded"
                            disabled={loading || !regionName.trim()}
                        >
                            {loading ? "در حال ثبت..." : "ثبت"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BasicEstateInformationModal;
