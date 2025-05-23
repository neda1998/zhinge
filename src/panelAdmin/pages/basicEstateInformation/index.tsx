import { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import RouteChevron from "../../../components/common/RouteChevron";
import { pageBasicEstateInformation } from "../../../utils/data";
import { CgMathPlus } from "react-icons/cg";
import BasicEstateInformationModal from "./BasicEstateInformationModal";
import BasicEstateInformationTable from "./BasicEstateInformationTable";
import UseGetAllregionsQuery from "../../../hooks/queries/admin/getAllregions/UseGetAllregionsQuery";
import UsedeleteregionMutation from "../../../hooks/mutation/deleteregion/UsedeleteregionMutation";
import UseCreatregionMutation from "../../../hooks/mutation/creatregion/UseCreatregionMutation";
import { useQueryClient } from "react-query";

const BasicEstateInformation = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const { data, isLoading, refetch } = UseGetAllregionsQuery();
    const deleteRegionMutation = UsedeleteregionMutation();
    const createRegionMutation = UseCreatregionMutation();
    const queryClient = useQueryClient();

    const handleModalOpen = (id: number) => {
        setSelectedItem(id);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    const handleDeleteClick = (id: number) => {
        deleteRegionMutation.mutate(
            { id: String(id) },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("getAllregions");
                }
            }
        );
    };

    const handleCreateRegion = (regionName: string) => {
        createRegionMutation.mutate(
            { name: regionName },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("getAllregions");
                    handleModalClose();
                }
            }
        );
    };

    const regions = Array.isArray(data) ? data : [];

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-full lg:overflow-x-visible gap-7 flex-wrap  ">
                <div>
                    <span className="text-black font-extrabold lg:text-xl text-lg whitespace-nowrap">مدیریت منطقه ملک</span>
                </div>
                <RouteChevron items={pageBasicEstateInformation} />
            </div>
            <div className="flex items-center justify-end">
                <div className="flex flex-col items-center gap-3 mt-6">
                    <div
                        className={`rounded-xl p-3 bg-white transition-colors duration-300 cursor-pointer`}
                        onClick={() => handleModalOpen(0)}
                        style={{
                            boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                        }}
                    >
                        <div className={`rounded-full p-2 bg-main-color transition-colors duration-300`}>
                            {
                                modalOpen ? <CgMathPlus size={26} color="#fff" /> : <SlLocationPin size={26} color="#fff" />
                            }
                        </div>
                    </div>
                    <span className={`text-black transition-colors duration-300`}>
                        {modalOpen ? 'اضافه کردن' : 'اضافه کردن منطقه'}
                    </span>
                </div>
            </div>
            {isLoading ? (
                <div className="text-center my-10">در حال بارگذاری...</div>
            ) : regions.length > 0 ? (
                <BasicEstateInformationTable
                    data={regions.map((item) => ({
                        ردیف: item.id,
                        "عنوان منطقه": item.name
                    }))}
                    handleDeleteClick={handleDeleteClick}
                />
            ) : (
                <div className="text-center my-10">داده‌ای برای نمایش وجود ندارد.</div>
            )}
            {modalOpen && (
                <BasicEstateInformationModal
                    handleModalClose={handleModalClose}
                    onSubmit={handleCreateRegion} 
                    loading={createRegionMutation.isLoading}
                />
            )}
        </InitialLayout>
    );
};

export default BasicEstateInformation;
