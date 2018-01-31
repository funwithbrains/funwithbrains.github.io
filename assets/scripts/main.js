window.requirejs.config({
  paths: {
    "underscore": "lib/underscore",
  }
});

require(['lib/index'], (lib) => {
  window.lib = lib;

  const { _, ko, saveAs, Persist } = lib;

  const store = new Persist.Store('DungeonsAndDragons4eCharacterSheets');
  const ids = _.filter(JSON.parse(store.get('_ids'))) || [];
  console.log(ids);
  const insertId = (id) => {
    if (!id || _.contains(ids, id)) { return; }

    ids.push(id);
    store.set('_ids', JSON.stringify(ids));
  };
  const removeId = (id) => {
    if (!id) { return; }

    store.set('_ids', JSON.stringify(
      _.filter(ids, (otherId) => id !== otherId)
    ));
  };
  const createId = () => `${Date.now()}|${Math.random()}`;
  var latestId = store.get('_latestId') || null;

  const createObservable = (model, options) => {
    if (_.isFunction(options)) {
      return ko.pureComputed(options, model);
    } else {
      return ko.observable(options);
    }
  };
  const createModel = (modelDescriptor) => {
    return _.reduce(modelDescriptor, (model, options, key) => {
      model[key] = createObservable(model, options);
      return model;
    }, {});
  };

  const fillModel = (model, valueDict) => {
    _.each(valueDict, (value, key) => {
      if (ko.isWritableObservable(model[key])) {
        model[key](value);
      }
    });
  };

  const half = v => Math.floor(v / 2);

  const getArmorCheckPenalty = (skill) => {
    const modName = skill.modName();
    return (modName === 'strMod' || modName === 'dexMod' || modName === 'conMod') ? skill.character().armorCheckPenalty() : 0; 
  };
  const skillDescriptor = {
    character: null,
    name: '',
    modName: '',
    isTrained: false,
    misc: 0,
    value: function () {
      var character = this.character();
      return half(character.level()) + getArmorCheckPenalty(this) + this.misc() + character[this.modName()]() + (this.isTrained() ? 5 : 0);
    }
  };
  const skillToJSON = function () {
    return _.omit(this, 'character');
  };
  var createSkill = function (character, options) {
    var skill = createModel(skillDescriptor);
    skill.character(character);
    _.each(options, function (value, key) {
      skill[key](value);
    });
    skill.toJSON = skillToJSON;
    return skill;
  };

  const skills = [{
    name: 'Acrobatics',
    modName: 'dexMod'
  }, {
    name: 'Arcana',
    modName: 'intMod'
  }, {
    name: 'Athletics',
    modName: 'strMod'
  }, {
    name: 'Bluff',
    modName: 'chaMod'
  }, {
    name: 'Diplomacy',
    modName: 'chaMod'
  }, {
    name: 'Dungeoneering',
    modName: 'wisMod'
  }, {
    name: 'Endurance',
    modName: 'conMod'
  }, {
    name: 'Heal',
    modName: 'wisMod'
  }, {
    name: 'History',
    modName: 'intMod'
  }, {
    name: 'Insight',
    modName: 'wisMod'
  }, {
    name: 'Intimidate',
    modName: 'chaMod'
  }, {
    name: 'Nature',
    modName: 'wisMod'
  }, {
    name: 'Perception',
    modName: 'wisMod'
  }, {
    name: 'Religion',
    modName: 'intMod'
  }, {
    name: 'Stealth',
    modName: 'dexMod'
  }, {
    name: 'Streetwise',
    modName: 'chaMod'
  }, {
    name: 'Thievery',
    modName: 'dexMod'
  }];

  const characterDescriptor = {
    playerName: '',
    name: '',
    race: '',
    level: 1,
    'class': '',
    paragonPath: '',
    epicDestiny: '',
    experience: 0,
    size: '',
    languages: '',
    age: 0,
    gender: '',
    height: '',
    weight: '',
    alignment: '',
    deity: '',
    actionPoints: 0,

    initiative: function () {
      return this.dexMod() + half(this.level()) + this.miscInitiative();
    },
    miscInitiative: 0,
    
    speed: function () {
      return this.baseSpeed() + this.armorSpeedBonus() + this.itemSpeedBonus() + this.miscSpeedBonus();
    },
    baseSpeed: 0,
    armorSpeedBonus: 0,
    itemSpeedBonus: 0,
    miscSpeedBonus: 0,
    
    str: 0,
    strMod: function () { return half(this.str() - 10); },
    strCheck: function () { return this.strMod() + half(this.level()); },

    con: 0,
    conMod: function () { return half(this.con() - 10); },
    conCheck: function () { return this.conMod() + half(this.level()); },

    dex: 0,
    dexMod: function () { return half(this.dex() - 10); },
    dexCheck: function () { return this.dexMod() + half(this.level()); },
    
    int: 0,
    intMod: function () { return half(this.int() - 10); },
    intCheck: function () { return this.intMod() + half(this.level()); },
    
    wis: 0,
    wisMod: function () { return half(this.wis() - 10); },
    wisCheck: function () { return this.wisMod() + half(this.level()); },
    
    cha: 0,
    chaMod: function () { return half(this.cha() - 10); },
    chaCheck: function () { return this.chaMod() + half(this.level()); },
    
    ac: function () {
        var modifier = this.isWearingHeavyArmor() ? 0 : Math.max(this.dexMod(), this.intMod());
        
        return 10 + half(this.level()) + this.armorAC() + this.shieldAC() + this.classAC() + this.featAC() + this.enhancementAC() + this.miscAC() + modifier;
    },
    isWearingHeavyArmor: false,
    armorAC: 0,
    shieldAC: 0,
    classAC: 0,
    featAC: 0,
    enhancementAC: 0,
    miscAC: 0,
    
    fort: function () {
        return 10 + half(this.level()) + this.classFort() + this.featFort() + this.enhancementFort() + this.miscFort() + Math.max(this.strMod(), this.conMod());
    },
    classFort: 0,
    featFort: 0,
    enhancementFort: 0,
    miscFort: 0,
    
    ref: function () {
        return 10 + half(this.level()) + this.classRef() + this.featRef() + this.enhancementRef() + this.miscRef() + Math.max(this.dexMod(), this.intMod());
    },
    classRef: 0,
    featRef: 0,
    enhancementRef: 0,
    miscRef: 0,
    
    will: function () {
      return 10 + half(this.level()) + this.classWill() + this.featWill() + this.enhancementWill() + this.miscWill() + Math.max(this.wisMod(), this.chaMod());
    },
    classWill: 0,
    featWill: 0,
    enhancementWill: 0,
    miscWill: 0,
    
    maxHP: function () {
      return this.classBaseHP() + this.con() + this.miscHPBonus() + this.classHPPerLevel() * (this.level() - 1);
    },
    classBaseHP: 0,
    classHPPerLevel: 0,
    miscHPBonus: 0,
    bloodiedHP: function () {
      return half(this.maxHP());
    },
    surgeValue: function () {
      return half(half(this.maxHP()));
    },
    surges: 0,
    surgesPerDay: function () {
      return this.classBaseSurgesPerDay() + this.conMod();
    },
    classBaseSurgesPerDay: 0,
    currentHP: 0,
    
    armorCheckPenalty: 0,
    skills: function () {
      var character = this;
      return _.map(skills, (options) => createSkill(character, options));
    },
    
    raceFeatures: '',
    classFeatures: '',
    feats: '',
    
    atWillPowers: '',
    encounterPowers: '',
    dailyPowers: '',
    utilityPowers: '',
    inventory: '',
    
    notes: ''
  };
  const createCharacter = () => {
    const character = createModel(characterDescriptor);
    character._id = null; // Do not save.
    return character;
  };

  const character = ko.observable(createCharacter());

  const setCharacter = (character) => {
    const id = character._id;
    if (latestId !== id) {
      latestId = id;
      store.set('_latestId', latestId);
    }

    var characterModel = model.character();
    characterModel._id = id;
    fillModel(characterModel, character);

    var modelSkills = characterModel.skills(); 
    _.each(character.skills, (skill, i) => {
      fillModel(modelSkills[i], skill);
    });
  };

  const model = {
    character,
    saveCharacter: () => {
      const json = ko.toJSON(character);
      saveAs(new Blob([json]), 'character.json');
    },
    characterFiles: ko.observable(),
    loadCharacter: (blob) => {
      if (!blob) { return; }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        const character = JSON.parse(fileReader.result);
        if (!character._id) {
          character._id = createId();
        }
        setCharacter(character);
      };
      fileReader.readAsText(blob);
    }
  };

  const firstCharacter = latestId && JSON.parse(store.get(latestId));
  if (firstCharacter) {
    setCharacter(firstCharacter);
  }

  const updateStorage = _.debounce(() => {
    const characterModel = model.character();
    const id = characterModel._id;
    if (!id) { return; }

    const characterJSON = ko.toJSON(characterModel);
    insertId(id);
    store.set(id, characterJSON);
    console.log(id);
  }, 1000);

  ko.computed(() => {
    ko.toJSON(model.character); // Subscribe to everything serialized.
    updateStorage();
  });

  ko.applyBindings(model);
});
