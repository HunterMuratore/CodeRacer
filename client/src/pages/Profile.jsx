import { useStore } from "../store"
import { useNavigate } from "react-router-dom"

function Profile() {
    const { user, setState } = useStore()
    const navigate = useNavigate()

    function toLogin() {
        navigate('/login')
    }

    return (
        <>
            {!user ? toLogin() : (
                <section className="profile mt-10">
                    <h1 className="font-bold mt-4 mb-4 text-center">{user.username}'s Highscores</h1>
                </section>
            )}
        </>
    )
}

export default Profile