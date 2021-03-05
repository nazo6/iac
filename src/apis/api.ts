import aspida from '@aspida/axios';

import { default as jsonApis } from './api/$api';
import { default as artwork } from './artwork/$api';
import { default as library } from './library/$api';

export const api = jsonApis(aspida());
export const libraryApi = library(aspida());
export const artworkApi = artwork(aspida());
