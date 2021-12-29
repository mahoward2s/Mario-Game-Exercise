kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
})


loadRoot('https://i.imgur.com/')

loadSprite('coin', 'wbKxhcd.png')
loadSprite('goomba', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('fireFlower', 'uaUm9sN.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipeTopLeft', 'ReTPiWY.png')
loadSprite('pipeTopRight', 'hj2GK4n.png')
loadSprite('pipeBottomLeft', 'c1cYSbt.png')
loadSprite('pipeBottomRight', 'nqQ79eI.png')

scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = [
        '                                      ',
        '                                      ',
        '                                      ',
        '                                      ',
        '                                      ',
        '      %   =*=%=                       ',
        '                                      ',
        '                            -+        ',
        '                     ^  ^   ()        ',
        '==============================   =====',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin')],
        '%': [sprite('surprise'), solid(), 'coinSurprise'],
        '*': [sprite('surprise'), solid(), 'mushroomSurprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipeBottomLeft'), solid(), scale(0.5)],
        ')': [sprite('pipeBottomRight'), solid(), scale(0.5)],
        '-': [sprite('pipeTopLeft'), solid(), scale(0.5)],
        '+': [sprite('pipeTopRight'), solid(), scale(0.5)],
        '^': [sprite('goomba'), solid()],
        '#': [sprite('goomba'), solid()],
    }

    const gameLevel = addLevel(map, levelCfg)

    const scoreLabel = add([
        text('test'),
        pos(30, 6),
        layer('ui'),
        {
            value: 'test',
        }
    ])

    add([
        text('level' + 'test', pos(4, 6))])

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        origin('bot')
    ])

    keyDown('left', () => {

    })

})

start("game")