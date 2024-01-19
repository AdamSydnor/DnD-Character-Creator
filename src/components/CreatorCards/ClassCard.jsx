import './ClassCard.css';
import ClassSelect from "./ClassSelect";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export default function ClassCard({ classes, charClass, setCharClass, charSubclass, setCharSubclass, charLevel, setCharLevel, selectedSpells, setSelectedSpells, hpCalc }) {
// State variables:
    const [charSpells, setCharSpells] = useState(charClass.spells);

    const addClass = () => {
        
    };

    const classSelect = classes.map((classObj) => {
        return (
            <button
                className="class-card-btn"
                type="radio"
                value={JSON.stringify(classObj)}
                onClick={(event) => {
                    setCharClass(JSON.parse(event.target.value))
                    setCharSpells(JSON.parse(event.target.value).spells)
                    if (charLevel >= classObj.subclassAt) {
                        setCharSubclass(classObj.subclasses[0]);
                    } else {
                        setCharSubclass(null);
                    };
                }}
                key={classObj.classId}
            >{classObj.name}</button>
        );
    });

    return (
        <div id="class-card" className="creator-card-div class-card-div">
            <h1>Character Level: {charLevel}</h1>
            <div className='class-div'>
                <div className='level-div'>
                    <h2>{charClass.name} Level</h2>
                    <div className='level-select'>
                        <IoMdRemoveCircleOutline className='level-btn' onClick={() => {
                            if (charLevel > 1) {
                                setCharLevel(charLevel -= 1);
                            };
                        }} />
                        <h1>{charLevel}</h1>
                        <IoMdAddCircleOutline className='level-btn' onClick={() => {
                            if (charLevel < 12) {
                                if (charLevel + 1 >= charClass.subclassAt) {
                                    setCharSubclass(charClass.subclasses[0])
                                }
                                setCharLevel(charLevel += 1);
                            };
                        }} />
                    </div>
                </div>
                <div>
                    <div className='select-btn'>
                        {classSelect}
                    </div>
                    <ClassSelect
                        charClass={charClass}
                        charSubclass={charSubclass}
                        setCharSubclass={setCharSubclass}
                        charLevel={charLevel}
                        selectedSpells={selectedSpells}
                        setSelectedSpells={setSelectedSpells}
                        charSpells={charSpells}
                        setCharSpells={setCharSpells}
                    />
                </div>
            </div>
            <button className='add-class-btn' onClick={addClass}>Add</button>
        </div>
    );
};