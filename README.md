# Samurai Street Fighter Game

A 2D Two Player Fighting Game with local co-op support.

Built using HTML5 Canvas Element, JavaScript & GSAP for animations.

## Controls

Player 1 Controls

- Move Left: Press the A key.
- Move Right: Press the D key.
- Jump: Press the W key.
- Attack: Press the Spacebar key.

Player 2 Controls

- Move Left: Press the Left Arrow key.
- Move Right: Press the Right Arrow key.
- Jump: Press the Up Arrow key.
- Attack: Press the ; (semicolon) key.

## Gameplay

The objective is to reduce the opponent's health to zero before your own health reaches zero.

Each successful attack reduces the opponent's health by 25 points.
The game ends when either player's health reaches zero.

A timer is displayed, and if the time runs out, the player with the most health remaining is declared the winner.

## Future Features:

- [ ] Roll through attacks
- [ ] Music
- [ ] Narrator sounds
- [ ] Flip characters so they are always facing eachother
- [x] Players cannot go out of bounds
- [x] Single Jump only
- [x] Enemy/P2 attacks with `;`
- [x] Main game code within 'load' event listener
- [ ] Get username from react site for player1 name
- [x] Random backgrounds
- [ ] Animate backgrounds
- [ ] Seperate background images into layers and render seperately
- [ ] Make idle for both characters same speed
- [ ] Make it a best of 3 with win tracker under health bar
- [ ] Game over screen + pause game
- [ ] When both players moving in same direction move parallax bg
- [x] Refactor all switch statements to if-else
- [ ] Basic logic to mimic enemy AI
- [ ] Additional characters / character select
- [x] Add a cooldown on attack
- [x] Restart the game using Enter
- [x] Display restart game message
- [x] Cannot do damage on gameover

## Credits

Martial Hero 2 by [LuizMelo](https://luizmelo.itch.io/martial-hero-2)

Martial Hero by [LuizMelo](https://luizmelo.itch.io/martial-hero)
