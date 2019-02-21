import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { map } from 'lodash'
import styled from 'styled-components'

import Label from '../components/Label'
import Button from '../components/Button'
import TextArea from '../components/TextArea'

const MovieNightRoot = styled.div`
  padding: 20px;
`

const MovieItem = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: max-content max-content 1fr 1fr 0.5fr;
  grid-gap: 10px;
  border: 1px solid black;
  margin: 10px 0px;
`

const Input = styled.input`
  padding: 10px;
  height: 20px;
  font-size: 18px;

  :focus {
    outline: none !important;
    border: 1px solid grey;
  }
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

class MoviesList extends Component {
  state = {
    url: undefined,
    movies: {},
    title: undefined,
    currentIndex: undefined,
    movieSummary: undefined,
    votes: 0
  }

  update = () => {
    this.setState(prevState => ({ movies: [...prevState.movies, '1'] }))
  }

  onChangeInput = e => {
    this.setState({ url: e.target.value, currentIndex: this.props.movieIndex })
  }

  onChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  saveMovie = () => {
    const currentUrl = this.state.url
    const movieSummary = this.state.movieSummary
    this.setState(prevState => ({
      movies: {
        ...prevState.movies,
        [this.state.title]: [currentUrl, movieSummary]
      }
    }))
    this.setState({
      title: undefined,
      url: undefined,
      movieSummary: undefined
    })
  }

  onChangeMovieSummary = e => {
    this.setState({ movieSummary: e.target.value })
  }

  addVotes = () => {
    this.setState(prevState => ({
      votes: prevState.votes + 1
    }))
  }

  render() {
    return (
      <MovieNightRoot>
        {this.state.movies !== {} &&
          map(this.state.movies, (value, key) => (
            <MovieItem key={value}>
              <InputWrapper>
                <Label>Movie title</Label>
                <Input type="text" value={key} />
              </InputWrapper>
              <InputWrapper>
                <Label>Insert movie trailer</Label>
                <Input type="url" value={value[0]} />
              </InputWrapper>
              <ReactPlayer url={`${value[0]}`} />
              <InputWrapper>
                <Label>Movie summary</Label>
                <TextArea value={value[1]} />
              </InputWrapper>
              <Button onClick={this.addVotes}>
                Votes {`${this.state.votes}`}
              </Button>
            </MovieItem>
          ))}
        {this.props.movieIndex > Object.keys(this.state.movies).length && (
          <MovieItem>
            <InputWrapper>
              <Label>Movie title</Label>
              <Input
                key="title"
                type="text"
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Insert movie trailer</Label>
              <Input
                key="url"
                type="url"
                value={this.state.url}
                onChange={this.onChangeInput}
              />
            </InputWrapper>
            <ReactPlayer url={`${this.state.url}`} />
            <InputWrapper>
              <Label>Movie summary</Label>
              <TextArea
                value={this.state.movieSummary}
                onChange={this.onChangeMovieSummary}
              />
            </InputWrapper>
          </MovieItem>
        )}
        {this.props.movieIndex > Object.keys(this.state.movies).length && (
          <Button style={{ width: '100px' }} onClick={this.saveMovie}>
            Save
          </Button>
        )}
      </MovieNightRoot>
    )
  }
}

export default MoviesList
