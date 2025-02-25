import axios from 'axios';

export const getAnnouncementByUid = async (data: { Uid: string }) => {
  const response = await axios.post('/announce/getByUid', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
