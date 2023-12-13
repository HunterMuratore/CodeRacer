import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useStore } from '../store'

import { AUTHENTICATE } from '../utils/queries'
import { UPLOAD_PROFILE_PICTURE } from '../utils/mutations'

import Alert from './Alert'

function ProfileImageUpload({ onUpload, toggle }) {
    const { user } = useStore()
    const [selectedImage, setSelectedImage] = useState(null);
    const [alertMessage, setAlertMessage] = useState("")
    const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE, {
        refetchQueries: [ AUTHENTICATE ]
    });

    const showAlert = (message) => {
        setAlertMessage(message)
        setTimeout(() => {
            setAlertMessage("")
        }, 3000)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleUpload = async () => {
        try {
            if (!selectedImage) {
                showAlert('No Image Selected!')
                return;
            }

            const { data } = await uploadProfilePicture({
                variables: {
                    id: user._id,
                    profilePicture: selectedImage,
                },
            });

            toggle(false)
            
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <div className='upload my-4 flex flex-col mx-auto justify-center'>
            <h2 className='my-2'>Upload Profile Picture</h2>

            <div>{alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage("")} />}</div>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
            />
            {selectedImage && (
                <div className='flex flex-col'>
                    <h3 className='my-2'>Preview:</h3>
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Profile"
                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <button className="my-btn mt-2 mb-10" onClick={handleUpload}>Save Image</button>
                </div>
            )}
        </div>
    );
}

export default ProfileImageUpload;