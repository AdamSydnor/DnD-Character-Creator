import "./AbilitiesCard.css"
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";

export default function AbilitiesCard({
    abilities,
    character,
    strCount,
    setStrCount,
    dexCount,
    setDexCount,
    conCount,
    setConCount,
    intCount,
    setIntCount,
    wisCount,
    setWisCount,
    chaCount,
    setChaCount,
    hp,
    pointTotal,
    setPointTotal
}) {
// State variables:

// Function to alocate ability points:
    const caseSetCount = (abilityPointCount, setPointCount, increment) => {
        if (abilityPointCount < 13) {
            if (increment && pointTotal >= 1) {
                setPointCount(abilityPointCount + 1);
                setPointTotal(pointTotal - 1);
            } else {
                if (!increment && abilityPointCount > 8) {
                    setPointCount(abilityPointCount - 1);
                    setPointTotal(pointTotal + 1);
                };
            };
        } else if (abilityPointCount > 13) {
            if (increment) {
                if (abilityPointCount < 15 && pointTotal >= 2) {
                    setPointCount(abilityPointCount + 1);
                    setPointTotal(pointTotal - 2);
                };
            } else {
                setPointCount(abilityPointCount - 1);
                setPointTotal(pointTotal + 2);
            };
        } else if (abilityPointCount = 13) {
            if (increment) {
                if (abilityPointCount < 16 && pointTotal >= 2) {
                    setPointCount(abilityPointCount + 1);
                    setPointTotal(pointTotal - 2);
                };
            } else {
                setPointCount(abilityPointCount - 1);
                setPointTotal(pointTotal + 1);
            };
        };
    };

    const setCount = (ability, increment) => {
        switch (ability) {
            case ('str'):
                caseSetCount(strCount, setStrCount, increment);
                break;
            case ('dex'):
                caseSetCount(dexCount, setDexCount, increment);
                break;
            case ('con'):
                caseSetCount(conCount, setConCount, increment);
                break;
            case ('int'):
                caseSetCount(intCount, setIntCount, increment);
                break;
            case ('wis'):
                caseSetCount(wisCount, setWisCount, increment);
                break;
            case ('cha'):
                caseSetCount(chaCount, setChaCount, increment);
                break;
        };
    };

// Return statment:
    return (
        <div className="creator-card-div abilities-card-div">
            <div className="hp-div">
                <h2>Hit points:</h2>
                <h2>{hp}</h2>
            </div>
            <div className="left-side">
                <div className="ability-parent-div">
                    <div className="ap-div">
                        <h2>Ability points:</h2>
                        <h2>{pointTotal}</h2>
                    </div>
                    <div className="abilities-div">
                        <div className="ability-div">
                            <h3>Strength:</h3>
                            <span>
                                <IoMdRemoveCircleOutline className="plusminus-btn" onClick={() => setCount('str', false)} />
                                <h3 className="count">{strCount}</h3>
                                <IoMdAddCircleOutline className="plusminus-btn" onClick={() => setCount('str', true)} />
                            </span>
                        </div>
                        <div className="ability-div">
                            <h3>Dexterity:</h3>
                            <span>
                                <IoMdRemoveCircleOutline className="plusminus-btn" onClick={() => setCount('dex', false)} />
                                <h3 className="count">{dexCount}</h3>
                                <IoMdAddCircleOutline className="plusminus-btn" onClick={() => setCount('dex', true)} />
                            </span>
                        </div>
                        <div className="ability-div">
                            <h3>Constitution:</h3>
                            <span>
                                <IoMdRemoveCircleOutline className="plusminus-btn" onClick={() => setCount('con', false)} />
                                <h3 className="count">{conCount}</h3>
                                <IoMdAddCircleOutline className="plusminus-btn" onClick={() => setCount('con', true)} />
                            </span>
                        </div>
                        <div className="ability-div">
                            <h3>Intelligence:</h3>
                            <span>
                                <IoMdRemoveCircleOutline className="plusminus-btn" onClick={() => setCount('int', false)} />
                                <h3 className="count">{intCount}</h3>
                                <IoMdAddCircleOutline className="plusminus-btn" onClick={() => setCount('int', true)} />
                            </span>
                        </div>
                        <div className="ability-div">
                            <h3>Wisdom:</h3>
                            <span>
                                <IoMdRemoveCircleOutline className="plusminus-btn" onClick={() => setCount('wis', false)} />
                                <h3 className="count">{wisCount}</h3>
                                <IoMdAddCircleOutline className="plusminus-btn" onClick={() => setCount('wis', true)} />
                            </span>
                        </div>
                        <div className="ability-div">
                            <h3>Charisma:</h3>
                            <span>
                                <IoMdRemoveCircleOutline className="plusminus-btn" onClick={() => setCount('cha', false)} />
                                <h3 className="count">{chaCount}</h3>
                                <IoMdAddCircleOutline className="plusminus-btn" onClick={() => setCount('cha', true)} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};