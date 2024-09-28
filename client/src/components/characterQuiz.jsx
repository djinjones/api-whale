import Query from '../utils/queries';
import { useEffect, useState } from 'react';

function CharacterQuiz() {
    const [currentScore, setCurrentScore] = useState(0);
    const [newGame, setNewGame] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [currentRound, setCurrentRound] = useState(1);
    const [titleEnglish, setTitleEnglish] = useState(''); // State for English title
    const [titleJapanese, setTitleJapanese] = useState(''); // State for Japanese title
    const [currentScene, setCurrentScene] = useState();
    const [title, setTitle] = useState();
    const [hasGuessed, setHasGuessed] = useState(false);
    // Function to handle fetching random anime
    async function handleGetRandomAnime() {
        try {

            let data;  // Declare a variable to hold the anime data
            let rank = Infinity; // Initialize rank to a large number to start the loop
            let count = 0

        // Keep calling Query.getRandomAnime() until we find one with rank < 4000
            while (rank >= 4000 && count < 10) {
                const response = await Query.getRandomAnime(); // Ensure this returns a promise
                data = response.data;
                rank = data.popularity; // Set the rank from the API response
                count ++
                // Log the rank for debugging
                console.log('Trying anime with rank:', rank, 'count: ', count);
        }


            ////////////////////////////////////////////////
            // const response = await Query.getRandomAnime(); // Ensure this returns a promise
            // const data = response.data;
            // let rank = data.popularity;
            // Set the state for titles and ID
            setCurrentId(data.mal_id);
            setTitleEnglish(data.title_english || '');
            setTitleJapanese(data.title_japanese || '');
            setTitle(data.title || '');
            console.log('rank: ', data.rank, 'popularity: ', data.popularity, 'score: ', data.score )
            // Fetch the scene using the ID from the response, without waiting for state update
            const sceneResponse = await Query.getAnimeScene(data.mal_id);
            const scene = sceneResponse.data[0].jpg.large_image_url;
            
            // Update the scene state
            setCurrentScene(scene);

            // Log the data directly
            console.log('current ID: ', data.mal_id, 'title: ', data.title, 'title english: ', data.title_english, 'title japanese: ', data.title_japanese);
        } catch (error) {
            console.error('Error fetching random anime:', error);
        }
    }

    useEffect(() => {
        // Fetch random anime when component mounts (optional)
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="quiz">
            {currentScene && <img src={currentScene} alt="Anime Scene" />} {/* Display the scene if available */}
            <p>{title}</p>
            <p>{titleEnglish}</p>
            <p>{titleJapanese}</p>
            <button onClick={handleGetRandomAnime}>Get Random Anime</button>
        </div>
    );
}

export default CharacterQuiz;
