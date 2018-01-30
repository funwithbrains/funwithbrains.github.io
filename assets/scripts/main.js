window.requirejs.config({
    paths: {
        "underscore": "lib/underscore",
    }
});

require(['lib/index'], function (lib) {
    console.log('running main.js');
    window.lib = lib;
    
    var _ = lib._;
    var ko = lib.ko;
    
    var createObservable = function (model, options) {
        if (_.isFunction(options)) {
            return ko.pureComputed(options, model);
        } else {
            return ko.observable(options);
        }
    };
    var createModel = function (modelDescriptor) {
        return _.reduce(modelDescriptor, function (model, options, key) {
            model[key] = createObservable(model, options);
            return model;
        }, {});
    };
    
    var fillModel = function (model, valueDict) {
        _.each(valueDict, function (value, key) {
            if (ko.isWritableObservable(model[key])) {
                model[key](value);
            }
        });
    };
    
    var half = function (v) {
        return Math.floor(v / 2);
    };
    
    var getArmorCheckPenalty = function (skill) {
        var modName = skill.modName();
        return (modName === 'strMod' || modName === 'dexMod' || modName === 'conMod') ? skill.character().armorCheckPenalty() : 0; 
    };
    var skillDescriptor = {
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
    var skillToJSON = function () {
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
    
    var skills = [{
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

    var characterDescriptor = {
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
            return _.map(skills, function (options) {
                return createSkill(character, options);
            });
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
    var createCharacter = function () {
        return createModel(characterDescriptor);
    };

    var model = {
        character: ko.observable(createCharacter()),
        jsonInput: ko.observable(''),
        readJSONInput: function () {
            var jsonInput = model.jsonInput(); 
            if (jsonInput === '') { return; }

            console.log('reading JSON input');
            var objectInput = JSON.parse(jsonInput);
            var character = model.character();
            fillModel(character, objectInput);

            var skills = character.skills(); 
            _.each(objectInput.skills, function (skill, i) {
                fillModel(skills[i], skill);
            });

            model.jsonInput('');
        }
    };
    ko.applyBindings(model);
});
