const API_URL = 'http://localhost:5000/api/jobs';

export const getAllJobs = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createJob = async (jobData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  return response.json();
};

export const updateJobStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
};
