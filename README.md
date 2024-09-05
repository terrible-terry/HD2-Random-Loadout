HellDivers 2 Random Loadout Generator
==============

<p align="center">
     <a href="https://terrible-terry.github.io/HD2-Random-Loadout/"><img width="80%" src="https://terrible-terry.github.io/HD2-Random-Loadout/screenshot.png"></a>
</p>

Originally copied from [hd2random](https://hd2random.com)
Improved Output to display Icons of loadout.
Added a minimum Anti-tank level selector for higher levels.


## Quick start

Clone to server and host, site will be prevented from working locally due to CORS.

## Data syntax
To Update source data edit src/content.js using the following format.

Stratagems
A Stratagem is a tactical action that players can utilize during gameplay. Stratagems generally have attributes such as name, type, advanced status, sequence of actions, icon path, and Highest Armor Penetration).

Adding a New Stratagem
To add a new stratagem to the stratagems array, you can follow this pattern:

```js
const newStratagem = new Stratagem(
    "Stratagem Name",               // The name of the stratagem
    false,                          // Has Backpack Component (true or false)
    "Type",                         // Type (e.g., "Support", "Defensive", "Offensive", "Booster", "Backpack")
    "C_UP C_RIGHT C_LEFT C_DOWN",   // Sequence of actions (use directional buttons)
    "./path/to/icon.png",           // Path to the icon for this stratagem
    "AT Value"                      // Highest Armor Penetraion (can be a string or false)
);

// Push the new stratagem to the array
stratagems.push(newStratagem);

```
Default Stratagems
The logStratagems function initializes default stratagems and should be called during the application startup. This function populates the stratagems array with predefined values, formatted accordingly.

Warbonds
Warbonds are collections of equipment categorized by various themes. Each warbond contains primary weapons, secondary weapons, grenades, armor, and boosters. If an there is not a item in a booster an empty array must still be passed.

Adding a New Warbond
To add a new warbond, you can follow this pattern. For example, to add a new warbond called "New Warbond":

```js
warbonds.new_warbond = {
    name: "New Warbond",
    primary: [
        new Equipment(
            "New Primary Weapon",
            "Primary",
            "Weapon Type",   // e.g., "Assault Rifle"
            "new_warbond",   // Identifier for this warbond
            "./path/to/icon.png"
        ),
    ],
    secondary: [
        new Equipment(
            "New Secondary Weapon",
            "Secondary",
            "Weapon Type",
            "new_warbond",
            "./path/to/icon.png"
        ),
    ],
    grenade: [
        new Equipment(
            "New Grenade",
            "Grenade",
            "",
            "new_warbond",
            "./path/to/icon.png"
        ),
    ],
    armor: [
        new Equipment(
            "New Armor",
            "Armor",
            "Armor Type",    // e.g., "Light", "Medium", "Heavy"
            "new_warbond",
            "./path/to/icon.png"
        ),
    ],
    booster: [
        new Stratagem(
            "New Booster",
            false,
            "booster",
            "new_warbond",
            "./path/to/icon.png"
        ),
    ],
};
```

Existing Warbonds
The library already includes several predefined warbonds categorized under themes such as "Steeled Veterans", "Cutting Edge", "Democratic Detonation", and more. You can view or modify these warbonds as needed.

