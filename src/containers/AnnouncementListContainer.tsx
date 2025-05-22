import React from 'react';
import AnnouncementList from './AnnouncementList';
import UseConfirmedAnnounceQuery from '../hooks/queries/admin/confirmedAnnounce/UseConfirmedAnnounceQuery';

interface AnnouncementListContainerProps {
  announcementType?: "rent" | "sell" | "all";
}

const AnnouncementListContainer: React.FC<AnnouncementListContainerProps> = ({ announcementType }) => {
  const { data, isLoading, error } = UseConfirmedAnnounceQuery();


  const allData = Array.isArray(data?.confirmed) ? data.confirmed : [];

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
