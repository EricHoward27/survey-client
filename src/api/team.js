import apiUrl from '../apiConfig'

import axios from 'axios'

export const teamCreate = (team, user) => {
  return axios({
    url: apiUrl + '/teams',
    method: 'POST',
    // Add an authorization header
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      team: {
        name: team.name,
        city: team.city
      }
    }
  })
}
export const teamShow = (id, user) => {
  return axios({
    url: apiUrl + '/teams/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
export const teamDelete = (id, user) => {
  return axios({
    url: apiUrl + '/teams/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
export const teamUpdate = (id, team, user) => {
  return axios({
    url: apiUrl + '/teams/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      team: {
        name: team.name,
        city: team.city
      }
    }
  })
}
export const teamIndex = (user) => {
  return axios({
    url: apiUrl + '/teams',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
