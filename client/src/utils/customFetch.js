import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://port-0-testvercel-m26geil7668e23ca.sel4.cloudtype.app/api/v1',
});

export default customFetch;
