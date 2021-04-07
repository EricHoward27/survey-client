import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter to use the match router prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { teamShow, teamDelete } from '../../api/team.js'

class TeamShow extends Component {
  constructor (props) {
    super(props)

    // data will be null until fetch from api
    this.state = {
      team: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props

    // make a request for a survey
    teamShow(match.params.id, user)
    // set the survey state to the data that return from api call
      .then(res => this.setState({ team: res.data.team }))
      .then(() => msgAlert({
        heading: 'Team Fetched Succesfully',
        message: 'Team is being viewed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Team Failed',
          message: 'Failed to show team with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  handleDelete = event => {
    // call for props
    const { user, msgAlert, match } = this.props
    // make a fetch request for deleted
    teamDelete(match.params.id, user)
    // set deleted var to true, and redirect to the homepage
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Team Succesfully',
        message: 'Team has been Deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Delete Team',
          message: 'Could not delete team with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    const { team, deleted } = this.state
    // const { user } = this.props
    // console.log('response data is: ', survey.responses)
    // if we don't have survey
    if (!team) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (deleted) {
      // redirect to the homepage
      return <Redirect to="/teams" />
    }
    // if (!user) {
    //   return (
    //     <div>
    //       <h3>Team:{team.name}</h3>
    //       <h4>City: {team.city}</h4>
    //     </div>
    //   )
    // }
    return (
      <div>
        <h3>Team:{team.name}</h3>
        <h4>City: {team.city}</h4>
        {(this.props.user._id === team.owner) ? (
          <div>
            <Button onClick={this.handleDelete}>Delete Team</Button>
            <Link to={`/teams/${team._id}/edit`}>
              <Button renderAs='button'>
            Edit Team
              </Button>
            </Link>
          </div>
        ) : ''}
      </div>
    )
  }
}
export default withRouter(TeamShow)
