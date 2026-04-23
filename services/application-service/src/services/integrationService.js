import axios from 'axios';

export const fetchJob = async (jobId) => {
  const { data } = await axios.get(`${process.env.JOB_SERVICE_URL}/${jobId}`);
  return data.job;
};

export const pushNotification = async (payload) => {
  await axios.post(process.env.NOTIFICATION_SERVICE_URL, payload);
};
