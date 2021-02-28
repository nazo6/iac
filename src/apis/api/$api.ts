/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './API/create_album'
import { Methods as Methods1 } from './API/get_artwork'
import { Methods as Methods2 } from './API/update_album'
import { Methods as Methods3 } from './API/update_track'
import { Methods as Methods4 } from './JSON/status'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.ibroadcast.com/s/' : baseURL).replace(/\/$/, '')
  const PATH0 = '/API/create_album'
  const PATH1 = '/API/get_artwork'
  const PATH2 = '/API/update_album'
  const PATH3 = '/API/update_track'
  const PATH4 = '/JSON/status'
  const POST = 'POST'

  return {
    API: {
      create_album: {
        post: (option: { body: Methods0['post']['reqBody'], headers: Methods0['post']['reqHeaders'], config?: T }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods0['post']['reqBody'], headers: Methods0['post']['reqHeaders'], config?: T }) =>
          fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`
      },
      get_artwork: {
        post: (option: { body: Methods1['post']['reqBody'], headers: Methods1['post']['reqHeaders'], config?: T }) =>
          fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option: { body: Methods1['post']['reqBody'], headers: Methods1['post']['reqHeaders'], config?: T }) =>
          fetch<Methods1['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      },
      update_album: {
        post: (option: { body: Methods2['post']['reqBody'], headers: Methods2['post']['reqHeaders'], config?: T }) =>
          fetch<Methods2['post']['resBody']>(prefix, PATH2, POST, option).json(),
        $post: (option: { body: Methods2['post']['reqBody'], headers: Methods2['post']['reqHeaders'], config?: T }) =>
          fetch<Methods2['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`
      },
      update_track: {
        post: (option: { body: Methods3['post']['reqBody'], headers: Methods3['post']['reqHeaders'], config?: T }) =>
          fetch<Methods3['post']['resBody']>(prefix, PATH3, POST, option).json(),
        $post: (option: { body: Methods3['post']['reqBody'], headers: Methods3['post']['reqHeaders'], config?: T }) =>
          fetch<Methods3['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`
      }
    },
    JSON: {
      status: {
        post: (option: { body: Methods4['post']['reqBody'], headers: Methods4['post']['reqHeaders'], config?: T }) =>
          fetch<Methods4['post']['resBody']>(prefix, PATH4, POST, option).json(),
        $post: (option: { body: Methods4['post']['reqBody'], headers: Methods4['post']['reqHeaders'], config?: T }) =>
          fetch<Methods4['post']['resBody']>(prefix, PATH4, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH4}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
