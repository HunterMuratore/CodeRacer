const User = require('../../models/User');
const Language = require('../../models/Language');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const { createToken } = require('../../auth');

// Define resolvers for user-related queries and mutations
const user_resolvers = {
    Query: {
        // Resolver to authenticate and return the current user
        authenticate(_, __, context) {
            return context.user;
        },

        // Resolver to get user information by user ID
        async getUserById(_, { userId }) {
            try {
                const user = User.findById(userId);
                return user;

            } catch (err) {
                throw new Error('User not found');
            }
        }
    },

    Mutation: {
        // Resolver to register a new user
        async register(_, args, context) {
            try {
                const user = await User.create(args);

                // Create and set authentication token in the cookie
                const token = await createToken(user._id);
                context.res.cookie('token', token, {
                    maxAge: 120 * 60 * 1000, // Set the token's expiration time
                    httpOnly: true
                });

                return user;

            } catch (err) {
                let message;

                // Handle duplicate key error (email already in use)
                if (err.code === 11000) {
                    message = 'That email address is already in use';
                } else {
                    message = err.message;
                }

                throw new Error(message);
            }
        },

        // Resolver to handle user login
        async login(_, args, context) {
            const { identifier, password } = args;

            try {
                // Find the user by email or username
                const user = await User.findOne({
                    $or: [{ email: identifier }, { username: identifier }],
                });

                if (!user) throw new Error('User not found');

                // Validate the provided password
                const pass_is_valid = await user.validatePass(password);

                if (!pass_is_valid) throw new Error('Password invalid');

                // Create and set authentication token in the cookie
                const token = await createToken(user._id);
                context.res.cookie('token', token, {
                    maxAge: 120 * 60 * 1000,
                    httpOnly: true,
                    secure: process.env.PORT ? true : false
                });

                return user;

            } catch (err) {
                throw new Error(err);
            }
        },

        // Resolver to handle user logout
        logout(_, __, context) {
            // Clear the authentication token from the cookie
            context.res.clearCookie('token');

            return 'User logged out successfully';
        },

        // Resolver to upload a user's profile picture
        async uploadProfilePicture(_, args, { user }) {
            const { profilePicture } = args;

            const { file: { createReadStream, filename } } = await profilePicture;

            // Create a readable stream from the uploaded file
            const readStream = createReadStream();

            // Specify the path where the file should be stored within the public directory
            const hash = v4();
            const name = `${hash}.${filename}`;
            const filePath = path.join(__dirname, '../../public/profile_images', name);

            // Create a writable stream to the specified file path
            const writeStream = fs.createWriteStream(filePath);

            // Pipe the data from the readable stream to the writable stream
            readStream.pipe(writeStream);

            // Update the user's profile picture path in the database
            await User.findOneAndUpdate({ _id: user._id }, {
                profilePicture: `/profile_images/${name}`
            });

            // Return the file path where the image is stored
            return filePath;
        },

        async updateHighScore(_, { score, languageName }, { user }) {
            try {
                if (!user) {
                    throw new Error('User not authenticated');
                }
        
                // Find the language by ID
                const language = await Language.findOne({ name: languageName });
        
                if (!language) {
                    throw new Error('Language not found');
                }
        
                // Update the highscores array
                user.highscores.push({
                    score,
                    languageName: language.name,
                });
        
                // Save the updated user
                await user.save();
        
                return 'High score updated successfully';
            } catch (error) {
                throw new Error(error.message);
            }
        },        
    }
};

module.exports = user_resolvers;
