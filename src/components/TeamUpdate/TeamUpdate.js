import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { teamUpdate, teamShow } from '../../api/team.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class TeamUpdate extends Component {
  constructor () {
    super()

    this.state = {
      team: null,
      updated: false
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

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { team } = this.state

    teamUpdate(match.params.id, team, user)
      .then(res => this.setState({ updated: true }))
      .then(() => {
        msgAlert({
          heading: 'Updated Team Successfully',
          variant: 'success',
          message: 'Team has been updated.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Team Failed',
          variant: 'danger',
          message: 'Team was not updated due to error: ' + err.message
        })
      })
  }

  handleChange = event => {
    this.setState({ team: { ...this.state.team, [event.target.name]: event.target.value } })
  }

  render () {
    const { team, updated } = this.state

    // if we don't have a survey yet
    if (!team) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    if (updated) {
      return <Redirect to={`/teams/${this.props.match.params.id}`} />
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Update Team</h2>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={team.name}
            placeholder="Enter a team name"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            name="city"
            value={team.city}
            type="text"
            placeholder="Enter New City"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
        >
        Submit</Button>
      </Form>
    )
  }
}

export default withRouter(TeamUpdate)
