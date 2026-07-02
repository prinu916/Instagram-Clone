import { getApiUrl, getImageUrl } from './api';

describe('deployment URL helpers', () => {
  const originalApi = process.env.REACT_APP_API_URL;
  const originalBackend = process.env.REACT_APP_BACKEND_URL;

  afterEach(() => {
    if (originalApi === undefined) {
      delete process.env.REACT_APP_API_URL;
    } else {
      process.env.REACT_APP_API_URL = originalApi;
    }

    if (originalBackend === undefined) {
      delete process.env.REACT_APP_BACKEND_URL;
    } else {
      process.env.REACT_APP_BACKEND_URL = originalBackend;
    }
  });

  it('builds API URLs from the deployment env var', () => {
    process.env.REACT_APP_API_URL = 'https://api.example.com';

    expect(getApiUrl('/api/v1/me')).toBe('https://api.example.com/api/v1/me');
  });

  it('builds image URLs from the backend env var', () => {
    process.env.REACT_APP_BACKEND_URL = 'https://backend.example.com';

    expect(getImageUrl('/uploads/post.jpg')).toBe('https://backend.example.com/uploads/post.jpg');
    expect(getImageUrl('https://cdn.example.com/post.jpg')).toBe('https://cdn.example.com/post.jpg');
  });
});
