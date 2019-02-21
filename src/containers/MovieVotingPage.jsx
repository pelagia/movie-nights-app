import React, { Component } from 'react'
import styled from 'styled-components'
import MoviesList from './MoviesList'

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fffdd0;
  opacity: 0.9;
  margin: 0;
`

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  background: black;
  color: white;
  height: 45px;
  width: 150px;

  :hover {
    background: grey;
  }
`

const Paragraph = styled.p`
  font-size: 22px;
  border: 1px solid white;
  color: black;
`

const ParagraphWrapper = styled.div`
  padding: 20px;
  align-items: left;
  display: flex;
  flex-direction: column;
`

class VoteMovie extends Component {
  state = {
    movieIndex: 0,
    movies: []
  }

  addMovie = () => {
    this.setState(prevState => ({
      movieIndex: prevState.movieIndex + 1,
      movies: [...prevState.movies, { url: undefined }]
    }))
  }

  render() {
    console.log(this.props.match.path)
    return (
      <Root>
        <ParagraphWrapper>
          <Paragraph>
            We can vote on the following movies list the movie we prefer to
            watch at the comming Movie Night event meetup. You can add the movie
            choice you prefer by clicking the button Add movie.
          </Paragraph>
          <Button onClick={this.addMovie}>Add movie</Button>
        </ParagraphWrapper>
        <MoviesList
          movieIndex={this.state.movieIndex}
          movies={this.state.movies}
        />
      </Root>
    )
  }
}

export default VoteMovie
