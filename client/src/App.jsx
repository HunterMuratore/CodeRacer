import { Routes, Route } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { useEffect } from 'react'
import { useStore } from './store'

import Footer from './components/Footer'
import Header from './components/Header'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Highscores from './pages/Highscores'

export const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
      username
      profilePicture
    }
  }
`

function App() {
  const { data: userData } = useQuery(AUTHENTICATE);
  const { setState } = useStore()

  useEffect(() => {
    if (userData) {
      setState(oldState => ({
        ...oldState,
        user: userData.authenticate
      }))
    }
  }, [userData])

  return (
    <>
      <Header />

      <Footer />
    </>
  )
}

export default App
