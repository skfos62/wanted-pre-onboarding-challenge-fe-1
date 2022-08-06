interface FetcherTypes {
  method: string
  url: string
  requset?: any
  authorization?: string
}

export const authFetcher = async (data: FetcherTypes) => {
  if (data.method !== 'get') {
    return await fetch(`http://localhost:8080/${data.url}`, {
      method: data.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data.requset)
    })
      .then(async (response) => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json')
        const data = isJson ? await response.json() : null
        if (!response.ok) return Promise.reject(data.details)
        return Promise.resolve(data)
      })
      .catch((error) => console.log(error))
  }
  if (data.method === 'get') {
    return await fetch(`http://localhost:8080/${data.url}`, {
      method: data.method,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json')
        const data = isJson ? await response.json() : null
        if (!response.ok) return Promise.reject(data.details)
        return Promise.resolve(data)
      })
      .catch((error) => console.log(error))
  }
}

export const todosFetcher = async (data: FetcherTypes) => {
  if (data.method !== 'get') {
    const result = await fetch(`http://localhost:8080/${data.url}`, {
      method: data.method,
      headers: new Headers({
        Authorization: `${data.authorization}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then(async (response) => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json')
        const data = isJson ? await response.json() : null
        if (!response.ok) return Promise.reject(data.details)
        return Promise.resolve(data)
      })
      .catch((error) => console.log(error))
  }
  if (data.method === 'get') {
    const result = await fetch(`http://localhost:8080/${data.url}`, {
      method: data.method,
      headers: new Headers({
        Authorization: `${data.authorization}`,
        'Content-Type': 'application/json'
      })
    })
      .then(async (response) => {
        const isJson = response.headers
          .get('content-type')
          ?.includes('application/json')
        const data = isJson ? await response.json() : null
        if (!response.ok) return Promise.reject(data.details)
        return Promise.resolve(data)
      })
      .catch((error) => console.log(error))
  }
}
