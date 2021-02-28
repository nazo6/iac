/* eslint-disable */
import { AspidaClient } from 'aspida'
import { Methods as Methods0 } from './status'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://api.ibroadcast.com/s/JSON' : baseURL).replace(/\/$/, '')
  const PATH0 = '/status'
  const POST = 'POST'

  return {
    status: {
      post: (option: { body: Methods0['post']['reqBody'], headers: Methods0['post']['reqHeaders'], config?: T }) =>
        fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json(),
      $post: (option: { body: Methods0['post']['reqBody'], headers: Methods0['post']['reqHeaders'], config?: T }) =>
        fetch<Methods0['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
