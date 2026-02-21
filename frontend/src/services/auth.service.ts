import { api } from './api';

export const authService = {
  register: (payload: { email: string; password: string; workspaceId: string }) =>
    api.post('/auth/register', payload),
  login: (payload: { email: string; password: string; workspaceId: string }) =>
    api.post('/auth/login', payload),
};
