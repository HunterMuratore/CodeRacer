import { useState, useEffect, useRef } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const [words, setWords] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [typingSpeed, setTypingSpeed] = useState(null);
    const inputRef = useRef(null);
  
    // Fetch words when the component mounts
    useEffect(() => {
      fetchWords();
      inputRef.current.focus();
    }, []);
  
    // Fetch words from an API (you can replace this with your preferred word source)
    const fetchWords = async () => {
      try {
        const response = await fetch('https://api.example.com/words');
        const data = await response.json();
        setWords(data.words);
      } catch (error) {
        console.error('Error fetching words:', error);
      }
    };
  
    const handleInputChange = (e) => {
      const inputText = e.target.value;
      setUserInput(inputText);
  
      // Start the timer when the user starts typing
      if (!startTime) {
        setStartTime(Date.now());
      }
  
      // Check if the input matches the words
      if (inputText === words.join(' ')) {
        const endTime = Date.now();
        const timeInSeconds = (endTime - startTime) / 1000;
        const speed = Math.round((words.join(' ').length / 5) / timeInSeconds); // Adjust for word length
  
        setTypingSpeed(speed);
      }
    };
  
    return (
      <section className="home flex flex-wrap items-center justify-center mt-36 mx-auto">
        <div className="code-black">
          {/* Display the words for the user to type */}
          <p>{words.join(' ')}</p>
        </div>
        <input
          type="text"
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          className="p-2 rounded-md focus:outline-none"
          placeholder="Timer starts when you type..."
        />
        {typingSpeed && (
          <p className="mt-4">Typing speed: {typingSpeed} WPM</p>
        )}
      </section>
    );
  }
  
  export default Home;