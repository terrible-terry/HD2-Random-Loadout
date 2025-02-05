import { Equipment, Stratagem } from "./classes.js";

export const stratagems = [];

async function logStratagems() {
  const data = [
    {
      name: "APW-1 Anti-Materiel Rifle",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_RIGHT", "C_UP", "C_DOWN"],
      iconPath: "./assets/Strat_icons/SUPPLY (1).png",
      AT: "M2",
    },
    {
      name: "MD-6 Anti-Personnel Minefield",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_LEFT", "C_UP", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (5).png",
      AT: "M1",
    },
    {
      name: "ARC-3 Arc Thrower",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_RIGHT", "C_DOWN", "C_UP", "C_LEFT", "C_LEFT"],
      iconPath: "./assets/Strat_icons/SUPPLY (9).png",
      AT: "H3",
    },
    {
      name: "AC-8 Autocannon",
      isAdvanced: true,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_DOWN", "C_UP", "C_UP", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/SUPPLY (3).png",
      AT: "M2",
    },
    {
      name: "A/AC-8 Autocannon Sentry",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_UP", "C_LEFT", "C_UP"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (1).png",
      AT: "H1",
    },
    {
      name: "SH-20 Ballistic Shield Backpack",
      isAdvanced: true,
      type: "Backpack",
      sequence: ["C_DOWN", "C_LEFT", "C_DOWN", "C_DOWN", "C_UP", "C_LEFT"],
      iconPath: "./assets/Strat_icons/SUPPLY (4).png",
      AT: false,
    },
    {
      name: "A/M-23 EMS Mortar Sentry",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_DOWN", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (7).png",
      AT: false,
    },
    {
      name: "Eagle 110MM Rocket Pods",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_UP", "C_LEFT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (1).png",
      AT: "H2",
    },
    {
      name: "Eagle 500kg Bomb",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_DOWN", "C_DOWN", "C_DOWN"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (2).png",
      AT: "H3",
    },
    {
      name: "Eagle Airstrike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_DOWN", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (4).png",
      AT: "H1",
    },
    {
      name: "Eagle Cluster Bomb",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_DOWN", "C_DOWN  C_RIGHT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (3).png",
      AT: "H1",
    },
    {
      name: "Eagle Napalm Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_DOWN", "C_UP"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (6).png",
      AT: "H1",
    },

    {
      name: "Orbiatal Napalm Barrage",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_DOWN", "C_LEFT", "C_RIGHT", "C_UP"],
      iconPath: "./assets/Orbital_Napalm_Barrage_Stratagem_Icon.png",
      AT: "H1",
    },

    {
      name: "Eagle Smoke Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_UP", "C_DOWN"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (5).png",
      AT: false,
    },
    {
      name: "Eagle Strafing Run",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_UP", "C_RIGHT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (7).png",
      AT: "H1",
    },
    {
      name: "EAT-17 Expendable Anti-tank",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_DOWN", "C_LEFT", "C_UP", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/SUPPLY (2).png",
      AT: "H2",
    },
    {
      name: "FLAM-40 Flamethrower",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_UP", "C_DOWN", "C_UP"],
      iconPath: "./assets/Strat_icons/CLASS (3).png",
      AT: "M1",
    },
    {
      name: "A/G-16 Gatling Sentry",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_LEFT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (2).png",
      AT: "M1",
    },
    {
      name: "GL-21 Grenade Launcher",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_UP", "C_LEFT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/CLASS (4).png",
      AT: false,
    },
    {
      name: "AX/AR-23 Guard Dog",
      isAdvanced: true,
      type: "Backpack",
      sequence: ["C_DOWN", "C_UP", "C_LEFT", "C_UP", "C_RIGHT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/SUPPLY (8).png",
      AT: "L2",
    },
    {
      name: "AX/LAS-5 Guard Dog Rover",
      isAdvanced: true,
      type: "Backpack",
      sequence: ["C_DOWN", "C_UP", "C_LEFT", "C_UP", "C_RIGHT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/SUPPLY (7).png",
      AT: "L2",
    },
    {
      name: "MG-206 Heavy Machine Gun",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_UP", "C_DOWN", "C_DOWN"],
      iconPath: "./assets/Heavy_Machine_Gun_Stratagem_Icon.png",
      AT: "M2",
    },
    {
      name: "E/MG-101 HMG Emplacement",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_LEFT", "C_RIGHT", "C_RIGHT", "C_LEFT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (11).png",
      AT: "M2",
    },
    {
      name: "MD-I4 Incendiary Mines",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_LEFT", "C_LEFT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (4).png",
      AT: false,
    },
    {
      name: "MD-8 Gas Mines",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_LEFT", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/Gas_Minefield_Stratagem_Icon.png",
      AT: false,
    },
    
    {
      name: "LIFT-850 Jump Pack",
      isAdvanced: true,
      type: "Backpack",
      sequence: ["C_DOWN", "C_UP", "C_UP", "C_DOWN", "C_UP"],
      iconPath: "./assets/Strat_icons/SUPPLY (10).png",
      AT: false,
    },
    {
      name: "LAS-98 Laser Cannon",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_DOWN", "C_UP", "C_LEFT"],
      iconPath: "./assets/Strat_icons/SUPPLY (6).png",
      AT: "M2",
    },
    {
      name: "MG-43 Machine Gun",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_DOWN", "C_UP", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/CLASS (6).png",
      AT: "M1",
    },
    {
      name: "A/MG-43 Machine Gun Sentry",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_RIGHT", "C_UP"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (6).png",
      AT: "M1",
    },
    {
      name: "A/M-12 Mortar Sentry",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_RIGHT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (8).png",
      AT: "M1",
    },
    {
      name: "Orbital 120MM HE Barrage",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_DOWN", "C_LEFT", "C_RIGHT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (9).png",
      AT: "H3",
    },
    {
      name: "Orbital 380MM HE Barrage",
      isAdvanced: false,
      type: "Offensive",
      sequence: [
        "C_RIGHT",
        "C_DOWN",
        "C_UP",
        "C_UP",
        "C_LEFT",
        "C_DOWN",
        "C_DOWN",
      ],
      iconPath: "./assets/Strat_icons/OFFENSIVE (10).png",
      AT: "H4",
    },
    {
      name: "Orbital Airburst Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (14).png",
      AT: "M1",
    },
    {
      name: "Orbital EMS Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_LEFT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (12).png",
      AT: false,
    },
    {
      name: "Orbital Gas Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_DOWN", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (16).png",
      AT: "H3",
    },
    {
      name: "Orbital Gatling Barrage",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_DOWN", "C_LEFT", "C_UP", "C_UP"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (15).png",
      AT: "H1",
    },
    {
      name: "Orbital Laser",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_DOWN", "C_UP", "C_RIGHT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (17).png",
      AT: "H2",
    },
    {
      name: "Orbital Precision Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_UP"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (8).png",
      AT: "H4",
    },
    {
      name: "Orbital Railcannon Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_UP", "C_DOWN", "C_DOWN", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (18).png",
      AT: "H6",
    },
    {
      name: "Orbital Smoke Strike",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_RIGHT", "C_DOWN", "C_UP"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (13).png",
      AT: false,
    },
    {
      name: "Orbital Walking Barrage",
      isAdvanced: false,
      type: "Offensive",
      sequence: ["C_RIGHT", "C_DOWN", "C_RIGHT", "C_DOWN", "C_RIGHT", "C_DOWN"],
      iconPath: "./assets/Strat_icons/OFFENSIVE (11).png",
      AT: "H4",
    },
    {
      name: "LAS-99 Quasar Cannon",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_DOWN", "C_UP", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/Quasar_Cannon_Stratagem_Icon.png",
      AT: "H2",
    },
    {
      name: "RS-422 Railgun",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_RIGHT", "C_DOWN", "C_UP", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/CLASS (1).png",
      AT: "H3",
    },
    {
      name: "GR-8 Recoilless Rifle",
      isAdvanced: true,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_RIGHT", "C_RIGHT", "C_LEFT"],
      iconPath: "./assets/Strat_icons/SUPPLY (17).png",
      AT: "H2",
    },
    {
      name: "A/MLS-4X Rocket Sentry",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_RIGHT", "C_LEFT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (9).png",
      AT: "H1",
    },
    {
      name: "SH-32 Shield Generator Pack",
      isAdvanced: true,
      type: "Backpack",
      sequence: ["C_DOWN", "C_UP", "C_LEFT", "C_RIGHT", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/SUPPLY (5).png",
      AT: false,
    },
    {
      name: "FX-12 Shield Generator Relay",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_DOWN", "C_LEFT", "C_RIGHT", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (3).png",
      AT: false,
    },
    {
      name: "FAF-14 SPEAR Launcher",
      isAdvanced: true,
      type: "Support",
      sequence: ["C_DOWN", "C_DOWN", "C_UP", "C_DOWN", "C_DOWN"],
      iconPath: "./assets/Strat_icons/SUPPLY (13).png",
      AT: "H4",
    },
    {
      name: "M-105 Stalwart",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", "C_DOWN", "C_UP", "C_UP", "C_LEFT"],
      iconPath: "./assets/Strat_icons/CLASS (7).png",
      AT: "L2",
    },
    {
      name: "B-1 Supply Pack",
      isAdvanced: true,
      type: "Backpack",
      sequence: ["C_DOWN", "C_LEFT", "C_DOWN", "C_UP", "C_UP", "C_DOWN"],
      iconPath: "./assets/Strat_icons/SUPPLY (16).png",
      AT: false,
    },
    {
      name: "A/ARC-3 Tesla Tower",
      isAdvanced: false,
      type: "Defensive",
      sequence: ["C_DOWN", "C_UP", "C_RIGHT", "C_UP", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/DEFENSIVE (10).png",
      AT: "M2",
    },
    {
      name: "EXO-45 Patriot Exosuit",
      isAdvanced: false,
      type: "Support",
      sequence: [
        "C_LEFT",
        "C_DOWN",
        "C_RIGHT",
        "C_UP",
        "C_LEFT",
        "C_DOWN",
        "C_DOWN",
      ],
      iconPath: "./assets/Strat_icons/SUPPLY (19).png",
      AT: "H2",
    },
    {
      name: "M-102 Reconnaissance Vehicle",
      isAdvanced: false,
      type: "Support",
      sequence: [
        "C_LEFT",
        "C_DOWN",
        "C_RIGHT",
        "C_DOWN",
        "C_RIGHT",
        "C_DOWN",
        "C_UP",

      ],
      iconPath: "./assets/M-102_Fast_Recon_Vehicle_Stratagem_Icon.png",
      AT: false,
    },
    {
      name: "RL-77 Airburst Rocket Launcher",
      isAdvanced: true,
      type: "Support",
      sequence: ["C_DOWN", "C_UP", "C_UP", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/RL-77_Airburst_Rocket_Launcher_Stratagem_Icon.png",
      AT: "M1",
    },
    {
      name: "StA-X3 W.A.S.P. Launcher",
      isAdvanced: true,
      type: "Support",
      sequence: ["C_DOWN", "C_UP", "C_UP", "C_LEFT", "C_RIGHT"],
      iconPath: "./assets/StA-X3_W.A.S.P._Launcher_Stratagem_Icon.png",
      AT: "H2",
    },
    {
      name: "MLS-4X Commando",
      isAdvanced: false,
      type: "Support",
      sequence: ["C_DOWN", "C_LEFT", , "C_UP", "C_DOWN", "C_RIGHT"],
      iconPath: "./assets/Strat_icons/MLS-4X.png",
      AT: "H2",
    },
    {
      name: "EXO-49 Emancipator",
      isAdvanced: false,
      type: "Support",
      sequence: [
        "C_LEFT",
        "C_DOWN",
        "C_RIGHT",
        "C_UP",
        "C_LEFT",
        "C_DOWN",
        "C_UP",
      ],
      iconPath:
        "https://static.wikia.nocookie.net/helldivers_gamepedia/images/d/d7/EXO-49_Emancipator_Exosuit_Icon.png",
      AT: "H1",
    },
  ];

  const C_LEFT = "\u{1F880}";
  const C_RIGHT = "\u{1F882}";
  const C_UP = "\u{1F881}";
  const C_DOWN = "\u{1F883}";
  const sequenceMap = {
    C_LEFT: C_LEFT,
    C_RIGHT: C_RIGHT,
    C_UP: C_UP,
    C_DOWN: C_DOWN,
  };

  data.forEach((strat) => {
    const sequence = strat.sequence.map((direction) => sequenceMap[direction]);
    stratagems.push(
      new Stratagem(
        strat.name,
        strat.isAdvanced,
        strat.type,
        sequence.join(" "),
        strat.iconPath,
        strat.AT
      )
    );
  });
}
logStratagems();

/*
      new Equipment(
        "StA-52 Assault Rifle",
        "Primary",
        "Assault Rifle",
        "super",
        "./assets/StA-52_Assault_Rifle_Primary_Weaponry.png"
      ),
      new Equipment(
        "PLAS-39 Accelerator Rifle",
        "Primary",
        "Sniper Rifle",
        "super",
        "./assets/PLAS-39_Accelerator_Rifle_Primary_Weaponry.png"
      ),
            new Equipment(
        "StA-11 SMG",
        "Primary",
        "SMG",
        "super",
        "./assets/StA-11_SMG_Primary_Weaponry.png"
      ),
      new Equipment(
        "AC-1 Dutiful",
        "Armor",
        "Medium",
        "super",
        "./assets/AC-1_Dutiful_Body_Armory.png"
      ),


      new Equipment(
        "AC-2 Obedient",
        "Armor",
        "Light",
        "super",
        "./assets/AC-2_Obedient_Body_Armory.png"
      ),



 */
export const warbonds = {
  steeled: {
    name: "Steeled Veterans",
    stratagems:[],
    primary: [
      new Equipment(
        "AR23C-Liberator CONC",
        "Primary",
        "Assault Rifle",
        "steeled",
        "./assets/AR-23C_Liberator_Concussive_Weapon_Icon.png"
      ),
      new Equipment(
        "SG-225IE Breaker INC",
        "Primary",
        "Shotgun",
        "steeled",
        "./assets/SG-225IE_Breaker_Incendiary_Weapon_Icon.png"
      ),
      new Equipment(
        "JAR-5 Dominator",
        "Primary",
        "Explosive",
        "steeled",
        "./assets/JAR-5_Dominator_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "P-4 Senator",
        "Secondary",
        "Pistol",
        "steeled",
        "./assets/P-4_Senator_Weapon_Icon.png"
      ),
    ],
    grenade: [
      new Equipment(
        "G-10 Incendiary",
        "Grenade",
        "",
        "steeled",
        "./assets/G-10_Incendiary_Grenade_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "SA-12 Servo Assisted",
        "Armor",
        "Medium",
        "steeled",
        "./assets/300px-SA-12_Servo_Assisted_Armor_Icon.png"
      ),
      new Equipment(
        "SA-25 Steel Trooper",
        "Armor",
        "Medium",
        "steeled",
        "./assets/300px-SA-25_Steel_Trooper_Armor_Icon.png"
      ),
      new Equipment(
        "SA-32 Dynamo",
        "Armor",
        "Medium",
        "steeled",
        "./assets/300px-SA-32_Dynamo_Armor_Icon.png"
      ),
    ],
    booster: [
      new Stratagem(
        "Flexible Reinforcement Budget",
        false,
        "booster",
        "steeled",
        "./assets/50px-Flexible_Reinforcement_Budget_Booster_Icon.png"
      ),
    ],
  },
  cutting: {
    name: "Cutting Edge",
    stratagems:[],
    primary: [
      new Equipment(
        "LAS-16 Sickle",
        "Primary",
        "Energy",
        "cutting",
        "./assets/LAS-16_Sickle_Weapon_Icon.png"
      ),
      new Equipment(
        "ARC-12 Blitzer",
        "Primary",
        "Energy",
        "cutting",
        "./assets/ARC-12_Blitzer_Weapon_Icon.png"
      ),
      new Equipment(
        "SG-8P Plasma",
        "Primary",
        "Energy",
        "cutting",
        "./assets/SG-8P_Punisher_Plasma_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "LAS-7 Dagger",
        "Secondary",
        "Pistol Energy",
        "cutting",
        "./assets/LAS-7_Dagger_Weapon_Icon.png"
      ),
    ],
    grenade: [
      new Equipment(
        "G-23 Stun",
        "Grenade",
        "",
        "cutting",
        "./assets/G-23_Stun_Grenade_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "EX-03 Prototype 3",
        "Armor",
        "Medium",
        "cutting",
        "./assets/300px-EX-03_Prototype_3_Armor_Icon.png"
      ),
      new Equipment(
        "EX-16 Prototype 16",
        "Armor",
        "Medium",
        "cutting",
        "./assets/300px-EX-16_Prototype_16_Armor_Icon.png"
      ),
      new Equipment(
        "EX-00 Prototype X",
        "Armor",
        "Medium",
        "cutting",
        "./assets/300px-EX-00_Prototype_X_Armor_Icon.png"
      ),
    ],
    booster: [
      new Stratagem(
        "Localization Confusion",
        false,
        "booster",
        "cutting",
        "./assets/50px-Localization_Confusion_Booster_Icon.png"
      ),
    ],
  },
  democratic: {
    name: "Democratic Detonation",
    stratagems:[],
    primary: [
      new Equipment(
        "BR-14 Adjudicator",
        "Primary",
        "Energy",
        "democratic",
        "./assets/BR-14_Adjudicator_Weapon_Icon.png"
      ),
      new Equipment(
        "R-36 Eruptor",
        "Primary",
        "Energy",
        "democratic",
        "./assets/R-36_Eruptor_Weapon_Icon.png"
      ),
      new Equipment(
        "CB-9 Exploding Crossbow",
        "Primary",
        "Energy",
        "democratic",
        "./assets/CB-9_Exploding_Crossbow_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "GP-31 Grenade Pistol",
        "Secondary",
        "Pistol Explosive",
        "democratic",
        "./assets/GP-31_Grenade_Pistol_Weapon_Icon.png"
      ),
    ],
    grenade: [
      new Equipment(
        "G-123 Thermite",
        "Grenade",
        "",
        "democratic",
        "./assets/G-123_Thermite_Grenade_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "CE-27 Ground Breaker",
        "Armor",
        "Medium",
        "democratic",
        "./assets/300px-CE-27_Ground_Breaker_Armor_Icon.png"
      ),
      new Equipment(
        "CE-07 Demolition Specialist",
        "Armor",
        "Light",
        "democratic",
        "./assets/300px-CE-07_Demolition_Specialist_Armor_Icon.png"
      ),
      new Equipment(
        "FS-55 Devastator",
        "Armor",
        "Heavy",
        "democratic",
        "./assets/300px-FS-55_Devastator_Armor_Icon.png"
      ),
    ],
    booster: [
      new Stratagem(
        "Expert Extraction Pilot",
        false,
        "booster",
        "democratic",
        "./assets/50px-Expert_Extraction_Pilot_Booster_Icon.png"
      ),
    ],
  },
  polar: {
    name: "Polar Patriots",
    stratagems:[],
    primary: [
      new Equipment(
        "AR-61 Tenderizer",
        "Primary",
        "Energy",
        "polar",
        "./assets/AR-61_Tenderizer_Weapon_Icon.png"
      ),
      new Equipment(
        "SMG-72 Pummeler",
        "Primary",
        "Energy",
        "polar",
        "./assets/SMG-72_Pummeler_Weapon_Icon.png"
      ),
      new Equipment(
        "PLAS-101 Purifier",
        "Primary",
        "Energy",
        "polar",
        "./assets/PLAS-101_Purifier_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "P-113 Verdict",
        "Secondary",
        "Pistol Explosive",
        "polar",
        "./assets/P-113_Verdict_Weapon_Icon.png"
      ),
    ],
    grenade: [
      new Equipment(
        "G-13 Incindiary Impact",
        "Grenade",
        "",
        "polar",
        "./assets/G-13_Incendiary_Impact_Grenade_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "CW-4 Artic Ranger",
        "Armor",
        "Light",
        "polar",
        "./assets/300px-CW-4_Arctic_Ranger_Armor_Icon.png"
      ),
      new Equipment(
        "CW-22 Kodiak",
        "Armor",
        "Heavy",
        "polar",
        "./assets/CW-22_Kodiak_Armor_Icon.png"
      ),
      new Equipment(
        "CW-36 Winter Warrior",
        "Armor",
        "Medium",
        "polar",
        "./assets/CW-36_Winter_Warrior_Armor_Icon.png"
      ),
    ],
    booster: [
      new Stratagem(
        "Motivational Shocks",
        false,
        "booster",
        "polar",
        "./assets/130px-Motivational_Shocks_Booster_Icon.png"
      ),
    ],
  },
  commando: {
    name: "Viper Commandos",
    stratagems:[],
    primary: [
      new Equipment(
        "AR-23A Liberator Carbine",
        "Primary",
        "Energy",
        "commando",
        "./assets/AR-23A_Liberator_Carbine_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "SG-22 Bushwhacker",
        "Secondary",
        "Shotgun",
        "commando",
        "./assets/SG-22_Bushwhacker_Weapon_Icon.png"
      ),
    ],
    grenade: [
      new Equipment(
        "K-2 Throwing Knife",
        "Grenade",
        "",
        "commando",
        "./assets/K-2_Throwing_Knife_Throwable_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "PH-9 Predator",
        "Armor",
        "Light",
        "commando",
        "./assets/300px-PH-9_Predator_Armor_Icon.png"
      ),
      new Equipment(
        "PH-202 Twigsnapper",
        "Armor",
        "Light",
        "commando",
        "./assets/PH-202_Twigsnapper_Armor_Icon.png"
      ),
    ],
    booster: [
      new Stratagem(
        "Experimental Infusion",
        false,
        "booster",
        "commando",
        "./assets/130px-Experimental_Infusion_Booster_Icon.png"
      ),
    ],
  },
  flame: {
    name: "Freedoms Flame",
    stratagems:[],
    primary: [
      new Equipment(
        "SG-451 Cookout",
        "Primary",
        "Shotgun",
        "flame",
        "./assets/SG-451_Cookout_Weapon_Icon.png"
      ),
      new Equipment(
        "Flam-66 Torcher",
        "Primary",
        "Special",
        "flame",
        "./assets/FLAM-66_Torcher_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "P-72 Crisper",
        "Secondary",
        "Flame",
        "flame",
        "./assets/P-72_Crisper_Weapon_Icon.png"
      ),
    ],
    grenade: [],
    armor: [
      new Equipment(
        "I-09 Heatseeker",
        "Armor",
        "Light",
        "flame",
        "./assets/I-09_Heatseeker_Armor_Icon.png"
      ),
      new Equipment(
        "I-102 Draconaught",
        "Armor",
        "Medium",
        "flame",
        "./assets/I-102_Draconaught_Armor_Icon.png"
      ),
    ],
    booster: [
      new Stratagem(
        "Firebomb Hellpods",
        false,
        "booster",
        "flame",
        "./assets/Firebomb_Hellpods_Booster_Icon.png"
      ),
    ],
  },
  chem: {
    name: "Chemical Agents",
    primary: [],
    secondary: [      new Equipment(
      "P-11 Stim Pistol",
      "Grenade",
      "Flame",
      "chem",
      "./assets/P-11_Stim_Pistol_Weapon_Icon.png"
    ),],
    grenade: [

      new Equipment(
        "G4 Gas Grenade",
        "Grenade",
        "Gas",
        "chem",
        "./assets/G-4-Gas_Grenade_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "AF-02 Haz-Master",
        "Armor",
        "Medium",
        "chem",
        "./assets/AF-02_Haz-Master_Armor_Icon.png"
      ),
      new Equipment(
        "AF-50 Noxious Ranger",
        "Armor",
        "Light",
        "chem",
        "./assets/AF-50_Noxious_Ranger_Armor_Icon.png"
      ),
    ],
    booster: [
    ],
    stratagems:[      new Stratagem(
      "TX-41 Sterilizer",
      false,
      "Support",
      "chem",
      "./assets/Sterilizer_Stratagem_Icon.png"
    ),
    new Stratagem(
      "AX/TX-13 “Guard Dog” Dog Breath",
      true,
      "Support",
      "chem",
      "./assets/Guard_Dog_Dog_Breath_Stratagem_Icon.png"
    ),],
  },
  truth: {
    name: "Truth Enforcers",
    primary: [new Equipment(
      "SMG-32 Reprimand",
      "Primary",
      "Smg",
      "truth",
      "./assets/320px-SMG-32_Reprimand_Weapon_Icon.png"
    ),new Equipment(
      "SG-20 Halt",
      "Primary",
      "Shotgun",
      "truth",
      "./assets/SG-20_Halt_Weapon_Icon.png"
    )],
    secondary: [
      new Equipment(
      "PLAS-15 Loyalist",
      "Secondary",
      "Truth",
      "truth",
      "./assets/320px-PLAS-15_Loyalist_Weapon_Icon.png"
    ),],
    grenade: [
    ],
    armor: [
    ],
    booster: [
    ],
    stratagems:[],
  },
  urban: {
    name: "Urban Legends",
    primary: [],
    secondary: [
      new Equipment(
      "CQC-19 Stun Lance",
      "Secondary",
      "Urban",
      "urban",
      "./assets/CQC-19_Stun_Lance_Secondary_Weaponry.png"
    ),],
    grenade: [
    ],
    armor: [
      new Equipment(
        "SR-24 Street Scout",
        "Armor",
        "Light",
        "urban",
        "./assets/SR-24_Street_Scout_Body_Armory.png"
      ),
      new Equipment(
        "SR-18 roadblock",
        "Armor",
        "Heavy",
        "urban",
        "./assets/SR-18_Roadblock_Body_Armory.png"
      )
    ],
    booster: [
      new Stratagem(
        "Armed Resupply Pods",
        false,
        "booster",
        "urban",
        "./assets/130px-Experimental_Infusion_Booster_Icon.png"
      ),
    ],
    stratagems:[new Stratagem(
      "A/Flam-40 Sentry",
      false,
      "Defensive",
      "urban",
      "./assets/A_FLAM-40_Flame_Sentry_Stratagem_Icon.png"
    ),new Stratagem(
      "E/AT-12 Anti-Tank Emplacement",
      false,
      "Defensive",
      "urban",
      "./assets/E_AT-12_Anti-Tank_Emplacement_Stratagem_Icon.png"
    ),new Stratagem(
      "Directional Shield",
      false,
      "Support",
      "urban",
      "./assets/SH-51_Directional_Shield_Stratagem_Icon.png"
    )
  
  ],
  },
  super: {
    name: "Super Citizen",
    stratagems:[],
    primary: [
      new Equipment(
        "MP-98 Knight",
        "Primary",
        "SubMachine Gun",
        "super",
        "./assets/MP-98_Knight_Weapon_Icon.png"
      ),
    ],
    secondary: [],
    grenade: [],
    armor: [
      new Equipment(
        "DP-53 Saviour",
        "Armor",
        "Medium",
        "default",
        "./assets/DP-53_Savior_of_the_Free_Armor_Icon.png"
      ),
    ],
    booster: [],
  },
  default: {
    name: "Helldivers Mobilize",
    stratagems:[],
    primary: [
      new Equipment(
        "AR23-Liberator",
        "Primary",
        "Assault Rifle",
        "default",
        "./assets/AR-23_Liberator_Weapon_Icon.png"
      ),
      new Equipment(
        "AR23P-Liberator PEN",
        "Primary",
        "Assault Rifle",
        "default",
        "./assets/AR-23P_Liberator_Penetrator_Weapon_Icon.png"
      ),
      new Equipment(
        "R-63 Diligence",
        "Primary",
        "Marksman Rifle",
        "default",
        "./assets/R-63_Diligence_Weapon_Icon.png"
      ),
      new Equipment(
        "R-63CS Diligence CS",
        "Primary",
        "Marksman Rifle",
        "default",
        "./assets/R-63CS_Diligence_Counter_Sniper_Weapon_Icon.png"
      ),
      new Equipment(
        "LAS-5 Scythe",
        "Primary",
        "Energy",
        "default",
        "./assets/LAS-5_Scythe_Weapon_Icon.png"
      ),
      new Equipment(
        "PLAS-1 Scorcher",
        "Primary",
        "Energy",
        "default",
        "./assets/PLAS-1_Scorcher_Weapon_Icon.png"
      ),
      new Equipment(
        "SG-8 Punisher",
        "Primary",
        "Shotgun",
        "default",
        "./assets/SG-8_Punisher_Weapon_Icon.png"
      ),
      new Equipment(
        "SG-225 Breaker",
        "Primary",
        "Shotgun",
        "default",
        "./assets/SG-225_Breaker_Weapon_Icon.png"
      ),
      new Equipment(
        "SG-8S Slugger",
        "Primary",
        "Shotgun",
        "default",
        "./assets/SG-8S_Slugger_Weapon_Icon.png"
      ),
      new Equipment(
        "SG-225SP Breaker SNP",
        "Primary",
        "Shotgun",
        "default",
        "./assets/SG-225SP_Breaker_Spray_Pray_Weapon_Icon.png"
      ),
      new Equipment(
        "SMG-37 Defender",
        "Primary",
        "SMG",
        "default",
        "./assets/SMG-37_Defender_Weapon_Icon.png"
      ),
    ],
    secondary: [
      new Equipment(
        "P-2 Peacemaker",
        "Secondary",
        "Pistol",
        "default",
        "./assets/P-2_Peacemaker_Weapon_Icon.png"
      ),
      new Equipment(
        "P-19 Redeemer",
        "Secondary",
        "Pistol",
        "default",
        "./assets/P-19_Redeemer_Weapon_Icon.png"
      ),
    ],
    grenade: [
      new Equipment(
        "G-3 Smoke",
        "Grenade",
        "",
        "default",
        "./assets/G-3_Smoke_Grenade_Icon.png"
      ),
      new Equipment(
        "G-6 Frag",
        "Grenade",
        "",
        "default",
        "./assets/G-6_Frag_Grenade_Icon.png"
      ),
      new Equipment(
        "G-12 HE",
        "Grenade",
        "",
        "default",
        "./assets/G-12_High_Explosive_Grenade_Icon.png"
      ),
      new Equipment(
        "G-16 Impact",
        "Grenade",
        "",
        "default",
        "./assets/G-16_Impact_Grenade_Icon.png"
      ),
    ],
    armor: [
      new Equipment(
        "B-01 Tactical",
        "Armor",
        "Medium",
        "default",
        "./assets/B-01_Tactical_Armor_Icon.png"
      ),
      new Equipment(
        "B-08 Light Gunner",
        "Armor",
        "Medium",
        "default",
        "./assets/B-08_Light_Gunner_Armor_Icon.png"
      ),
      new Equipment(
        "B-27 Fortified Commando",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-B-27_Fortified_Commando_Armor_Icon.png"
      ),
      new Equipment(
        "B-24 Enforcer",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-B-24_Enforcer_Armor_Icon.png"
      ),
      new Equipment(
        "CE-35 Trench Engineer",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-CE-35_Trench_Engineer_Armor_Icon.png"
      ),
      new Equipment(
        "CE-74 Breaker",
        "Armor",
        "Medium",
        "default",
        "./assets/CE-74_Breaker_Armor_Icon.png"
      ),
      new Equipment(
        "CE-81 Juggernaut",
        "Armor",
        "Medium",
        "default",
        "./assets/CE-81_Juggernaut_Armor_Icon.png"
      ),
      new Equipment(
        "CM-09 Bonesnapper",
        "Armor",
        "Medium",
        "default",
        "./assets/CM-09_Bonesnapper_Armor_Icon.png"
      ),
      new Equipment(
        "CM-10 Clinician",
        "Armor",
        "Medium",
        "default",
        "./assets/CM-10_Clinician_Armor_Icon.png"
      ),
      new Equipment(
        "CM-14 Physician",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-CM-14_Physician_Armor_Icon.png"
      ),
      new Equipment(
        "CM-21 Trench Paramedic",
        "Armor",
        "Medium",
        "default",
        "./assets/CM-21_Trench_Paramedic_Armor_Icon.png"
      ),
      new Equipment(
        "DP-11 Champion",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-DP-11_Champion_of_the_People_Armor_Icon.png"
      ),
      new Equipment(
        "DP-40 Hero",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-DP-40_Hero_of_the_Federation_Armor_Icon.png"
      ),

      new Equipment(
        "FS-05 Marksman",
        "Armor",
        "Medium",
        "default",
        "./assets/FS-05_Marksman_Armor_Icon.png"
      ),
      new Equipment(
        "FS-11 Executioner",
        "Armor",
        "Medium",
        "default",
        "./assets/FS-11_Executioner_Armor_Icon.png"
      ),
      new Equipment(
        "FS-34 Exterminator",
        "Armor",
        "Medium",
        "default",
        "./assets/FS-34_Exterminator_Armor_Icon.png"
      ),
      new Equipment(
        "FS-37 Ravager",
        "Armor",
        "Medium",
        "default",
        "./assets/FS-37_Ravager_Armor_Icon.png"
      ),
      new Equipment(
        "FS-38 Eradicator",
        "Armor",
        "Medium",
        "default",
        "./assets/FS-38_Eradicator_Armor_Icon.png"
      ),
      new Equipment(
        "SA-04 Combat Technician",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-SA-04_Combat_Technician_Armor_Icon.png"
      ),
      new Equipment(
        "SC-30 Trailblazer",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-SC-30_Trailblazer_Scout_Armor_Icon.png"
      ),
      new Equipment(
        "SC-34 Infiltrator",
        "Armor",
        "Medium",
        "default",
        "./assets/300px-SC-34_Infiltrator_Armor_Icon.png"
      ),
      new Equipment(
        "SC-37 Legionnaire",
        "Armor",
        "Medium",
        "default",
        "./assets/SC-37_Legionnaire_Armor_Icon.png"
      ),
    ],

    booster: [
      new Stratagem(
        "Vitality Enhancement",
        false,
        "booster",
        "default",
        "./assets/50px-Vitality_Enhancement_Booster_Icon.png"
      ),
      new Stratagem(
        "Stamina Enhancement",
        false,
        "booster",
        "default",
        "./assets/50px-Stamina_Enhancement_Booster_Icon.png"
      ),
      new Stratagem(
        "Muscle Enhancement",
        false,
        "booster",
        "default",
        "./assets/50px-Muscle_Enhancement_Booster_Icon.png"
      ),
      new Stratagem(
        "UAV Recon Booster",
        false,
        "booster",
        "default",
        "./assets/50px-UAV_Recon_Booster_Booster_Icon.png"
      ),
      new Stratagem(
        "Increased Reinforcement Budget",
        false,
        "booster",
        "default",
        "./assets/50px-Increased_Reinforcement_Budget_Booster_Icon.png"
      ),
      new Stratagem(
        "Hellpod Space Optimization",
        false,
        "booster",
        "default",
        "./assets/50px-Hellpod_Space_Optimization_Booster_Icon.png"
      ),
    ],
  },
};
