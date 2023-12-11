import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LANGUAGES, GET_CODE_BLOCKS } from '../utils/queries';

function Home() {
    const [languageId, setLanguageId] = useState(null);
    const [codeBlocks, setCodeBlocks] = useState([]);
    const [currentCodeBlockIndex, setCurrentCodeBlockIndex] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [typingSpeed, setTypingSpeed] = useState(null);
    const inputRef = useRef(null);

    // Fetch languages when the component mounts
    const { loading: languagesLoading, data: languagesData } = useQuery(GET_LANGUAGES);

    // Fetch code blocks when the language changes
    const { loading: codeBlocksLoading, data: codeBlocksData } = useQuery(GET_CODE_BLOCKS, {
        variables: { languageId },
        skip: !languageId,
    });

    useEffect(() => {
        // Set default language when languages are loaded
        if (!languagesLoading && languagesData && languagesData.getLanguages.length > 0) {
            setLanguageId(languagesData.getLanguages[0]._id);
        }
    }, [languagesLoading, languagesData]);

    useEffect(() => {
        // Set code blocks when languageId changes
        if (!codeBlocksLoading && codeBlocksData) {
            setCodeBlocks(codeBlocksData.getCodeBlocks);
            setCurrentCodeBlockIndex(generateRandomIndex(codeBlocksData.getCodeBlocks.length));
        }
    }, [codeBlocksLoading, codeBlocksData, languageId]);

    const generateRandomIndex = (maxIndex) => {
        return Math.floor(Math.random() * maxIndex);
    };

    const handleInputChange = (e) => {
        const inputText = e.target.value;

        setUserInput(inputText);

        // Start the timer when the user starts typing
        if (!startTime) {
            setStartTime(Date.now());
        }

        // Check if the input matches the code block
        const codeBlockText = codeBlocks[currentCodeBlockIndex]?.value;
        if (inputText === codeBlockText && !typingSpeed) {
            const endTime = Date.now();
            const timeInSeconds = (endTime - startTime) / 1000;
            const speed = Math.round((codeBlockText.length / 5) / timeInSeconds); // Adjust for word length
            setTypingSpeed(speed);
        }
    };

    const handleButtonClick = () => {
        // Generate a new random index for the code block array
        const newIndex = generateRandomIndex(codeBlocks.length);
        setCurrentCodeBlockIndex(newIndex);
        // Reset typing speed and user input
        setTypingSpeed(null);
        setUserInput('');
        // Start the timer when the user starts typing the new code block
        setStartTime(Date.now());
    };

    return (
        <section className="home flex flex-col items-center justify-center mt-36 mx-auto">
            <div className="code-block flex flex-col items-center">
                {/* Display buttons for each language */}
                {languagesData &&
                    languagesData.getLanguages.map((language) => (
                        <p
                            key={language._id}
                            onClick={() => setLanguageId(language._id)}
                            className="cursor-pointer"
                        >
                            {language.name}
                        </p>
                    ))}
                {/* Display button to fetch a new random code block */}
                <button onClick={handleButtonClick} className="my-btn my-3">
                    New Code Block
                </button>
            </div>
            {/* Display the current code block */}
            <div className="bg-gray-800 p-4 rounded-md mt-4 flex flex-col items-center">
                {codeBlocks[currentCodeBlockIndex] && (
                    <p className="my-2">{codeBlocks[currentCodeBlockIndex].value}</p>
                )}
            </div>
            <textarea
                rows="4" // Set the number of rows you want to display
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                className="p-2 rounded-md focus:outline-none mt-4 resize-none"
                placeholder="Type here..."
            />
            {typingSpeed && <p className="mt-4">Typing speed: {typingSpeed} WPM</p>}
        </section>
    );
}

export default Home;
