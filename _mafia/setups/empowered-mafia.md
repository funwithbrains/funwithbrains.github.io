---
title: "Empowered Mafia"
type: setup
order: 20
---

All of life is a power struggle. But don't you wish the struggle could be more complicated?

Now it can!

About one fifth of the population is Empowerers. Each other player has a special power which only functions at night when they have been targeted by an empowerer that same night.

----

### Resolving Powers

Everyone chooses their night plan at the same time.

First, Empowerers are resolved.

Next all empowered Amplifiers are resolved.

Next, all other empowered roles are resolved.

However, there is an exception: The Incarceration ability will resolve during the last phase, but this ability can retroactively prevent a prior action from having resolved! If this would create a paradox, such as a Jailkeeper targeting an Empowerer who targeted them, then the later-resolving ability fails to take effect, in this case the Incarceration. In this example, it will then appear as if the Jailkeeper did not target anyone during the night in question.

----

## The Factions

* The Mafia
  * Strongman
  * Kidnapper
  * Ninja
  * Serial Bomber
* The Town
  * Empowerer
  * Amplifier
  * Doctor
  * Jailkeeper
  * Cop
  * Tracker
  * Watcher
  * Vigilante
  * Bomb

The Mafia wins when their numbers equal or exceed the Town's.

The Town wins when there is at most one Mafia member, as long as the Mafia does not win at the same time.

----

## The Mafia

### Factional Abilities

* **Murder**: Once per night, you may choose a member of your faction. That member chooses a target player. At the end of the night, the chosen member of your faction kills their target. The public will be told that this is a shooting-type killing.
* **Meeting**: You have private communication with all members of your faction.
* **Awareness**: At the start of the game, you will be told how many of each role is present in the game.

**You win when your numbers equal or exceed the Town's numbers.**

### Roles

> #### Strongman
> 
> No puny Doctor can fix the kind of damage you dish out. No walls can protect your target. You are a Strongman!
>
> * **Obliteration**: Whenever you use the Murder ability on a player, all abilities fail to prevent the killing effect of that Murder ability.

> #### Kidnapper
>
> You keep people off the streets at night. You are a Kidnapper!
>
> * **Incarceration**: Once per night, you may choose a target player. Your target's actions are cancelled that night, and they cannot be killed that night. *(This does not prevent passive abilities from taking effect, such as Detonation.)*

> #### Ninja
> 
> You move unseen in the night. You are a Ninja!
>
> * **Invisibility**: Whenever you take any action, you may choose for that action to be unobservable.
> * **Adaptability**: Once per game, during the night, you may use Obliteration or Incarceration as if you were a Strongman or Kidnapper. If you are empowered that night, then you may use Adaptability again on subsequent nights as if you have not already used it. You will be told when Adaptability ceases to be available. *(After your first time using this ability on a night where you are not empowered, it will become unusable for the rest of the game.)*

> #### Serial Bomber
> 
> You want people to target you so that they self-destruct. You are a Serial Bomber!
>
> * **Detonation**: Whenever you are empowered, each player who targets you that night is killed. The public will be told that this is an explosion-type killing. *(This ability does not require you to die, nor does it kill you.)*

----

## The Town

### Factional Abilities

* **Lynch**: Once per day, you must lynch one player or select No Lynch.

**You win when only one member of the Mafia remains, as long as at least two of you survive.**

### Roles

> #### Empowerer
>
> You decide who gets to use their powers at night. You are an Empowerer!
>
> * **Empower**: Once per night, you may choose a target player. Your target is empowered that night.

> #### Amplifier
>
> You decide who gets to use their powers, but only if you are chosen to use your power. You are an Amplifier!
>
> * **Amplify**: Once per night, you may choose two target players. If you are empowered, then each target is empowered that night.

> #### Doctor
>
> You protect the weak and preserve life. You are a Doctor!
>
> * **Protection**: Once per night, you may choose a target player. If you are empowered, then if your target would be killed that night, instead they are not.

> #### Jailkeeper
>
> You keep people off the streets at night. You are a Jailkeeper!
>
> * **Incarceration**: Once per night, you may choose a target player. If you are empowered, then your target's actions are cancelled that night, and they cannot be killed that night. *(This does not prevent passive abilities from taking effect, such as Detonation.)*

> #### Cop
>
> You snoop into people's backgrounds, looking for crooks. You are a Cop!
>
> * **Investigation**: Once per night, you may choose a target player. If you are empowered, then at the start of the next day, you will learn your target's alignment.

> #### Tracker
>
> You follow people at night to see where they're going. You are a Tracker!
>
> * **Tracking**: Once per night, you may choose a target player. If you are empowered, then at the start of the next day, you will be told whom your target targeted the previous night.

> #### Watcher
>
> You watch people at night to see who comes to them. You are a Watcher!
>
> * **Stakeout**: Once per night, you may choose a target player. If you are empowered, then at the start of the next day, you will be told who targeted your target the previous night.

> #### Vigilante
>
> You're kind of completely unstable, but you mean well. You're a Vigilante!
>
> * **Murder**: Once per night, you may choose a target player. If you are empowered, then at the end of the night, you kill your target. The public will be told that this is a shooting-type killing.

> #### Bomb
>
> You're completely unstable. You're a Bomb!
>
> * **Detonation**: Whenever a player kills you, if you are empowered, then you kill that player. The public will be told that this is an explosion-type killing.

----

## Game Settings

* General
  * Unanimous Realtime Mode
* Day
  * 72-Hour Deadline
  * Anti-Town Random Tiebreak
* Night
  * 24-Hour Deadline

----

## Assigning Roles

Let P be the number of players.

Randomly select floor(P/5) players to be mafia, minimum of 2.

Allow the mafia to communicate before the first day phase, to select their own roles. Each mafia player's role is chosen by that player. Duplicate roles are permitted.

Randomly select floor(P/5) players to be empowerers, minimum of 2.

Let R be the number of players not assigned mafia or Empowerer roles.

Create the smallest possible list of the remaining roles, including each role the same number of times and including each role at least twice, such that the length of this list is strictly greater than R. Shuffle this list. Assign roles to the remaining players in order from the start of this list.
