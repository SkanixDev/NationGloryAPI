# NationGlory API

A simple API for Minecraft Server: NationGlory

# Examples

**Parameters**

```JS
/**
* 		@param {string} player - Player Name.
* 		@param {string} dimension - Dimension of image (max: 100px, min: 16).
*/
```

**fetchSkinPlayer**\
_Get player's head image_

```JS

fetchSkinPlayer(player, 16).then(v => console.log(v));
//https://skins.nationsglory.fr/face/player/16
```

**getPlayer**\
_Get player's informations_

```JS

getPlayer(player).then(v => console.log(v));
/*
{
    name: 'Skanix',
    description: 'My Description',
    skin: 'https://skins.nationsglory.fr/face/Skanix/16',
    servers: [
    {
        server: 'blue',
        playing_time: 'Invalid date',
        rank: 'Joueur',
        reputation: 'Bonne',
        country: 'Pas de pays',
    }
        country_rank: 'Pas de rang',
        powers: '10/25'
    },
    {
        server: 'orange',
        playing_time: '06:18:00',
        rank: 'Joueur',
        reputation: 'Bonne',
        country: 'Panama',
        country_rank: 'Recrue',
        powers: '10/25'
    },
    ... (all server)
}
*/
```
