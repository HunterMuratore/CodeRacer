import { Routes, Route } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { useEffect } from 'react'
import { useStore } from './store'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Footer from './components/Footer'

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
      <main className="flex flex-wrap items-center justify-center mx-auto">
        <button>
          <FontAwesomeIcon className="p-4" icon={faMagnifyingGlass} />
        </button>
        <button>
          <FontAwesomeIcon className="p-4" icon={faMagnifyingGlass} />
        </button>
        <button>
          <FontAwesomeIcon className="p-4" icon={faMagnifyingGlass} />
        </button>
        <button>
          <FontAwesomeIcon className="p-4" icon={faMagnifyingGlass} />
        </button>
        <button>
          <FontAwesomeIcon className="p-4" icon={faMagnifyingGlass} />
        </button>
      </main>

      <Footer />
    </>
  )
}

export default App
