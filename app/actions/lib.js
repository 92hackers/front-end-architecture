//  to  generate actions.

import { CALL_API } from 'redux-api-middleware';


const REQUEST = 'REQUEST', SUCCESS = 'SUCCESS', FAILURE = 'FAILURE'

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {type: base})
}


export function createAction(type, payload = {}) {
  return {type, ...payload};
}


const apiVersion = API_VERSION;
const host = API_HOST;

const initialOptions = {
  headers: {},
  method: '',
  data: '',
}

export function apicall(route, types, options = initialOptions) {
  const token = localStorage.getItem("user_token")
  const {headers: paramHeaders, method: paramMethod, data: paramData} = options

  var config = {
    endpoint: host + apiVersion + route,
    method: paramMethod,
    types: [types.REQUEST, types.SUCCESS, types.FAILURE],
    headers: paramHeaders,
  }

  if (!!token) {
    config.headers = { ...config.headers, 'Authorization': token}       // save params' headers firstly, then add aditional headers.
  }

  if (!paramMethod && typeof paramData === "object" && paramData !== null && Object.keys(paramData).length > 0) {
    config.method = 'POST'
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    config = {...config, body: JSON.stringify(paramData)}
  } else {
    config.method = 'GET'
  }

  return {
    [CALL_API]: {...config}
  }
}
