import { useState } from "react"
import { useStore } from "../store"
import { useNavigate } from "react-router-dom"

import profilePic from '../assets/images/default_pfp.png'

import ProfileImageUpload from '../components/ProfileImageUpload'

function Profile() {
    const { user, setState } = useStore()
    const [showProfileImageUpload, setShowProfileImageUpload] = useState(false);
    const navigate = useNavigate()

    function toLogin() {
        navigate('/login')
    }

    const toggleProfileImageUpload = () => {
        setShowProfileImageUpload(!showProfileImageUpload);
    };

    const handleProfileImageUpload = async (selectedImage) => {
        try {
            await uploadProfilePicture({
                variables: {
                    id: user.id,
                    profilePicture: selectedImage,
                },
            });

            setShowProfileImageUpload(false);
        } catch (err) {
            console.error("Error uploading profile picture:", err);
        }
    };

    return (
        <>
            {!user ? toLogin() : (
                <section className="profile mt-10">
                    <div className="flex mx-auto">
                        {showProfileImageUpload && (
                            <ProfileImageUpload onUpload={handleProfileImageUpload} toggle={toggleProfileImageUpload} />
                        )}
                    </div>

                    <div className="profile-picture my-5">
                        {/* If user has no profile pic in db then set this */}
                        <img onClick={toggleProfileImageUpload} src={user.profilePicture ? user.profilePicture : profilePic} alt="Profile Picture" />
                    </div>

                    <h1 className="font-bold mt-4 mb-4 text-center">{user.username}'s Highscores</h1>


                </section>
            )}
        </>
    )
}

export default Profile