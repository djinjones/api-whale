import CharacterQuiz from './components/characterQuiz';
import Footer from './components/footer'
import Save from './utils/save'
import { useState, useEffect } from 'react';

function App() {
    let saveData;
    let hasLoggedIn;

    useEffect(() => {
         saveData = Save.checkSave();
         hasLoggedIn = Save.checkFirstTime();

    }, []);
    

    return (

        <div className='main'>
            <div>
                <h2>API Whale</h2>
                
            </div>
                <CharacterQuiz saveData={saveData}/>
            <Footer hasLoggedIn={hasLoggedIn}/>
        </div>
    )
}

export default App;