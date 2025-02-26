import React from 'react';
import AnnouncementList from '../components/AnnouncementList';
import UseGetAllAnnouncementQuery from '../hooks/queries/getAnnounce/UseAnnounceQuery';

interface AnnouncementListContainerProps {
  announcementType: "rent" | "sell";
}

const AnnouncementListContainer: React.FC<AnnouncementListContainerProps> = ({ announcementType }) => {
  const { data, isLoading, error } = UseGetAllAnnouncementQuery();
  
  const allData = data || [];
  console.log(data);
  
  
  const filteredData = allData.filter((property: any) =>
    announcementType === "rent" ? property.type === "اجاره" : property.type !== "اجاره"
  );

  return (
    <AnnouncementList
      data={filteredData}
      isLoading={isLoading}
      error={error}
      announcementType={announcementType}
    />
  );
};

export default AnnouncementListContainer;
