kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
})

const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
const FALL_DEATH = 400
let CURRENT_JUMP_FORCE = JUMP_FORCE
let isJumping = true


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

loadSprite('blueBlock', 'fVscIbn.png')
loadSprite('blueBrick', '3e5YRQd.png')
loadSprite('blueSteel', 'gqVoI2b.png')
loadSprite('blueGoomba', 'SvV4ueD.png')
loadSprite('blueSurprise', 'RMqCc1G.png')


scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [
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
        ],
        [
            '&                                      &',
            '&                                      &',
            '&                                      &',
            '&                                      &',
            '&                                      &',
            '&         @@@@@@               x x     &',
            '&                            x x x     &',
            '&     x                    x x x x   -+&',
            '&     x        z       z x x x x x   ()&',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coinSurprise'],
        '*': [sprite('surprise'), solid(), 'mushroomSurprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipeBottomLeft'), solid(), scale(0.5), 'pipe'],
        ')': [sprite('pipeBottomRight'), solid(), scale(0.5), 'pipe'],
        '-': [sprite('pipeTopLeft'), solid(), scale(0.5)],
        '+': [sprite('pipeTopRight'), solid(), scale(0.5)],
        '^': [sprite('goomba'), solid(), 'dangerous'],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],
        '!': [sprite('blueBlock'), solid(), scale(0.5)],
        '&': [sprite('blueBrick'), solid(), scale(0.5)],
        'x': [sprite('blueSteel'), solid(), scale(0.5)],
        'z': [sprite('blueGoomba'), solid(), scale(0.5), 'dangerous'],
        '@': [sprite('blueSurprise'), solid(), scale(0.5), 'coinSurprise'],
    }

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([
        text('level ' + parseInt(level + 1)), pos(40, 6)])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])


    action('mushroom', (m) => {
        m.move(40, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('coinSurprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
        if (obj.is('mushroomSurprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    const ENEMY_SPEED = 20

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('dangerous', (d) => {
        if (isJumping) {
            destroy(d)
        } else {
            go('lose', { score: scoreLabel.value })
        }
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { score: scoreLabel.value })
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value
            })
        })
    })


    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(() => {
        if (player.grounded()) {
            isJumping = false
        }
    })

    keyPress('space', () => {
        if (player.grounded()) {
            isJumping = true
            player.jump(CURRENT_JUMP_FORCE)
        }
    })
})

scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start("game", ({ level: 0, score: 0 }))