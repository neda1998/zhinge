import { useQuery } from 'react-query';
import { getAllAnnounce } from '../../../services/getAllAnnounce';

const UseGetAllAnnouncementQuery = () => {
  return useQuery('allAnnouncements', getAllAnnounce);
};

export default UseGetAllAnnouncementQuery;