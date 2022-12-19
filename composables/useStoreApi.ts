import { acceptHMRUpdate, defineStore, skipHydrate } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStoreApi = defineStore('api', () => {
  const logger = useLogger('store:api')
  const isServer = process.server
  logger.log(':start', isServer)

  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl
  logger.log(':baseURL', baseURL)

  const userId = useCookie('userId') as any
  // const guestToken = ''
  const accessToken = useStorage('accessToken', null) as any
  const accessTokenExpires = useStorage('accessTokensExpires', null) as any
  const refreshToken = useStorage('refreshToken', null) as any

  const interceptors = {
    async onRequest({ request, options }: any) {
      // Add baseURL
      options.baseURL = baseURL

      // Handle query
      options.query = options.query || {}
      // https://github.com/unjs/ufo
      if (options.query.filter)
        options.query.filter = JSON.stringify(options.query.filter)

      if (!isServer) {
        if (accessToken.value && request !== '/auth/refresh') {
          options.headers = {
            Authorization: `Bearer ${accessToken.value}`,
          }
        }
      }
    },
    // onRequestError({ request, options, error }) {
    //   logger.log(':onRequestError', request, option, error)
    // },
    onResponse({ request, response, options }: any) {
      logger.log(':onResponse')
      return response._data
    },
    onResponseError({ request, response, options }: any) {
      logger.log(':onResponseError', request, response, options)
      // Handle 401 error, the easy way
      if (response?.status === 401) {
        logger.log(':onResponseError 401')
        refreshTokens()
      }
    },
  } as any

  function ftch(url: string, options: any): any {
    return $fetch(url, {
      ...options,
      ...interceptors,
    })
  }

  function useFtch(url: string, options: any): any {
    return useFetch(url,
      {
        ...options,
        ...interceptors,
      })
  }

  function saveTokens(tokens: any) {
    logger.log(':saveTokens', tokens)
    accessToken.value = tokens?.accessToken || tokens?.access_token
    accessTokenExpires.value = Date.now() + tokens?.expires
    refreshToken.value = tokens?.refreshToken || tokens?.refresh_token
  }

  async function refreshTokens() {
    try {
      logger.log(':refreshTokens start')
      logger.log(':refreshTokens refreshing')
      const { data } = await ftch('/auth/refresh', {
        method: 'post',
        body: {
          refresh_token: refreshToken.value,
        },
      })
      logger.log(':refreshTokens data', data)
      saveTokens(data)
    }
    catch (e) {
      logger.log(':refreshTokens error', e)
      removeTokens()
    }
  }

  function removeTokens() {
    logger.log(':removeTokens')
    accessToken.value = null
    accessTokenExpires.value = null
    refreshToken.value = null
    userId.value = null
    if (!isServer) {
      logger.log(':removeTokens !isServer')
      localStorage.clear()
    }
  }

  function breakTokens(a = true, r = false) {
    logger.log(':breakTokens')
    if (a)
      accessToken.value = 'broken'

    if (r)
      refreshToken.value = 'broken'
  }

  return {
    baseURL,
    accessToken: skipHydrate(accessToken),
    accessTokenExpires: skipHydrate(accessTokenExpires),
    refreshToken: skipHydrate(refreshToken),

    saveTokens,
    refreshTokens,
    removeTokens,
    breakTokens,

    ftch,
    useFtch,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStoreApi, import.meta.hot))
