import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

function attachAuthToken(config: any): any {
  // In a real app, read from httpOnly cookie is not possible on client; 
  // here we simulate by reading a secure token if set or rely on cookie being sent automatically.
  return config;
}

function handleApiError(error: AxiosError): Promise<never> {
  if (error.response) {
    const data = error.response.data as { message?: string; errors?: Record<string, string[]> } | undefined;
    const msg = data?.message || 'An unexpected error occurred';
    // In a real app, toast notifications or logging service would be triggered here.
    return Promise.reject(new Error(msg));
  }
  if (error.request) {
    return Promise.reject(new Error('Network error. Please check your connection.'));
  }
  return Promise.reject(new Error('Unexpected error'));
}

apiClient.interceptors.request.use(attachAuthToken);
apiClient.interceptors.response.use((response: AxiosResponse) => response, handleApiError);

export default apiClient;
