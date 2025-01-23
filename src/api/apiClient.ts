import axios, { AxiosHeaders } from 'axios';
import { User } from '../types';
import { randomNumber } from '../utils';

const MOCK_STATUSES = ['', 'write', 'wait', 'test', 'offline']

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export async function updateUser(user: User) {
  await apiClient.patch(`/users/${user.id}`, {
    ...user
  });
};

export async function fetchUsers(offset: number, limit: number): Promise<{ result: User[], total: any }> {
  const response = await apiClient.get(`/users?_start=${offset}&_limit=${limit}`);
  const headers = response.headers

  if (headers instanceof AxiosHeaders) {
    const total = headers.get('x-total-count')?.toString() || "0"

    return {
      result: response.data.map((u: User) =>  {
        const randomStatus = MOCK_STATUSES[randomNumber(4)]
        const user = {
          ...u, 
          username: u.username + (
            randomNumber(2) > 1 
              ? " very looooong text for ellipsis" 
              : ""
          ), 
          status: randomStatus
        }

        return user
    }),
      total: parseInt(total)
    }
  }

  return {
    result: response.data.map((u: User) =>  {
      const randomStatus = MOCK_STATUSES[randomNumber(4)]
      const user = {...u, status: randomStatus}

      return user
  }),

    total: 0
  }
};