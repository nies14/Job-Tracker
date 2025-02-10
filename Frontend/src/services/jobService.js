const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllJobs = async () => {
  const url = new URL(BASE_URL);
  const response = await fetch(url.toString());
  return response.json();
};

export const createJob = async (jobData) => {
  const url = new URL(BASE_URL);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  return response.json();
};

export const updateJobStatus = async (id, status) => {
  const url = new URL(`${BASE_URL}/${id}`);
  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
};
