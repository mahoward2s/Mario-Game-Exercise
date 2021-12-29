kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],
})


loadRoot('https://imgur.com/')
loadSprite('coin', 'wbKxhcd')
loadSprite('goomba', 'KPO3fR9')
loadSprite('brick', 'pogC9x5')
loadSprite('block', 'bdrLpi6')
loadSprite('mario', 'Wb1qfhK')
loadSprite('fireFlower', 'uaUm9sN')
loadSprite('mushroom', '0wMd92p')
loadSprite('suprise', 'gesQ1KP')
loadSprite('unboxed', 'bdrLpi6')
loadSprite('pipeTopLeft', 'ReTPiWY')
loadSprite('pipeTopRight', 'hj2GK4n')
loadSprite('pipeBottomLeft', 'c1cYSbt')
loadSprite('pipeBottomRight', 'nqQ79eI')

screen("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')




})

start("game")