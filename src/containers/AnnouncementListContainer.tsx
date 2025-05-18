import React from 'react';
import UseGetAllAnnouncementQuery from '../hooks/queries/getAnnounce/UseAnnounceQuery';
import AnnouncementList from './AnnouncementList';

interface AnnouncementListContainerProps {
  announcementType?: "rent" | "sell" | "all";
}

const AnnouncementListContainer: React.FC<AnnouncementListContainerProps> = ({ announcementType }) => {
  const { data, isLoading, error } = UseGetAllAnnouncementQuery();

  const allData = Array.isArray(data) ? data : [];
  console.log("allData", allData);

  return (
    <AnnouncementList
      data={allData}
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
