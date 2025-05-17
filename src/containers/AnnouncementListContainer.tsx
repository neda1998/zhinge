import React from 'react';
import UseGetAllAnnouncementQuery from '../hooks/queries/getAnnounce/UseAnnounceQuery';
import AnnouncementList from './AnnouncementList';

interface AnnouncementListContainerProps {
  announcementType?: "rent" | "sell" | "all";
}

const AnnouncementListContainer: React.FC<AnnouncementListContainerProps> = ({ announcementType }) => {
  const { data, isLoading, error } = UseGetAllAnnouncementQuery();
  
  const allData = data || [];
  
  let filteredData = allData;
  if (announcementType === "rent") {
    filteredData = allData.filter((property: any) => property.type === "اجاره");
  } else if (announcementType === "sell") {
    filteredData = allData.filter((property: any) => property.type === "فروش");
  } else if (announcementType === "all" || !announcementType) {
    filteredData = allData;
  }

  return (
    <AnnouncementList
      data={filteredData}
      isLoading={isLoading}
      error={error}
      {...(announcementType === "rent"
        ? { announcementType: "rent" }
        : announcementType === "sell"
        ? { announcementType: "sell" }
        : {})}
    />
  );
};

export default AnnouncementListContainer;
