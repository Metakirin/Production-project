export function getQueryParams(params: Partial<Record<string, string>>) {
  const searchParams = new URLSearchParams(window.location.search)

  Object.entries(params).forEach(([name, vlaue]) => {
    if (vlaue !== undefined) {
      searchParams.set(name, vlaue)
    }
  })

  return `?${searchParams.toString()}`
}

/**
 * Function to add queary params to URL
 * @param params
 */
export function addQueryParams(params: Record<string, string>) {
  window.history.pushState(null, '', getQueryParams(params))
}
