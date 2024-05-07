import { DataTypes, Model } from "sequelize";
import url from "url";
import util from 'util';
import connectToDB from "./db.js";
import 'dotenv/config';

const UserName = process.env.UserName;
const Password = process.env.Password;
const Host = process.env.Host;
const DataBase = process.env.DB_URL;
const db = await connectToDB(`postgresql://${UserName}:${Password}@${Host}:5432/${DataBase}`);

// Table initializations:
class User extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        
    },
    {
        modelName: 'user',
        sequelize: db
    }
);

class Character extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Character.init(
    {
        characterId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        description: {
            type:DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.INTEGER
        },
        hp: {
            type: DataTypes.INTEGER
        },
        money: {
            type: DataTypes.INTEGER
        },
        str: {
            type: DataTypes.INTEGER
        },
        dex: {
            type: DataTypes.INTEGER
        },
        con: {
            type: DataTypes.INTEGER
        },
        int: {
            type: DataTypes.INTEGER
        },
        wis: {
            type: DataTypes.INTEGER
        },
        cha: {
            type: DataTypes.INTEGER
        },
        skillOne: {
            type: DataTypes.STRING(15)
        },
        skillTwo: {
            type: DataTypes.STRING(15)
        }
    },
    {
        modelName: 'character',
        sequelize: db
    }
);

class CharacterHas extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterHas.init(
    {
        hasAccessId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        spells: {
            type: DataTypes.INTEGER
        },
        cantrips: {
            type: DataTypes.INTEGER
        },
        spellSlotsOne: {
            type: DataTypes.INTEGER
        },
        spellSlotsTwo: {
            type: DataTypes.INTEGER
        },
        spellSlotsThree: {
            type: DataTypes.INTEGER
        },
        spellSlotsFour: {
            type: DataTypes.INTEGER
        },
        spellSlotsFive: {
            type: DataTypes.INTEGER
        },
        spellSlotsSix: {
            type: DataTypes.INTEGER
        },
        spellSlotsSeven: {
            type: DataTypes.INTEGER
        },
        layOnHands: {
            type: DataTypes.INTEGER
        },
        channelOath: {
            type: DataTypes.INTEGER
        },
        sorceryPoints: {
            type: DataTypes.INTEGER
        },
    },
    {
        modelName: 'characterHas',
        sequelize: db
    }
);

class Class extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Class.init(
    {
        classId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        subclassAt: {
            type: DataTypes.INTEGER
        },
        spellsAt: {
            type: DataTypes.INTEGER
        },
        hp: {
            type: DataTypes.INTEGER
        },
        hpGain: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'class',
        sequelize: db
    }
);


class HasAccess extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

HasAccess.init(
    {
        hasAccessId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        spells: {
            type: DataTypes.INTEGER
        },
        cantrips: {
            type: DataTypes.INTEGER
        },
        spellSlotsOne: {
            type: DataTypes.INTEGER
        },
        spellSlotsTwo: {
            type: DataTypes.INTEGER
        },
        spellSlotsThree: {
            type: DataTypes.INTEGER
        },
        spellSlotsFour: {
            type: DataTypes.INTEGER
        },
        spellSlotsFive: {
            type: DataTypes.INTEGER
        },
        spellSlotsSix: {
            type: DataTypes.INTEGER
        },
        spellSlotsSeven: {
            type: DataTypes.INTEGER
        },
        layOnHands: {
            type: DataTypes.INTEGER
        },
        channelOath: {
            type: DataTypes.INTEGER
        },
        sorceryPoints: {
            type: DataTypes.INTEGER
        },
    },
    {
        modelName: 'hasAccess',
        sequelize: db
    }
);

class ClassFeature extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

ClassFeature.init(
    {
        classFeatureId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        },
    },
    {
        modelName: 'classFeature',
        sequelize: db
    }
);

class ClassFeatureChoice extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

ClassFeatureChoice.init(
    {
        classFeatureChoiceId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'classFeatureChoice',
        sequelize: db
    }
);

class Subclass extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Subclass.init(
    {
        subclassId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        spellsAt: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'subclass',
        sequelize: db
    }
);

class SubclassFeature extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubclassFeature.init(
    {
        subclassFeatureId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'subclassFeature',
        sequelize: db
    }
);

class SubclassFeatureChoice extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubclassFeatureChoice.init(
    {
        subclassFeatureChoiceId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'subclassFeatureChoice',
        sequelize: db
    }
);

class Race extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Race.init(
    {
        raceId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'race',
        sequelize: db
    }
);

class RaceFeature extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

RaceFeature.init(
    {
        raceFeatureId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'raceFeature',
        sequelize: db
    }
);

class Subrace extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Subrace.init(
    {
        subraceId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'subrace',
        sequelize: db
    }
);

class SubraceFeature extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubraceFeature.init(
    {
        subraceFeatureId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'subraceFeature',
        sequelize: db
    }
);

class Feat extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Feat.init(
    {
        featId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'feat',
        sequelize: db
    }
);

class Spell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Spell.init(
    {
        spellId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        },
        level: {
            type: DataTypes.INTEGER
        },
        cantrip: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        modelName: 'spell',
        sequelize: db
    }
);

class Reaction extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Reaction.init(
    {
        reactionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'reaction',
        sequelize: db
    }
);

class Ability extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Ability.init(
    {
        abilityId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'ability',
        sequelize: db
    }
);

class Skill extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Skill.init(
    {
        skillId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'skill',
        sequelize: db
    }
);

class Background extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Background.init(
    {
        backgroundId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT
        },
        skillOne: {
            type: DataTypes.STRING(50)
        },
        skillTwo: {
            type: DataTypes.STRING(50)
        }
    },
    {
        modelName: 'background',
        sequelize: db
    }
);

class Info extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

Info.init(
    {
        InfoIf: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        }
    },
    {
        modelName: 'info',
        sequelize: db
    }
);

// Middle table initializations:
class RaceSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

RaceSpell.init(
    {
        raceSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'raceSpell',
        sequelize: db
    }
);

class ClassSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

ClassSpell.init(
    {
        classSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'classSpell',
        sequelize: db
    }
);

class SubraceSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubraceSpell.init(
    {
        subraceSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'subraceSpell',
        sequelize: db
    }
);

class SubclassSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubclassSpell.init(
    {
        subclassSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'subclassSpell',
        sequelize: db
    }
);

class FeatSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

FeatSpell.init(
    {
        featSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'featSpell',
        sequelize: db
    }
);

class ClassClassFeature extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

ClassClassFeature.init(
    {
        classClassFeatureId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'classClassFeature',
        sequelize: db
    }
);

class SubclassSubclassFeature extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubclassSubclassFeature.init(
    {
        subclassSubclassFeatureId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'subclassSubclassFeature',
        sequelize: db
    }
);

class RaceFeatureSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

RaceFeatureSpell.init(
    {
        raceFeatureSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'raceFeatureSpell',
        sequelize: db
    }
);

class SubraceFeatureSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubraceFeatureSpell.init(
    {
        subraceFeatureSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'subraceFeatureSpell',
        sequelize: db
    }
);

class ClassFeatureSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

ClassFeatureSpell.init(
    {
        classFeatureSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'classFeatureSpell',
        sequelize: db
    }
);

class SubclassFeatureSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubclassFeatureSpell.init(
    {
        cubclassFeatureSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'subclassFeatureSpell',
        sequelize: db
    }
);

class CharacterClass extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterClass.init(
    {
        characterClassId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterClass',
        sequelize: db
    }
);

class CharacterSubclass extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterSubclass.init(
    {
        characterSubclassId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterSubclass',
        sequelize: db
    }
);

class CharacterFeat extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterFeat.init(
    {
        characterFeatId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterFeat',
        sequelize: db
    }
);

class CharacterReaction extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterReaction.init(
    {
        characterReactionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterReaction',
        sequelize: db
    }
);

class CharacterSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterSpell.init(
    {
        characterSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterSpell',
        sequelize: db
    }
);

class CharacterPreparedSpell extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterPreparedSpell.init(
    {
        characterPreparedSpellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterPreparedSpell',
        sequelize: db
    }
);

class CharacterClassFeatureChoice extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterClassFeatureChoice.init(
    {
        characterClassFeatureChoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterClassFeatureChoice',
        sequelize: db
    }
);

class CharacterSubclassFeatureChoice extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

CharacterSubclassFeatureChoice.init(
    {
        characterSubclassFeatureChoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'characterSubclassFeatureChoice',
        sequelize: db
    }
);

class ClassFeatureClassFeatureChoice extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

ClassFeatureClassFeatureChoice.init(
    {
        classFeatureClassFeatureChoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'classFeatureClassFeatureChoice',
        sequelize: db
    }
);

class SubclassFeatureSubclassFeatureChoice extends Model {
    [util.inspect.custom](){
        return this.toJSON();
    };
};

SubclassFeatureSubclassFeatureChoice.init(
    {
        subclassFeatureSubclassFeatureChoiceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        modelName: 'subclassFeatureSubclassFeatureChoice',
        sequelize: db
    }
);

// Table relation definitions:
User.hasMany(Character, {foreignKey: 'userId'});
Character.belongsTo(User, {foreignKey: 'userId'});

Character.belongsTo(Race, {foreignKey: 'raceId'});
Race.hasMany(Character, {foreignKey: 'raceId'});

Character.hasOne(CharacterHas, {foreignKey: 'characterId'});
CharacterHas.belongsTo(Character, {foreignKey: 'characterId'});

Race.hasMany(Subrace, {foreignKey: 'raceId'});
Subrace.belongsTo(Race, {foreignKey: 'raceId'});

Character.belongsTo(Subrace, {foreignKey: 'subraceId'});
Subrace.hasMany(Character, {foreignKey: {name: 'subraceId', allowNull: true}});

Character.belongsToMany(Class, {through: CharacterClass, foreignKey: 'characterId'});
Class.belongsToMany(Character, {through: CharacterClass, foreignKey: 'classId', onDelete: 'CASCADE', hooks: true});

Character.belongsToMany(Subclass, {through: CharacterSubclass, foreignKey: 'characterId'});
Subclass.belongsToMany(Character, {through: CharacterSubclass, foreignKey: 'subclassId', onDelete: 'CASCADE', hooks: true});

Class.hasMany(Subclass, {foreignKey: 'classId'});
Subclass.belongsTo(Class, {foreignKey: 'classId'});

Character.belongsTo(Background, {foreignKey: 'backgroundId'});
Background.hasMany(Character, {foreignKey: 'backgroundId'});

Class.belongsToMany(ClassFeature, {through: ClassClassFeature, foreignKey: 'classId'});
ClassFeature.belongsToMany(Class, {through: ClassClassFeature, foreignKey: 'classFeatureId'});

ClassFeature.hasOne(HasAccess, {foreignKey: 'classFeatureId'});
HasAccess.belongsTo(ClassFeature, {foreignKey: 'classFeatureId'});

ClassFeature.belongsToMany(ClassFeatureChoice, {through: ClassFeatureClassFeatureChoice, foreignKey: 'classFeatureId'});
ClassFeatureChoice.belongsToMany(ClassFeature, {through: ClassFeatureClassFeatureChoice, foreignKey: 'classFeatureId'});

Character.belongsToMany(ClassFeatureChoice, {through: CharacterClassFeatureChoice, foreignKey: 'characterId'});
ClassFeatureChoice.belongsToMany(Character, {through: CharacterClassFeatureChoice, foreignKey: 'classFeatureChoiceId', onDelete: 'CASCADE', hooks: true});

Subclass.belongsToMany(SubclassFeature, {through: SubclassSubclassFeature, foreignKey: 'subclassId'});
SubclassFeature.belongsToMany(Subclass, {through: SubclassSubclassFeature, foreignKey: 'subclassFeatureId'});

SubclassFeature.hasOne(HasAccess, {foreignKey: 'subclassFeatureId'});
HasAccess.belongsTo(SubclassFeature, {foreignKey: 'subclassFeatureId'});

SubclassFeature.belongsToMany(SubclassFeatureChoice, {through: SubclassFeatureSubclassFeatureChoice, foreignKey: 'subclassFeatureId'});
SubclassFeatureChoice.belongsToMany(SubclassFeature, {through: SubclassFeatureSubclassFeatureChoice, foreignKey: 'subclassFeatureId'});

Character.belongsToMany(SubclassFeatureChoice, {through: CharacterSubclassFeatureChoice, foreignKey: 'characterId'});
SubclassFeatureChoice.belongsToMany(Character, {through: CharacterSubclassFeatureChoice, foreignKey: 'subclassFeatureChoiceId', onDelete: 'CASCADE', hooks: true});

Race.hasMany(RaceFeature, {foreignKey: 'raceId'});
RaceFeature.belongsTo(Race, {foreignKey: 'raceId'});

Subrace.hasMany(SubraceFeature, {foreignKey: 'subraceId'});
SubraceFeature.belongsTo(Subrace, {foreignKey: 'subraceId'});

Character.belongsToMany(Feat, {through: CharacterFeat, foreignKey: 'characterId'});
Feat.belongsToMany(Character, {through: CharacterFeat, foreignKey: 'featId', onDelete: 'CASCADE', hooks: true});

Character.belongsToMany(Reaction, {through: CharacterReaction, foreignKey: 'characterId'});
Reaction.belongsToMany(Character, {through: CharacterReaction, foreignKey: 'reactionId', onDelete: 'CASCADE', hooks: true});

Character.belongsToMany(Spell, {through: CharacterSpell, foreignKey: 'characterId'});
Spell.belongsToMany(Character, {through: CharacterSpell, foreignKey: 'spellId', onDelete: 'CASCADE', hooks: true});

Race.belongsToMany(Spell, {through: RaceSpell, foreignKey: 'raceId'});
Spell.belongsToMany(Race, {through: RaceSpell, foreignKey: 'spellId'});

RaceFeature.belongsToMany(Spell, {through: RaceFeatureSpell, foreignKey: 'raceFeatureId'});
Spell.belongsToMany(RaceFeature, {through: RaceFeatureSpell, foreignKey: 'spellId'});

Class.belongsToMany(Spell, {through: ClassSpell, foreignKey: 'classId'});
Spell.belongsToMany(Class, {through: ClassSpell, foreignKey: 'spellId'});

ClassFeature.belongsToMany(Spell, {through: ClassFeatureSpell, foreignKey: 'classFeatureId'});
Spell.belongsToMany(ClassFeature, {through: ClassFeatureSpell, foreignKey: 'spellId'});

Subrace.belongsToMany(Spell, {through: SubraceSpell, foreignKey: 'subraceId'});
Spell.belongsToMany(Subrace, {through: SubraceSpell, foreignKey: 'spellId'});

SubraceFeature.belongsToMany(Spell, {through: SubraceFeatureSpell, foreignKey: 'subraceFeatureId'});
Spell.belongsToMany(SubraceFeature, {through: SubraceFeatureSpell, foreignKey: 'spellId'});

Subclass.belongsToMany(Spell, {through: SubclassSpell, foreignKey: 'subclassId'});
Spell.belongsToMany(Subclass, {through: SubclassSpell, foreignKey: 'spellId'});

SubclassFeature.belongsToMany(Spell, {through: SubclassFeatureSpell, foreignKey: 'subclassFeatureId'});
Spell.belongsToMany(SubclassFeature, {through: SubclassFeatureSpell, foreignKey: 'spellId'});

Feat.belongsToMany(Spell, {through: FeatSpell, foreignKey: 'featId'});
Spell.belongsToMany(Feat, {through: FeatSpell, foreignKey: 'spellId'});

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync({force: true});
    console.log('Finished syncing database.');
};

export {
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
};