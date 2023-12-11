import { Routes, Route } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { useEffect } from 'react'
import { useStore } from './store'

import Header from './components/Header'
import Footer from './components/Footer'
import Protect from './components/Protect'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Highscores from './pages/Highscores'
import NotFound from './pages/NotFound'

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

      <main>
      <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<Auth isLogin={true} />}></Route>
              <Route path='/register' element={<Auth isLogin={false} />}></Route>
              <Route path='/profile' element={<Protect user={userData}>
                <Profile userData={userData} />
              </Protect>}></Route>
              <Route path='/highscores' element={<Highscores />}></Route>

              <Route path='*' element={<NotFound />}></Route>
            </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
