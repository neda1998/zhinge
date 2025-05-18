import { useQuery } from 'react-query';
import { getAllAnnounce } from '../../../services/getAllAnnounce';

const UseGetAllAnnouncementQuery = () => {
  return useQuery('allAnnouncements', async () => {
    const res = await getAllAnnounce();
    return Array.isArray(res) ? res : [];
  });
};

export default UseGetAllAnnouncementQuery;