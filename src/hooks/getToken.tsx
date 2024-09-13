// Function to generate tokens using the basic_authorization
export const getToken = async (): Promise<string | null> => {
  const authOptions = {
    method: 'POST',
    headers: {
      Authorization:
        'Basic YmZkYWJhMzcwZmM5NDE3MDg4NmMzYWNkMjQ0ZjEwOWY6MzcyZjVhZjdiNGQxNDZhMTg2Mzk2NDQ0ZTdkNjc2ZGM=',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }).toString(),
  };

  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions,
    );
    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      console.error(
        'Failed to retrieve token:',
        response.status,
        response.statusText,
      );
      return null;
    }
  } catch (error) {
    console.error('Error occurred while fetching token:', error);
    return null;
  }
};
