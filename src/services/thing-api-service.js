import config from '../config'
import TokenService from '../services/token-service'

const apiCall = (url, method = "GET", body) => {

  const authorization = TokenService.hasAuthToken() ? `basic ${TokenService.getAuthToken()}` : undefined;
  const contentType = body ? 'application/json' : undefined;

  return fetch(url, { method, body: JSON.stringify(body), headers: { authorization, "Content-Type": contentType } })
    .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json())

}

const ThingApiService = {

  getThings() { return apiCall(`${config.API_ENDPOINT}/things`) },

  getThing: (thingId) => apiCall(`${config.API_ENDPOINT}/things/${thingId}`),

  getThingReviews: (thingId) => apiCall(`${config.API_ENDPOINT}/things/${thingId}/reviews`),

  postReview: (thing_id, text, rating) => apiCall(`${config.API_ENDPOINT}/reviews`, "POST", { thing_id , rating, text })

}

export default ThingApiService