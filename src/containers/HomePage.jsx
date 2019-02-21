import React, { Component } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fffdd0;
  opacity: 0.9;
  margin: 0;
`

class HomePage extends Component {
  render() {
    return <Root>home page</Root>
  }
}

export default HomePage
