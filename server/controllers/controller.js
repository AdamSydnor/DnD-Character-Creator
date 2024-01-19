import {
    db,
    User,
    Character,
    CharacterHas,
    Ability,
    Skill,
    Background,
    Feat,
    Race,
    Subrace,
    Class,
    CharacterClass,
    Subclass,
    CharacterSubclass,
    RaceFeature,
    SubraceFeature,
    ClassFeature,
    HasAccess,
    ClassClassFeature,
    ClassFeatureChoice,
    ClassFeatureClassFeatureChoice,
    SubclassFeature,
    SubclassSubclassFeature,
    SubclassFeatureChoice,
    SubclassFeatureSubclassFeatureChoice,
    RaceSpell,
    ClassSpell,
    SubraceSpell,
    SubclassSpell,
    FeatSpell,
    Reaction,
    Spell,
    CharacterSpell,
    Info
} from "../../database/model.js";
import multer from "multer";
import path from "path";

// Controller functions:
async function getCharacters(req, res) {
    let isLoggedIn = false;
    if (req.session.user) {
        const chars = await Character.findAll({
            where: {userId: req.session.user.userId}, include: [
                { model: Race, include:
                    { model: Subrace }
                },
                { model: Subrace, include:
                    { model: SubraceFeature }
                },
                { model: Class, include: [
                    { model: ClassFeature },
                    { model: Spell },
                    { model: Subclass }
                    ]
                },
                { model: Subclass, include:
                    { model: SubclassFeature }
                },
                { model: Spell },
                { model: Background }
            ]
        });
        isLoggedIn = true
        res.status(200).json({
            chars: chars,
            isLoggedIn: isLoggedIn
        });
    } else {
        res.status(200).json(false);
    };
};

async function getCharacter(req, res) {
    const { id } = req.params;
    const character = await Character.findAll({
        where: {characterId: +id }, include: [
            { model: Race, attributes: ['name', 'index'], include:
                { model: Subrace, attributes: ['name', 'index'] }
            },
            { model: Class, attributes: ['name', 'index'] },
            { model: Spell, attributes: ['name', 'index'] }
        ]
    });
    res.status(200).json(character);
};

async function getCreatorInfo(req, res) {
    const races = await Race.findAll({
        include: Subrace
    });
    const backgrounds = await Background.findAll();
    const skills = await Skill.findAll();
    const classes = await Class.findAll({
        include: [
            { model: ClassFeature, include:
                { model: HasAccess }
            },
            { model: Subclass, include:
                { model: SubclassFeature }
            },
            Spell
        ]
    });
    res.status(200).json({
        races: races,
        backgrounds: backgrounds,
        skills: skills,
        classes: classes
    });
};

async function postCharacter(req, res) {
    const user = req.session.user;
    const { name, charLevel, hp, raceId, subraceId, classId, subclassId, charSpells, backgroundId, description, str, dex, con, int, wis, cha } = req.body;
    console.log(charSpells, '<------------this is charSpells');
    if (user) {
        const newCharacter = await Character.create({
            userId: user.userId,
            name: name,
            level: charLevel,
            hp: hp,
            backgroundId: backgroundId,
            description: description,
            str: str,
            dex: dex,
            con: con,
            int: int,
            wis: wis,
            cha: cha,
            raceId: raceId,
            subraceId: subraceId
        });
        await CharacterClass.create({
            characterId: newCharacter.characterId,
            classId: classId
        });
        if (subclassId) {
            await CharacterSubclass.create({
                characterId: newCharacter.characterId,
                subclassId: subclassId
            });
        };
        for (let i = 0; i < charSpells.length; i++) {
            await CharacterSpell.create({
                characterId: newCharacter.characterId,
                spellId: charSpells[i].spellId
            });
        };
        res.status(200).json({
            success: true,
            characterId: newCharacter.characterId
        });
    } else {
        res.status(201).json({success: false});
    };
};

async function saveCharacterChanges(req, res) {
    const user = req.session.user;
    const { characterId, name, image, charLevel, hp, raceId, subraceId, classId, subclassId, charSpells, backgroundId, description, str, dex, con, int, wis, cha } = req.body;
    console.log(characterId, '<----------------------- THIS IS CharacterId')
    if (user && characterId !== '0') {
        const newCharacter = await Character.create({
            userId: user.userId,
            name: name,
            image: image,
            level: charLevel,
            hp: hp,
            backgroundId: backgroundId,
            description: description,
            str: str,
            dex: dex,
            con: con,
            int: int,
            wis: wis,
            cha: cha,
            raceId: raceId,
            subraceId: subraceId,
        });
        await CharacterClass.create({
            characterId: newCharacter.characterId,
            classId: classId
        });
        if (subclassId) {
            await CharacterSubclass.create({
                characterId: newCharacter.characterId,
                subclassId: subclassId
            });
        };
        for (let i = 0; i < charSpells.length; i++) {
            await CharacterSpell.create({
                characterId: newCharacter.characterId,
                spellId: charSpells[i].spellId
            });
        };
        const character = await Character.findOne({
            where: { characterId: characterId }
        });
        console.log(character)
        character.destroy();
        res.status(200).json({
            success: true,
            characterId: newCharacter.characterId
        });
    } else {
        res.status(201).json({success: false});
    };
};

async function deleteCharacter(req, res) {
    const { id } = req.params;
    console.log(req.params);
    const character = await Character.findOne({
        where: { characterId: id }
    });
    console.log(character)
    character.destroy();
    const chars = await Character.findAll({
        where: {userId: req.session.user.userId}, include: [
            { model: Race, include:
                { model: Subrace }
            },
            { model: Subrace, include:
                { model: SubraceFeature }
            },
            { model: Class, include: [
                { model: ClassFeature },
                { model: Spell },
                { model: Subclass }
                ]
            },
            { model: Subclass, include:
                { model: SubclassFeature }
            },
            { model: Spell },
            { model: Background }
        ]
    });
    res.status(200).json(chars);
};

async function repostCharacterImage(req, res) {
    console.log(req.body, '<------------------ THIS IS REQ.BODY')
    const user = req.session.user;
    if (user) {
        await Character.update({
            image: req.body.image
        }, {
            where: { characterId: req.body.characterId }
        });
        res.status(200).json({success: true});
    } else {
        res.status(201).json({success: false});
    }
};

async function postCharacterImage(req, res) {
    const user = req.session.user;
    if (user) {
        await Character.update({
            image: req.file ? req.file.path : 'images/assets/5f5c2624f71046369ba51e774f6988ce.jpeg'
        }, {
            where: { characterId: req.body.characterId }
        });
        res.status(200).json({success: true});
    } else {
        res.status(201).json({success: false});
    };
};

async function editCharacter(req, res) {
    const { id } = req.params;
    const myCharacter = await Character.findOne({
        where: {characterId: +id }, include: [
            { model: Race, include:
                { model: Subrace }
            },
            { model: Subrace, include:
                { model: SubraceFeature }
            },
            { model: Class, include: [
                { model: ClassFeature },
                { model: Spell },
                { model: Subclass }
                ]
            },
            { model: Subclass, include:
                { model: SubclassFeature }
            },
            { model: Spell },
            { model: Background }
        ]
    });

    console.log(myCharacter)

    res.status(200).json({
        myCharacter: myCharacter
    });
};

// Image controller:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/avatars');
    },
    filename: (request, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        };
        cb('Give a proper file type to upload.');
    }
}).single('image');

export { getCharacters, getCharacter, getCreatorInfo, postCharacter, editCharacter, saveCharacterChanges, deleteCharacter, postCharacterImage, repostCharacterImage, upload }