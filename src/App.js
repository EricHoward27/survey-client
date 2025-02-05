import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// this is a comment
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TakeAsurvey from './components/TakeAsurvey/TakeAsurvey'
// import crud components
import SurveyResponse from './components/SurveyResponse/SurveyResponse'
// import crud components
import SurveyCreate from './components/routes/SurveyCreate'
import SurveyShow from './components/routes/SurveyShow'
import SurveyUpdate from './components/routes/SurveyUpdate'
import SurveyIndex from './components/routes/SurveyIndex'
// import team crud components
import TeamCreate from './components/TeamCreate/TeamCreate.js'
import TeamShow from './components/TeamShow/TeamShow.js'
import TeamUpdate from './components/TeamUpdate/TeamUpdate.js'
import TeamIndex from './components/TeamIndex/TeamIndex.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/take-survey' render={() => (
            <TakeAsurvey msgAlert={this.msgAlert}/>
          )} />
          <Route exact path='/response/:surveyID/:participantID' render={() => (
            <SurveyResponse msgAlert={this.msgAlert}/>
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          {/* create a survey */}
          <AuthenticatedRoute user={user} path='/create-survey' render={() => (
            <SurveyCreate msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Update the survey */}
          <AuthenticatedRoute user={user} exact path='/surveys/:id/edit' render={() => (
            <SurveyUpdate msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Show the survey */}
          <AuthenticatedRoute user={user} exact path='/surveys/:id' render={() => (
            <SurveyShow msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Show ALL surveys */}
          <AuthenticatedRoute user={user} exact path='/surveys' render={() => (
            <SurveyIndex msgAlert={this.msgAlert} user={user} />
          )} />
          {/* create a team */}
          <AuthenticatedRoute user={user} path='/create-team' render={() => (
            <TeamCreate msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Show a team */}
          <AuthenticatedRoute user={user} exact path='/teams/:id' render={() => (
            <TeamShow msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Update a team */}
          <AuthenticatedRoute user={user} exact path='/teams/:id/edit' render={() => (
            <TeamUpdate msgAlert={this.msgAlert} user={user} />
          )} />
          {/* Show ALL teams */}
          <AuthenticatedRoute user={user} exact path='/teams' render={() => (
            <TeamIndex msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
