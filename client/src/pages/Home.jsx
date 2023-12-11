import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function Home() {
    return (
        <section className="home flex flex-wrap items-center justify-center mx-auto">
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
        </section>
    )
}

export default Home