import './Characters.css';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Characters() {
    const navigate = useNavigate();

// State variables:
    const { data: { chars, isLoggedIn }, monsters, user } = useLoaderData();
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);
    const [myCharacters, setCharacters] = useState(chars);

// Handlers:
    const deleteHandler = async(characterId) => {
        const { data } = await axios.delete(`/api/character/${characterId}`);
        setCharacters(data);
    };

    const editHandler = async(characterId) => {
        navigate(`/creator/${characterId}`)
    };

// Function for displaying the character cards:
let characters;
if (loggedIn  && myCharacters[0]) {
    characters = myCharacters.map((character) => {
        let { name, image, classes, subclasses, race, subrace, characterId, description, background, spells } = character;
        console.log(character)

        let mySpells = spells.map((spell) => {
            return <h5>{spell.name}</h5>
        })
    
        return (
            <div>
                <div key={characterId} className='character-div'>
                    <div className='image-name-position-div'>
                        <img className="character-img" src={image} />
                        <div className='name-description-div'>
                            <h2>{name}</h2>
                            <h4 className='description'>{description}</h4>
                            <span className='char-info'>
                                <p>Background:</p>
                                <h4>{background.name}</h4>
                            </span>
                            <span className='char-info'>
                                <p>Race:</p>
                                <h4>{race.name}</h4>
                            </span>
                            {subrace?
                                <span className='char-info'>
                                    <p>Subace:</p>
                                    <h4>{subrace.name}</h4>
                                </span>
                            :
                                <></>
                            }
                        </div>
                    </div>
                    <div className='combat-info-div'>
                        <div>
                            <div className='class-info-div'>
                                <span className='class-info'>
                                    <h4>Class:</h4>
                                    <h2>{classes[0].name}</h2>
                                </span>
                                <span className='class-info'>
                                    <h4>subclass:</h4>
                                    <h2>{subclasses[0].name}</h2>
                                </span>
                            </div>
                            {character.spells[0] ?
                            <div className='char-spells-div'>
                                <h3>Spells:</h3>
                                <span className='char-spells'>
                                    {mySpells}
                                </span>
                            </div>
                            :
                            <></>}
                        </div>
                        <div className='stat-div'>
                            <span className='stat-info'>
                                <h3>Strength:</h3>
                                <h4>{character.str}</h4>
                            </span>
                            <span className='stat-info'>
                                <h3>Dexterity:</h3>
                                <h4>{character.dex}</h4>
                            </span>
                            <span className='stat-info'>
                                <h3>Constitution:</h3>
                                <h4>{character.con}</h4>
                            </span>
                            <span className='stat-info'>
                                <h3>Intelligence:</h3>
                                <h4>{character.int}</h4>
                            </span>
                            <span className='stat-info'>
                                <h3>Wisdom:</h3>
                                <h4>{character.wis}</h4>
                            </span>
                            <span className='stat-info'>
                                <h3>Charisma:</h3>
                                <h4>{character.cha}</h4>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='edit-delete-btns'>
                    <button className='edit-delete-btn' onClick={() => deleteHandler(characterId)}>Delete</button>
                    <button className='edit-delete-btn' onClick={() => editHandler(characterId)}>Edit</button>
                </div>
            </div>
        );
    });
} else if (loggedIn) {
    characters = <p className='noChar-message'>Looks like you don't have any characters yet. Head over to the creator to get started!</p>
} else {
    characters = <p className='noChar-message'>You must be logged in to save and view characters.</p>
}

// Final return statement:
    return (
        <main className='characters'>
            {characters}
        </main>
    );
};

export default Characters