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
