import apiClient from '@/lib/apiClient';
import { UserStockSubscribeDto } from './user-types';


export const subscribeUserToStock = async (userData: UserStockSubscribeDto) => {
  const response = await apiClient.post('/users/subscribe', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const unsubscribeUserFromStock = async (userData: UserStockSubscribeDto) => {
  const response = await apiClient.post('/users/unsubscribe', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getUserSubscriptionStatus = async (userData: UserStockSubscribeDto) => {
  const response = await apiClient.post('/users/subscribe/status', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
