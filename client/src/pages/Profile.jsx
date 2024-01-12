import { useStore } from "../store"
import { useQuery } from '@apollo/client';
import { AUTHENTICATE } from '../utils/queries';
import { useNavigate } from "react-router-dom"

function Profile() {
    const { user, setState } = useStore()
    const { loading, error, data } = useQuery(AUTHENTICATE);
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            // Update the global state with user data
            setState({ user: data.authenticate });
        }
    }, [data, setState])

    function toLogin() {
        navigate('/login')
    }

    return (
        <>
            {!user ? toLogin() : (
                <section className="profile mt-10">
                    <h1 className="font-bold mt-4 mb-4 text-center">{user.username}'s Highscores</h1>
                    <div className="highscores">
                        <ul>
                            {user.highscores.map((score, index) => (
                                <li key={index}>
                                    Score: {score.score}, Language ID: {score.languageId}
                                </li>
                            ))}
                        </ul>
                    </div>

                </section>
            )}
        </>
    )
}

export default Profile