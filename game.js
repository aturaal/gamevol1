import * as PIXI from 'pixi.js';


const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

app.loader
    .add('tileset', 'https://nethackwiki.com/mediawiki/images/4/4b/X11tiles-32-32.png')
    .load(createWorld);

function createWorld() {
    const world = new PIXI.Container();
    app.stage.addChild(world);

    const tilesetTexture = app.loader.resources.tileset.texture;

    const tileSize = 32;

    const worldData = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    for (let y = 0; y < worldData.length; y++) {
        for (let x = 0; x < worldData[y].length; x++) {
            const tileType = worldData[y][x];

            // Only create a sprite for non-empty tiles
            if (tileType !== 0) {
                const tile = new PIXI.Sprite(
                    new PIXI.Texture(tilesetTexture, new PIXI.Rectangle(tileType * tileSize, 0, tileSize, tileSize))
                );

                tile.x = x * tileSize;
                tile.y = y * tileSize;

                world.addChild(tile);
            }
        }
    }
}
