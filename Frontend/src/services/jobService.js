import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_URL 
  ? `${process.env.REACT_APP_URL}/jobs`
  : 'http://localhost:5000/api/jobs';

console.log('Job Service BASE_URL:', BASE_URL);

const getHeaders = () => {
  const token = Cookies.get('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getAllJobs = async () => {
  const response = await fetch(BASE_URL, {
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
};

export const createJob = async (jobData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(jobData),
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
};

export const updateJobStatus = async (id, status) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update job');
  return response.json();
};

export const deleteJob = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete job');
  return response.json();
};
