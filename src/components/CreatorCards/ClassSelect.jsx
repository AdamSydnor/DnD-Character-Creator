import { useState, useEffect } from "react";

export default function ClassSelect({
    charLevel,
    charClass,
    charSubclass,
    setCharSubclass,
    selectedSpells,
    setSelectedSpells,
    charSpells,
    setCharSpells,
    charClass: {
        classFeatures,
        classId,
        description,
        name,
        spells,
        spellsAt,
        subclasses,
        subclassAt
    }
}) {
// State variables:
    let spellCount;
    let cantripCount;
    let hasSubclass;

    const updateSpells = (spell) => {
        if (!selectedSpells.some(selectedSpell => selectedSpell.spellId === spell.spellId)) {
            let newSelected = [...selectedSpells, spell];
            setSelectedSpells(newSelected);
        } else {
            let newSelected = selectedSpells.filter(selectedSpell => selectedSpell.spellId !== spell.spellId)
            setSelectedSpells(newSelected);
        };
    };

    useEffect(() => {
        spells = spells.map(spell => {
            if (selectedSpells.some(selectedSpell => selectedSpell.spellId === spell.spellId)) {
                let spellSelect = {...spell, selected: true}
                return {...spell, selected: true};
            } else {
                return {...spell, selected: false};
            };
        });
        setCharSpells(spells);
    }, [selectedSpells]);

    classFeatures.map((feature) => {
        if (feature.spellIncrease !== null) {
            spellCount += feature.spellIncrease;
        };
    });

    let canCast
    const classSpells = charSpells.map((spell) => {
        if (charLevel >= spellsAt) {
            canCast = <h2>Spells:</h2>
            return (
                <div className={spell.selected ? 'selected-spell' : ''}>
                    <p className={spell.selected ? 'btn-selected class-card-btn' : 'class-card-btn'} onClick={() => updateSpells(spell)}>{spell.name}</p>
                </div>
            )
        } else {
            canCast = <></>
        }
    });

    let subclassChoice
    const classSubclasses = subclasses.map((subclass) => {
        if (charLevel >= subclassAt) {
            subclassChoice = <h2 className="subclass-selected">Select a subclass: <br /> {charSubclass.name}</h2>
            return (
                <div key={subclass.subclassId}>
                    <button
                        className="class-card-btn"
                        type="radio"
                        value={JSON.stringify(subclass)}
                        onClick={(event) => setCharSubclass(JSON.parse(event.target.value))}
                    >{subclass.name}</button>
                </div>
            );
        } else {
            subclassChoice = <></>
        };
    });

    return(
        <div>
            <div>
                <div className="select-btn">
                    {subclassChoice}
                </div>
                <div className="select-btn">
                    {classSubclasses}
                </div>
            </div>
            <div>
                <div className="select-btn">
                    {canCast}
                </div>
                <div className="select-btn spell-wrap">
                    {classSpells}
                </div>
            </div>
        </div>
    );
};