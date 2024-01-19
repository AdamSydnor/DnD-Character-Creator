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
} from '../database/model.js';

await db.sync({force: true});

console.log('seeding database')

// Seed data:

// Human seed data:
let human = await Race.create({
    name: 'Human',
    description: 'The most common face to see in Faerûn, humans are known for their tenacity, creativity, and endless capacity for growth.'
});

let civilMilitia = await RaceFeature.create({
    name: 'Civil Militia',
    description: 'You gain proficiency in the following: Pikes, Spears, Halbards, Glaives, Light armor, and Shields.',
    level: 1
});

let humanVersatility = await RaceFeature.create({
    name: 'Human Versatility',
    description: 'You gain additional proficiency in a skill of your choosing, and your carrying capacity in increased by a quarter.',
    level: 1
});

// Elf seed data:
let elf = await Race.create({
    name: 'Elf',
    description: `Heirs of the mystical Feywild, high elves value magic in all its forms, and even those who do not study spellcraft can manipulate the Weave.`
});

let elvenWeaponTraining = await RaceFeature.create({
    name: 'Elven Weapon Training',
    description: 'You gain proficiency in the following: Longswords, Shortswords, Longbows, Shortbows'
});

let fayAncestry = await RaceFeature.create({
    name: 'Fay Ancestry',
    description: `You have advantage on saving throws agaist being charmed, and magic can't put you to sleep`
});

let raceDarkvision = await RaceFeature.create({
    name: 'Darkvision',
    description: 'You do not have disadvantage when attacking create in the dark for up to 12m.'
});

// Elf subrace seed data:
let woodElf = await elf.createSubrace({
    name: 'Wood Elf',
    description: `Wood elves spend their reclusive lives in Faerûn's forests. Decades of training in archery and camouflage are enhanced by an otherworldly swiftness.`
});

let fleetOfFoot = await SubraceFeature.create({
    name: 'Fleet Of Foot',
    description: `Your movement speed is increased by 1.5m.`
});

let maskOfTheWild = await SubraceFeature.create({
    name: 'Mask of the Wild',
    description: `You gain proficiency in stealth`
});

// Class feature choices seed data:

let defence = await ClassFeatureChoice.create({
    name: 'Defence',
    description: 'You gain a + 1 bonus to armor class while wearing armor.'
});

let dueling = await ClassFeatureChoice.create({
    name: 'Dueling',
    description: 'When you are wielding a melee weapon in one hand and no weapon in the other hand, you gain a +2 bonus to damage rolls with that weapon.'
});

let greatWeaponFighting = await ClassFeatureChoice.create({
    name: 'Great Weapon Fighting',
    description: 'When you roll a 1 or 2 on a damage die for an attack with a two-handed melee weapon, that die is rerolled once.'
});

let protection = await ClassFeatureChoice.create({
    name: 'Protection',
    description: 'When you have a shield, impose disadvantage on an enemy who attacks one of your allies when you are within 5ft. You must be able to see the enemy.'
});

let redDragon = await ClassFeatureChoice.create({
    name: 'Red (Fire)',
    description: 'Fire is the damage type associated with your dragon ancestor. Gain the spell Burning Hands.'
});

let blueDragon = await ClassFeatureChoice.create({
    name: 'Blue (Lightning)',
    description: 'Lightning is the damage type associated with your dragon ancestor. Gain the spell Witch Bolt.'
});

let distantSpell = await ClassFeatureChoice.create({
    name: 'Distant Spell',
    description: 'Increases the range of the spell by 50%.'
});

let twinnedSpell = await ClassFeatureChoice.create({
    name: 'Twinned Spell',
    description: 'Spells that only target 1 create can target an additional creature.'
});

let carefulSpell = await ClassFeatureChoice.create({
    name: 'Carefull Spell',
    description: 'Allies automatically succeed saving throws against spells that require them.'
});

// Paladin seed data:
let paladin = await Class.create({
    name: 'Paladin',
    description: 'A promise made so deeply that it becomes divine in itself flows through a paladin, burning bright enough to inspire allies and smite foes.',
    subclassAt: 1,
    spellsAt: 2,
    hp: 10,
    hpGain: 6
});

let paladinChargesOne = await ClassFeature.create({
    name: 'Lay On Hands and Channel Oath Charges',
    description: '+3 Lay of Hands charges, +1 Channel Oath charges.',
    level: 1
});

await ClassClassFeature.create({
    classId: paladin.classId,
    classFeatureId: paladinChargesOne.classFeatureId
});

let paladinSpellsOne = await ClassFeature.create({
    name: 'Spell Casting',
    description: 'You gain +2 level 1 spell slots and the ability to prepare up to a number of spells equal to you Paladin level + your charisma modifier.',
    level: 2,
});

await ClassClassFeature.create({
    classId: paladin.classId,
    classFeatureId: paladinSpellsOne.classFeatureId
});

await paladinSpellsOne.createHasAccess({
    spellSlotsOne: 2
});

let divineSense = await ClassFeature.create({
    name: 'Divine Sense',
    description: 'Tap into your spiritual awareness to gain advantage on attack rolls against celestials, fiends, and undead.',
    level: 1
});

await ClassClassFeature.create({
    classId: paladin.classId,
    classFeatureId: divineSense.classFeatureId
});

let layOnHands = await ClassFeature.create({
    name: 'Lay On Hands',
    description: 'Use your blessed touch to heal a creature or cure it of all diseases and poisons.',
    level: 1
});

await ClassClassFeature.create({
    classId: paladin.classId,
    classFeatureId: layOnHands.classFeatureId
});

let divineSmite = await ClassFeature.create({
    name: 'Divine Smite',
    description: 'Your weapon emanates divine might as you strike. When you hit with a melee weapon attack, you may choose to expend a spell slot to inflict additional radiant damage.',
    level: 2
});

await ClassClassFeature.create({
    classId: paladin.classId,
    classFeatureId: divineSmite.classFeatureId
});

let paladinFightingStyle = await ClassFeature.create({
    name: 'Fighting Style',
    description: 'You can choose a fighting style.',
    level: 2
});

await ClassClassFeature.create({
    classId: paladin.classId,
    classFeatureId: paladinFightingStyle.classFeatureId
});

// Paladin subclass 'Oath of the Ancients' seed data:
let oathOfTheAncients = await paladin.createSubclass({
    name: 'Oath of the Ancients',
    description: 'You fight on the side of light in the cosmic struggle against darkness to preserve the sanctity of life and the beauty of nature.'
});

let healingRadiance = await SubclassFeature.create({
    name: 'Healing Radiance',
    description: 'Heal yourself and all nearby allies for your proficiency bonus + paladin level + charisma modifier. Then again on your next turn.',
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: oathOfTheAncients.subclassId,
    subclassFeature: healingRadiance.subclassFeatureId
});

// Paladin subclass 'Oath of Devotion' seed data:
let oathOfDevotion = await paladin.createSubclass({
    name: 'Oath of Devotion',
    description: 'Following the ideal of the knight in shining armour, you act with honour and virtue to protect the weak and pursue the greater good.'
});

let holyRebuke = await SubclassFeature.create({
    name: 'Holy Rebuke',
    description: 'Call upon your Oath to grant a vengeful aura that deals 1d4 radiant damage to anyone who hits them with a melee attack.',
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: oathOfTheAncients.subclassId,
    subclassFeature: holyRebuke.subclassFeatureId
});

// Paladin subclass 'Oath of Vengeance' seed data:
let oathOfVengeance = await paladin.createSubclass({
    name: 'Oath of Vengeance',
    description: 'You have set aside even your own purity to right wrongs and deliver justice to those who have committed the most grievous sins.'
});

let inquisitorsMight = await SubclassFeature.create({
    name: `Inquisitor's Might`,
    description: `You or an ally's weapon attacks deal additional equal to your charisma modifier in radiant damage and can daze enemies for 1 turn.`,
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: oathOfTheAncients.subclassId,
    subclassFeature: inquisitorsMight.subclassFeatureId
});

// Paladin subclass 'Oathbreaker' seed data:
let oathbreaker = await paladin.createSubclass({
    name: 'Oathbreaker',
    description: 'You have broken your sacred Oath in pursuit of power and ambition. Only darkness remains to fuel you now.'
});

let spitefulSuffering = await SubclassFeature.create({
    name: 'Spiteful Suffering',
    description: 'Steep an enemy in the darkness that churns within you. The target takes 1d4 + your charisma modifier in necrotic damage each turn, and attack rolls against it have advantage.',
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: oathOfTheAncients.subclassId,
    subclassFeature: spitefulSuffering.subclassFeatureId
});

// Sorcerer seed data:
let sorcerer = await Class.create({
    name: 'Sorcerer',
    description: `Sorcerers are natural spellcasters, drawing on inherent magic from a gift or bloodline.`,
    subclassAt: 2,
    spellsAt: 1,
    hp: 6,
    hpGain: 4
});

let sorcererSpellsOne = await ClassFeature.create({
    name: 'Spell Casting',
    description: `You gain +2 level one spell slots, and can choose 4 cantrips and 2 Sorcerer spells.`,
    level: 1,
});

await ClassClassFeature.create({
    classId: sorcerer.classId,
    classFeatureId: sorcererSpellsOne.classFeatureId
});

await sorcererSpellsOne.createHasAccess({
    spellSlotsOne: 2,
    spells: 4,
    cantrips: 2
})

let sorcererSpellsTwo = await ClassFeature.create({
    name: 'Spell Casting',
    description: 'You gain an additional level 1 spell slot, as well as the ability to choose an additional sorcerer spell, and replace a spell you already know.',
    level: 2,
    spellIncrease: 1
});

await ClassClassFeature.create({
    classId: sorcerer.classId,
    classFeatureId: sorcererSpellsTwo.classFeatureId
});

await sorcererSpellsTwo.createHasAccess({
    spellSlotsOne: 1,
    spells: 1
});

let sorceryPointsOne = await ClassFeature.create({
    name: 'Sorcery Points',
    description: 'Sorcery points are the innate power of sorcerers. You can use these points to alter spells or gain spell slots. You now have 2 sorcery points, which recharge on a long rest.'
});

await ClassClassFeature.create({
    classId: sorcerer.classId,
    classFeatureId: sorceryPointsOne.classFeatureId
});

await sorceryPointsOne.createHasAccess({
    sorceryPoints: 2
});

let metamagicOne = await ClassFeature.create({
    name: 'Metamagic',
    description: 'You can choose 2 Metamagic options.'
});

await ClassClassFeature.create({
    classId: sorcerer.classId,
    classFeatureId: metamagicOne.classFeatureId
});

// Sorcerer subclass 'Wild Magic' seed data:
let wildMagic = await sorcerer.createSubclass({
    name: 'Wild Magic',
    description: `Your powers come from ancient forces of chaos. They churn within you -- waiting to burst free at any time.`
});

let wildMagicFeature = await SubclassFeature.create({
    name: 'Wild Magic',
    description: `Wild Magic stems from the forces of chaos. It churns within the sorcerers that wield it, waiting to burst free. Each time you cast a Spell of level 1 or higher, your magic might surge and trigger a random magical effect.`,
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: wildMagic.subclassId,
    subclassFeatureId: wildMagicFeature.subclassFeatureId
});

let tidesOfChaos = await SubclassFeature.create({
    name: 'Tides of Chaos',
    description: `Activate to gain advantage on your next attack roll, ability check or saving throw. Increased chance of Wild Magic surge afterwards.`,
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: wildMagic.subclassId,
    subclassFeatureId: tidesOfChaos.subclassFeatureId
});

// Sorcerer subclass 'Storm Sorcery' seed data:
let stormSorcery = await sorcerer.createSubclass({
    name: 'Storm Sorcery',
    description: `Whether crackling with the energy of ancient deluges or pierced by gales and hurricanes, your lineage is a strange tapestry scrawled by a tempest.`
});

let tempestuousMagic = await SubclassFeature.create({
    name: 'Tempestuous Magic',
    description: `After you cast a Level 1 Spell or higher you can fly as a bonus action until the end of your turn without receiving opportunity attacks. Doing so allows you to fly up to 9m.`,
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: stormSorcery.subclassId,
    subclassFeatureId: tempestuousMagic.subclassFeatureId
});

// Sorcerer subclass 'Draconic Bloodline' seed data:
let draconicBloodline = await sorcerer.createSubclass({
    name: 'Draconic Bloodline',
    description: `Your veins carry draconic magic, the result of a powerful dragon ancestor.`
});

let draconicResilience = await SubclassFeature.create({
    name: 'Draconic Resilience',
    description: `Dragon-like scales cover parts of your skin. When you aren't wearing armour, your base armour class is 13, and your maximum health increases by 1 for each sorcerer level.`,
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: draconicBloodline.subclassId,
    subclassFeatureId: draconicResilience.subclassFeatureId
});

let draconicAncestry = await SubclassFeature.create({
    name: 'Draconic Ancestry',
    description: `Choose an ancestry with which your blood burns.`,
    level: 1
});

await SubclassSubclassFeature.create({
    subclassId: draconicBloodline.subclassId,
    subclassFeatureId: draconicAncestry.subclassFeatureId
});

// Spell seed data:
let bless = await Spell.create({
    name: 'Bless',
    description: 'Bless up to 3 creatures. They gain a +1d4 bonus to attack rolls and saving throws.',
    level: 1,
    cantrip: false
});

await ClassSpell.create({
    classId: paladin.classId,
    spellId: bless.spellId
});

let cureWounds = await Spell.create({
    name: 'Cure Wounds',
    description: 'Heal a creature you can touch by 1d8 + your spellcasting modifier.',
    level: 1,
    cantrip: false
});

await ClassSpell.create({
    classId: paladin.classId,
    spellId: cureWounds.spellId
});

let searingSmite = await Spell.create({
    name: 'Searing Smite',
    description: 'Your weapon flares with white-hot intensity. It deals, on top of weapon damage, an extra 1d6 fire damage and marks the target with Searing Smite.',
    level: 1,
    cantrip: false
});

await ClassSpell.create({
    classId: paladin.classId,
    spellId: searingSmite.spellId
});

let fireBolt = await Spell.create({
    name: 'Fire Bolt',
    description: 'Hurl a mote of fire.',
    level: 1,
    cantrip: true
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: fireBolt.spellId
});

let light = await Spell.create({
    name: 'Light',
    description: 'Infuse an object with an aura of light. (Only affects one target at a time)',
    level: 1,
    cnatrip: true
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: light.spellId
});

let shockingGrasp = await Spell.create({
    name: 'Shocking Grasp',
    description: 'The targetcannot use reactions. this spell has advantage on creatures with metal armor.',
    level: 1,
    cantrip: true
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: shockingGrasp.spellId
});

let mageHand = await Spell.create({
    name: 'Mage Hand',
    description: 'Create a spectral hand that can manipulate and interact with objects. If will last for 10 turns.',
    level: 1,
    cantrip: true
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: mageHand.spellId
});

let friends = await Spell.create({
    name: 'Friends',
    description: 'Gain advantage on charisma checks against a non-hostile creature.',
    level: 1,
    cantrip: true
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: friends.spellId
});

let magicMissile = await Spell.create({
    name: 'Magic Missile',
    description: 'Create three darts of magical force, each dealing 1d4 + 1 force damage to its target. They can be targeted individually.',
    level: 1,
    cantrip: false
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: magicMissile.spellId
});

let chromaticOrb = await Spell.create({
    name: 'Chromatic Orb',
    description: 'Hurl a sphere of energy. It deals either 3d8 thunder damage, or 2d8 acid, cold, fire, lightning, or poison damage and creates a surface.',
    level: 1,
    cantrip: false
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: chromaticOrb.spellId
});

let shield = await Spell.create({
    name: 'Shield',
    description: 'When you are about to be hit by an enemy, use your Reaction to increase your armour class by 5. You also take no damage from magic missile. These effects last until the start of your next turn.',
    level: 1,
    cantrip: false
});

await ClassSpell.create({
    classId: sorcerer.classId,
    spellId: shield.spellId
});

// Skill seed data:
let insight = await Skill.create({
    name: 'Insight',
    description: 'Insight allows you to read people and situations, piercing through lies and other forms of deceit.'
});

let religion = await Skill.create({
    name: 'Religion',
    description: 'Religion encompasses knowledge about deities in the world of Abeir-Toril, including their domains, clergy, and holy rites.'
});

let deception = await Skill.create({
    name: 'Deception',
    description: 'Deception is the art of manipulating truth, allowing you to mislead others.'
});

let sleightOfHand = await Skill.create({
    name: 'Sleight of Hand',
    description: `Sleight of Hand improves manual dexterity, whether for picking someone's pocket or untying a rope around your wrists.`
});

// Background seed data:
let acolyte = await Background.create({
    name: 'Acolyte',
    description: `You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the god or gods you worship. Serving the gods and discovering their sacred works will guide you to greatness.`,
    skillOne: 'Insight',
    skillTwo: 'Religion'
});

let charlatan = await Background.create({
    name: 'Charlatan',
    description: `You're an expert in manipulation, prone to exaggeration and more than happy to profit from it. Bending the truth and turning allies against each other will lead to greater success down the road.`,
    skillOne: 'Deception',
    skillTwo: 'Sleight of Hand'
});

let folkHero = await Background.create({
    name: 'Folk Hero',
    description: `You're the champion of the common people, challenging tyrants and monsters to protect the helpless. Saving innocents in imminent danger will make your legend grow.`,
    skillOne: 'Animal Handleing',
    skillTwo: 'Survival'
});

let outlander = await Background.create({
    name: 'Outlander',
    description: `You grew up in the wilds, learning to survive far from the comforts of civilisation. Surviving unusual hazards of the wild will enhance your prowess and understanding.`,
    skillOne: 'Athletics',
    skillTwo: 'Survival'
})

// Seed data connections:

// User and character seeds:
let userOne = await User.create({
    username: 'user',
    email: 'user@email.com',
    password: 'password'
});

let characterOne = await userOne.createCharacter({
    name: 'Beep Boop',
    description: 'beeping and booping',
    img: '',
    money: 500,
    str: 10,
    dex: 15,
    con: 14,
    int: 12,
    wis: 15,
    cha: 8,
    skillOne: 'animal-handling',
    skillTwo: 'survival',
    raceId: 1
});

await CharacterClass.create({
    characterId: characterOne.characterId,
    classId: paladin.classId
});

let test = await Character.findOne({where: {name: 'Beep Boop'}, include: [Race, Class]});
let test2 = await Spell.findAll({include: {model: Class, where: {name: 'Paladin'}}});

await db.close();