import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: 'Bearer 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',
    'Content-Type': 'application/json',
  },
});

export default apiService;
