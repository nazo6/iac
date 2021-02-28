import aspida from '@aspida/axios';
import { default as api } from './json/$api';

export const jsonApi = api(aspida());
