import { GoPlusCircle } from "react-icons/go";
import './BackgroundCard.css'

export default function BackgroundCard({
    races,
    charName,
    charImage,
    setCharImage,
    setCharName,
    setCharRace,
    charRace,
    charSubrace,
    setCharSubrace,
    setCharDescription,
    charBackground,
    setCharBackground,
    backgrounds,
    charDescription,
    myCharacter,
    imageChange,
    setImageChange
}) {
    const dndRaces = races.map((race) => {
        let selectedRace = charRace.name === race.name;
        return (
            <option key={race.raceId} value={JSON.stringify(race)} selected={selectedRace}>{race.name}</option>
            );
        });
    let dndSubraces;
    if (charRace.subraces.length) {
        dndSubraces = charRace.subraces.map((subrace) => {
            let selectedSubrace = charSubrace === subrace;
            return (
                <option key={subrace.subraceId} value={JSON.stringify(subrace)} selected={selectedSubrace}>{subrace.name}</option>
            );
        });
    };
    const dndBackgrounds = backgrounds.map((background) => {
        let selectedBackground = charBackground.name === background.name;
        return (
            <option type="radio" key={background.backgroundId} value={JSON.stringify(background)} selected={selectedBackground}>{background.name}</option>
        );
    });

    return (
        <div className="background-card-div creator-card-div">
            <div className="background-flex-div">
                <div className="img-div">
                    {myCharacter ?
                        <img id="characterImage" className="character-img" src={imageChange ? URL.createObjectURL(charImage) : `../${charImage}`} />
                    :
                        <img id="characterImage" className="character-img" src={charImage ? URL.createObjectURL(charImage) : '../images/assets/5f5c2624f71046369ba51e774f6988ce.jpeg'} />
                    }
                    <form action="/profile" method="post" extype="multipart/form-data">
                        <input
                            className="choose-img"
                            type="file"
                            name="image"
                            id="imgInp"
                            onChange = {(event) => {
                                setCharImage(event.target.files[0]);
                                setImageChange(true);
                            }}
                        />
                    </form>
                </div>
                <div className="info-description-flex">
                    <div className="info-div">
                        <div className="name-background">
                            <span className="name-span">
                                <h3>Name:</h3>
                                <i class="bi bi-dash-circle"></i>
                                <input className="name-textarea" onChange={(event) => setCharName(event.target.value)} value={charName} type="text" />
                            </span>
                            <span className="background-span">
                                <h3>Background:</h3>
                                <select className="select" onChange={(event) => setCharBackground(JSON.parse(event.target.value))} name="background" id="background-select">
                                    {dndBackgrounds}
                                </select>
                            </span>
                        </div>
                        <div className="race-subrace">
                            <span className="race-span">
                                <h3>Race:</h3>
                                <select className="select" onChange={(event) => {
                                    setCharRace(JSON.parse(event.target.value));
                                    setCharSubrace(JSON.parse(event.target.value).subraces[0] ?? null);
                                }} name="race" id="race-select">
                                    {dndRaces}
                                </select>
                            </span>
                            {dndSubraces ?
                                <span className="subrace-span">
                                    <h3>Subrace:</h3>
                                    <select className="select" onChange={(event) => setCharSubrace(JSON.parse(event.target.value))} name="subrace" id="subrace-select">
                                        {dndSubraces}
                                    </select>
                                </span>
                            :
                                <span></span>
                            }
                        </div>
                    </div>
                    <div className="description-div">
                        <h3>Description:</h3>
                        <textarea className="desc-textarea" onChange={(event) => setCharDescription(event.target.value)} name="description" value={charDescription}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};