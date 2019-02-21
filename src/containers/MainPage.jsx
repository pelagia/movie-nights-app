import React, { Component } from 'react'
import styled from 'styled-components'
import { withFirebase } from '../components/Firebase'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'

import MovieVotingPage from './MovieVotingPage'
import SignUpPage from './SignUpPage'
import SignInPage from './SignInPage'
import AboutPage from './AboutPage'
import HomePage from './HomePage'
import movie from '../assets/movie.svg'
import Header from '../components/Header'
import SignOutButton from './SignOutpPage'

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fffdd0;
  opacity: 0.9;
  margin: 0;
`

const RouterLinks = styled.div`
  display: flex;
  flex-direction: row;
  color: black;
  outline: none;
  font-size: 22px;
  text-decoration: none;
  background: #b22222;
`

const LinkPage = styled(NavLink)`
  text-decoration: none;
  color: black;
  padding: 10px;

  :hover {
    color: grey;
  }
`
const NavigationAuth = () => (
  <ul>
    <li>
      <Link to="/">Landing</Link>
    </li>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/">Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to="/">Landing</Link>
    </li>
    <li>
      <Link to="/sign_in">Sign In</Link>
    </li>
  </ul>
)

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
)

class MainPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
    })
  }

  setSelectedTab = path => {
    console.log('path', path)
  }

  render() {
    return (
      <Router>
        <Root>
          <Header>
            <h1>Movie Nights Eindhoven</h1>
            <img alt="" src={movie} width="42" height="42" />
          </Header>
          <div>
            <div>
              <Navigation authUser={this.state.authUser} />
            </div>
            <RouterLinks>
              <LinkPage
                activeStyle={{
                  fontWeight: 'bold'
                }}
                exact
                to="/"
              >
                Home
              </LinkPage>
              <LinkPage
                activeStyle={{
                  fontWeight: 'bold'
                }}
                to="/about"
              >
                About
              </LinkPage>
              <LinkPage
                activeStyle={{
                  fontWeight: 'bold'
                }}
                to="/movie_selection"
              >
                Movie Selection
              </LinkPage>
              <LinkPage
                activeStyle={{
                  fontWeight: 'bold'
                }}
                to="/sign_out"
              >
                Sign Out
              </LinkPage>
            </RouterLinks>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/movie_selection" component={MovieVotingPage} />
            <Route exact path="/sign_up" component={SignUpPage} />
            <Route exact path="/sign_in" component={SignInPage} />
            {this.props.children}
          </div>
        </Root>
      </Router>
    )
  }
}

export default withFirebase(MainPage)
