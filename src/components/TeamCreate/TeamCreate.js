import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { teamCreate } from '../../api/team.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

class TeamCreate extends Component {
  constructor (props) {
    super(props)

    // keyvalue pairs will be empty until they are filled in
    this.state = {
      team: {
        name: '',
        city: ''
      },
      teamId: null
    }
  }
  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { team } = this.state

    // create survey, pass it the survey data and the user for the token
    teamCreate(team, user)
    // set the createdId to the id of the survey that was just created
      .then(res => {
        this.setState({ teamId: res.data.team._id })
        // pass the response to the .then so we can show survey title
        // // console.log(res.data.survey)
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Team Succesfully',
        message: `Survey has been created successfully. The Team ${res.data.team.name}`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Team',
          message: 'Could not create team with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  // when an input changes, update the state that corresponds with input's name
  handleChange = event => {
    // using event.persist to ensure props are not set to null
    event.persist()

    this.setState(state => {
    // return the state change
      return {
      // set the survey state to what it used to be(..state.survey)
      // but replace the prop with `name` to its cureent `value`
      // name could be title or question
        team: { ...state.team, [event.target.name]: event.target.value }
      }
    })
  }
  render () {
    // destructure survey and createId state
    const { name, city, teamId } = this.state
    // if the survey been created, set its id
    if (teamId) {
      // redirect to the survey show page, (show page finish will add correct endpoint)
      return <Redirect to={`/teams/${teamId}`} />
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Create Team</h2>
        <Form.Group>
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={name}
            placeholder="Enter a Team Name"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            name="city"
            value={city}
            type="text"
            placeholder="Enter your city"
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
export default TeamCreate
