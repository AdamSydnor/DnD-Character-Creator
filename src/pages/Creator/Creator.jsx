import './Creator.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BackgroundCard from '../../components/CreatorCards/BackgroundCard.jsx';
import ClassCard from '../../components/CreatorCards/ClassCard.jsx';
import AbilitiesCard from '../../components/CreatorCards/AbilitiesCard.jsx';

export default function Creator() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { races, backgrounds, skills, classes, myCharacter } = useLoaderData();

// State variables:
    const [activeIndex, setActiveIndex] = useState(0);

// State for background card:
    const [charImage, setCharImage] = useState(myCharacter ? myCharacter.image : null);
    const [charName, setCharName] = useState(myCharacter ? myCharacter.name : '');
    const [charRace, setCharRace] = useState(myCharacter ? myCharacter.race : races[0]);
    const [charSubrace, setCharSubrace] = useState(myCharacter ? myCharacter.subrace : races[0].subraces[0]);
    const [charBackground, setCharBackground] = useState(myCharacter ? myCharacter.background : backgrounds[0]);
    const [charDescription, setCharDescription] = useState(myCharacter ? myCharacter.description : '');
    const [imageChange, setImageChange] = useState(false);

// State for class card:
    const [charLevel, setCharLevel] = useState(myCharacter ? myCharacter.level : 1);
    const [charClass, setCharClass] = useState(myCharacter ? myCharacter.classes[0] : classes[0]);
    const [charSubclass, setCharSubclass] = useState(myCharacter ? myCharacter.subclasses[0] || null : classes[0].subclasses[0] || null);
    const [selectedSpells, setSelectedSpells] = useState(myCharacter ? myCharacter.spells : []);
    const [hp, setHP] = useState(classes[0].hp);

// State for abilities card:
    const [pointTotal, setPointTotal] = useState(myCharacter ? 0 : 27);
    const [strCount, setStrCount] = useState(myCharacter ? myCharacter.str : 8);
    const [dexCount, setDexCount] = useState(myCharacter ? myCharacter.dex : 8);
    const [conCount, setConCount] = useState(myCharacter ? myCharacter.con : 8);
    const [intCount, setIntCount] = useState(myCharacter ? myCharacter.int : 8);
    const [wisCount, setWisCount] = useState(myCharacter ? myCharacter.wis : 8);
    const [chaCount, setChaCount] = useState(myCharacter ? myCharacter.cha : 8);

// Hit point calculator:
    const hpCalc = () => {
        let conHP = Math.floor((conCount - 10) / 2);
        setHP(charClass.hp + (charClass.hpGain * (charLevel - 1)) + (charLevel * conHP));
    };

    useEffect(() => {
        hpCalc();
    }, [charLevel, charClass, charSubclass, conCount]);

    // Handlers:
    const saveCharacterHandler = async () => {
        if (pointTotal !== 0) {
            alert('Must alot all ability points.');
            return;
        };

        let charInfo = {
            name: charName,
            raceId: charRace.raceId,
            subraceId: charSubrace ? charSubrace.subraceId : null,
            charLevel: charLevel,
            hp: hp,
            classId: charClass.classId,
            subclassId: charSubclass ? charSubclass.subclassId : null,
            charSpells: selectedSpells,
            backgroundId: charBackground.backgroundId,
            description: charDescription,
            str: strCount,
            dex: dexCount,
            con: conCount,
            int: intCount,
            wis: wisCount,
            cha: chaCount
        };

        let data = await axios.post('/api/character', charInfo);

        const formData = new FormData();
        formData.append('image', charImage);
        formData.append('characterId', data.data.characterId);

        if (data.status === 200) {
            let dataTwo = await axios.post('/api/characterimage', formData);
            if (dataTwo.status === 200) {
                navigate('/characters');
            };
        } else {
            alert('Cannot create character unless signed in!');
            dispatch({type: 'modal-on'});
        };
    };

    const saveChangesHandler = async () => {
        if (pointTotal !== 0) {
            alert('Must alot all ability points.');
            return;
        };

        let charInfo = {
            characterId: myCharacter.characterId,
            name: charName,
            raceId: charRace.raceId,
            subraceId: charSubrace ? charSubrace.subraceId : null,
            charLevel: charLevel,
            hp: hp,
            classId: charClass.classId,
            subclassId: charSubclass ? charSubclass.subclassId : null,
            charSpells: selectedSpells,
            backgroundId: charBackground.backgroundId,
            description: charDescription,
            str: strCount,
            dex: dexCount,
            con: conCount,
            int: intCount,
            wis: wisCount,
            cha: chaCount
        };

        const data = await axios.post('/api/characterupdate', charInfo);

        const formData = new FormData();
        formData.append('image', charImage);
        formData.append('characterId', data.data.characterId);

        if (data.status === 200) {
            if (!imageChange) {
                let dataTwo = await axios.post('/api/characterimagetwo', {
                    image: myCharacter.image,
                    characterId: data.data.characterId
                });
                if (dataTwo.status === 200) {
                    navigate('/characters');
                };
            } else {
                let dataTwo = await axios.post('/api/characterimage', formData);
                if (dataTwo.status === 200) {
                    navigate('/characters');
                };
            }
        } else {
            alert('Cannot create character unless signed in!');
            dispatch({type: 'modal-on'});
        };
    }

    // Final Return Statment:
    return (
        <main className='char-creator'>
            <div className="btns-div">
                <div className='btn-div'>
                    <button className='page-select-btn' onClick={() => {
                        setActiveIndex(0)
                    }}>Background</button>
                </div>
                <div className='btn-div'>
                    <button className='page-select-btn' onClick={() => {
                        setActiveIndex(1)
                    }}>Class</button>
                </div>
                <div className='btn-div'>
                    <button className='page-select-btn' onClick={() => {
                        setActiveIndex(2)
                    }}>Abilities</button>
                </div>
            </div>
            <div
                className='creator-div'
                style={{ transform: `translate(-${activeIndex * 33.3}%)` }}
            >
                <BackgroundCard
                    charName={charName}
                    setCharName={setCharName}
                    charImage={charImage}
                    setCharImage={setCharImage}
                    charRace={charRace}
                    charSubrace={charSubrace}
                    setCharRace={setCharRace}
                    setCharSubrace={setCharSubrace}
                    setCharDescription={setCharDescription}
                    charBackground={charBackground}
                    setCharBackground={setCharBackground}
                    races={races}
                    backgrounds={backgrounds}
                    charDescription={charDescription}
                    myCharacter={myCharacter}
                    imageChange={imageChange}
                    setImageChange={setImageChange}
                />
                <ClassCard
                    classes={classes}
                    charClass={charClass}
                    setCharClass={setCharClass}
                    charSubclass={charSubclass}
                    setCharSubclass={setCharSubclass}
                    charLevel={charLevel}
                    setCharLevel={setCharLevel}
                    selectedSpells={selectedSpells}
                    setSelectedSpells={setSelectedSpells}
                    hpCalc={hpCalc}
                />
                <AbilitiesCard
                    strCount={strCount}
                    setStrCount={setStrCount}
                    dexCount={dexCount}
                    setDexCount={setDexCount}
                    conCount={conCount}
                    setConCount={setConCount}
                    intCount={intCount}
                    setIntCount={setIntCount}
                    wisCount={wisCount}
                    setWisCount={setWisCount}
                    chaCount={chaCount}
                    setChaCount={setChaCount}
                    hp={hp}
                    pointTotal={pointTotal}
                    setPointTotal={setPointTotal}
                />
            </div>
            <div className='save-div'>
                {myCharacter ?
                <button className='save-btn' onClick={saveChangesHandler}>Save changes</button>
                :
                <button className='save-btn' onClick={saveCharacterHandler}>Save</button>}
            </div>
        </main>
    );
};