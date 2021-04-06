import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { teamIndex } from '../../api/team.js'

class TeamIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      teams: null
    }
  }

  // after we render the SurveyIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props

    // make a request to get all of our surveys
    teamIndex(user)
      // set the surveys state, to the surveys we got back in the response's data
      .then(res => this.setState({ teams: res.data.team }))
      .then(() => msgAlert({
        heading: 'Loaded Teams Successfully',
        message: 'All teams retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Teams!',
          message: 'Could not load teams with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our surveys state
    const { teams } = this.state

    // if we haven't fetched any surveys yet from the API
    if (!teams) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const teamsJsx = teams.map(team => (
      <Link to={`/teams/${team._id}`} key={team._id}>
        <li>
          {team.name}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>Team</h3>
        <ul>
          {teamsJsx}
        </ul>
      </div>
    )
  }
}

export default TeamIndex
