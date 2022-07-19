    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        debug: true,
        background: [0, 0, 0, 1],
    })
    //globals
    var dialogOpen = false;

    // Constants
    const MOVE_SPEED = 120
    const dialog = function(message, player){
        dialogOpen = true
        /*var interval = setInterval(function(){
            var currCam = camPos();
            if(player.pos.y>currCam.y){
                currCam.y++
            }else if(player.pos.y<currCam.y){
                currCam.y--
            }
            if(player.pos.x>currCam.x){
                currCam.x++
            }else if(player.pos.x<currCam.x){
                currCam.x--
            }
            camPos(currCam)
        },1)*/
        camPos(player.pos.x, player.pos.y)
        const b = add([
            sprite('dialog'),
            origin('center'),
            pos(player.pos.x, player.pos.y),
        ])
        const t = add([
            text(message+'\n\n\nPress space to continue',{
                size: 12,
                width:300
            }),
            pos(player.pos.x, player.pos.y),
            origin('center')
        ])

        keyDown('space', ()=>{
            destroy(t)
            destroy(b)
            wait(1, ()=>{
                dialogOpen = false
                player.play('Idle')
//                clearInterval(interval)
            })
        })
    }
    //Load sprites
    loadRoot('assets/')
    loadSprite('left-wall', 'wall-left.png')
    loadSprite('left-wall', 'wall-left.png')
    loadSprite('top-wall', 'wall-top.png')
    loadSprite('bottom-wall', 'wall-bottom.png')
    loadSprite('right-wall', 'wall-right.png')
    loadSprite('bottom-left-wall', 'wall-bottom-left.png')
    loadSprite('bottom-right-wall', 'wall-bottom-right.png')
    loadSprite('bottom-left-inside-wall', 'wall-inside-bottom-left.png')
    loadSprite('bottom-right-inside-wall', 'wall-inside-bottom-right.png')
    loadSprite('top-left-inside-wall', 'wall-inside-top-left.png')
    loadSprite('top-right-inside-wall', 'wall-inside-top-right.png')
    loadSprite('top-left-wall', 'wall-top-left.png')
    loadSprite('top-right-wall', 'wall-top-right.png')
    loadSprite('top-door', 'door.png')
    loadSprite('explosion', 'explode.png')
    loadSprite('stairs-up', 'stairs-up.png')
    loadSprite('stairs-dn', 'stairs-dn.png')
    loadSprite('floor', 'floor.png')
    loadSprite('top-left-carpet', 'carpet-top-left.png')
    loadSprite('top-carpet', 'carpet-top.png')
    loadSprite('top-right-carpet', 'carpet-top-right.png')
    loadSprite('left-carpet', 'carpet-left.png')
    loadSprite('carpet', 'carpet.png')
    loadSprite('right-carpet', 'carpet-right.png')
    loadSprite('bottom-right-carpet', 'carpet-bottom-right.png')
    loadSprite('bottom-carpet', 'carpet-bottom.png')
    loadSprite('bottom-left-carpet', 'carpet-bottom-left.png')
    loadSprite('bed', 'bed.png')
    loadSprite('dialog', 'dialog.png')
    loadSprite('chair', 'chair.png')
    loadSprite('chair2', 'chair2.png')
    loadSprite('chair3', 'chair3.png')
    loadSprite('table', 'table.png')
    loadSprite('table2', 'table2.png')
    loadSprite('column', 'column.png')
    loadSprite('statue', 'statue.png')
    loadSprite('slime', 'slime.png', {
        sliceX: 3,
        sliceY: 3,
        anims: {
            idle: {
                from: 0,
                to: 0
            },
            pulse: {
                from: 0,
                to: 8
            },
        }
    })
    loadAseprite("doctor", "doctor.png", "doctor.json");
    loadAseprite('monmach', 'monmach.png', 'monmach.json')
    scene('game', ({
        level,
        startX,
        startY,
        newGame,
    }) => {
        layers(['bg', 'mg', 'fg', 'obj', 'ui'], 'obj')

        const maps = [
            [
                'yccccw',
                'akjikb',
                 'aqrrsb',
                'atuuvb',
                'aABBCb',
                'xgiihz',
                ' aiib ',
                ' a2ib ',
                ' aiib ',
                ' xddz  ',
            ],
            [
                '        yccw     M N     yccw',
                '        a3ib   ycccccw   a1ib',
                '        aiib   aiiiiib   aiib',
                '        aiib   aiqrsib   aiib',
                '    a>b aiifccceituvifccceiib a<b',
                '    aib aiiiiiiiituviiiiiiiib aib', 
                '    aifcccccccceituvifcccccccceib',
                '    aiiiiiiiiiiIituviIiiiiiiiiiib',
                '    xdddgiippiiIituviIiippiihdddz',
                '        aiippiiIituviIiippiib',
                '        aiippiiIituviIiippiib',
                'aVb     aiippiiIituviIiippiib     a^b',
                'aib     aiippiiIituviIiippiib     aib',
                'aifccccceiiiiiiiituviiiiiiiifccccceib',
                'aiiiiiiiiiiiiiiiiABCiiiiiiiiiiiiiiiib',
                'xdddddddddddddddgiiihdddddddddddddddz',
                '                aiiib',
                '                aiiifcccccccw',
                '                aiiiiiiiiiiib',
                '                xddddddddg2ib',
                '                         aiib',
            ],
            [
                '         yccw',
                '         aiib',
                '         aiib',
                '         aiib',
                'ycccccccceiifcccccccccw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddgiiiiiihdddddddz',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                'ycccccceiiiiiifccccccvw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddddgiihdddddddddz',
                '         aiib',
                '         aiib',
                '         aiib',
                '         xddz',
            ],
            [
                '         yccw',
                '         aiib',
                '         aiib',
                '         aiib',
                'ycccccccceiifcccccccccw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddgiiiiiihdddddddz',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                'ycccccceiiiiiifccccccvw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddddgiihdddddddddz',
                '         aiib',
                '         aiib',
                '         aiib',
                '         xddz',
            ],
            [
                '         yccw',
                '         aiib',
                '         aiib',
                '         aiib',
                'ycccccccceiifccccccccvw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddddgiihdddddddddz',
                '         aiib',
                '         aiib',
                '         aiib',
                '         xddz',
            ],
            [
                'yccw     yccw      yccw',
                'aiib     aiib      a1ib',
                'aiib     aiib      aiib',
                'aiib     aiib      aiib',
                'aiifccccceiifcccccceiib',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddgiiiiiihdddddddz',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                '       aiiiiiib',
                'ycccccceiiiiiifcccccccw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddddgiihdddddddddz',
                '         aiib',
                '         a2ib',
                '         aiib',
                '         xddz',
            ],
        ]
        const doorMappings = {
            2: {
                '^': {
                    targetLevel: 0,
                    targetX: 192,
                    targetY: 400
                },
                'v':{
                    targetLevel: 1,
                    targetX: 508,
                    targetY: 260
                }
            },

        }
        const stairMappings = {
            0: {
                2: {
                    targetLevel: 1,
                    targetX: 1726,
                    targetY: 230
                }
            },
            1: {
                1: {
                    targetLevel: 0,
                    targetX: 192,
                    targetY: 400
                },
                2:{
                    targetLevel: 2,
                    targetX: 708,
                    targetY: 260
                }
            },
        }
        const levelCfg = {
            width: 64,
            height: 64,
            a: () => [sprite('right-wall'), area(), solid(), 'wall'],
            b: () => [sprite('left-wall'), area(), solid(), 'wall'],
            c: () => [sprite('top-wall'), area(), solid(), layer('bg'), 'wall'],
            d: () => [sprite('bottom-wall'), area(), solid(), layer('fg'), 'wall'],
            e: () => [sprite('top-right-inside-wall'), area(), solid(), layer('bg'), 'wall'],
            f: () => [sprite('top-left-inside-wall'), area(), solid(), layer('bg'), 'wall'],
            g: () => [sprite('bottom-right-inside-wall'), area(), solid(), layer('fg'), 'wall'],
            h: () => [sprite('bottom-left-inside-wall'), area(), solid(), layer('fg'), 'wall'],
            i: () => [sprite('floor'), layer('bg')],
            j: () => [sprite('bed'), layer('mg'), area(), solid(), 'replace'],
            k: () => [sprite('chair'), layer('mg'), area(), solid(), 'replace'],
            l: () => [sprite('chair2'), layer('mg'), area(), solid(), 'replace'],
            m: () => [sprite('chair3'), layer('mg'), area(), solid(), 'replace'],
            n: () => [sprite('table'), layer('mg'), area(), solid(), 'replace'],
            o: () => [sprite('table2'), layer('mg'), area(), solid(), 'replace'],
            p: () => [sprite('statue'), layer('mg'), area(), solid(), 'replace'],

            q: () => [sprite('top-left-carpet'), layer('bg')],
            r: () => [sprite('top-carpet'), layer('bg')],
            s: () => [sprite('top-right-carpet'), layer('bg')],

            t: () => [sprite('left-carpet'), layer('bg')],
            u: () => [sprite('carpet'), layer('bg')],
            v: () => [sprite('right-carpet'), layer('bg')],

            A: () => [sprite('bottom-left-carpet'), layer('bg')],
            B: () => [sprite('bottom-carpet'), layer('bg')],
            C: () => [sprite('bottom-right-carpet'), layer('bg')],
            
            I: () => [sprite('column'), layer('mg'), area(), solid(), 'replace'],
            w: () => [sprite('top-right-wall'), area(), solid(), 'wall'],
            x: () => [sprite('bottom-left-wall'), area(), solid(), 'wall'],
            y: () => [sprite('top-left-wall'), area(), solid(), 'wall'],
            z: () => [sprite('bottom-right-wall'), area(), solid(), 'wall'],
            M: () => [sprite('monmach'), {frame: 0}, area(), solid(), layer('mg'), 'monmach'],
            '^': () => [sprite('top-door'), area(), 'door', 'replace', {
                doorLookup: '^'
            }],
            'V': () => [sprite('top-door'), area(), 'door', 'replace', {
                doorLookup: 'v'
            }],
            1: () => [sprite('stairs-up'), layer('mg'), area(), 'stairs', 'replace', {
                stairLookup: 1
            }],
            2: () => [sprite('stairs-dn'), layer('mg'), area(), 'stairs', 'replace', {
                stairLookup: 2
            }],
        }
        addLevel(maps[level], levelCfg)

        const player = add([
            sprite('doctor'),
            pos(startX, startY),
            {
                dir: vec2(0, 0),
                animDir: vec2(0, 0),
                state: 'Laugh',
                setState: function (state) {
                    if (player.state == state) return;
                    player.state = state;
                    if (player.state == 'Laugh') {
                        player.play(state)
                        wait(2, () => {
                            if (player.state == 'Laugh') player.setState('Idle')
                        })
                    } else if (player.state == 'Idle') {
                        player.play(state)
                    }
                }
            },
            area({
                scale: .5
            }),
            solid(),
            scale(1.5),
            origin('center'),
            layer('mg')
        ])
        if(newGame){
            newgame = false;
            dialog('Yawn... Another fine evening... TO MAKE THOSE MISERABLE VILLIAGERS PAY!\n\nHAHAHAHA!\n\nTo the Monster Maker Machine!', player)
            player.play("Laugh")
        }else{
            player.play("Idle")
        }

        camPos(startX, startY)
        player.onUpdate(() => {
            if (player.dir.y != player.animDir.y || player.dir.x != player.animDir.x) {
                player.animDir.x = player.dir.x;
                player.animDir.y = player.dir.y;
                if (player.dir.x == -1 && player.dir.y == -1) {
                    player.play('NW-Walk')
                } else if (player.dir.x == 1 && player.dir.y == -1) {
                    player.play('NE-Walk')
                } else if (player.dir.x == 1 && player.dir.y == 1) {
                    player.play('SE-Walk')
                } else if (player.dir.x == -1 && player.dir.y == 1) {
                    player.play('SW-Walk')
                } else if (player.dir.x == 0 && player.dir.y == 1) {
                    player.play('S-walk')
                } else if (player.dir.x == 0 && player.dir.y == -1) {
                    player.play('N-Walk')
                } else if (player.dir.x == -1 && player.dir.y == 0) {
                    player.play('W-Walk')
                } else if (player.dir.x == 1 && player.dir.y == 0) {
                    player.play('E-Walk')
                } else if (player.dir.x == 0 && player.dir.y == 0) {
                    player.play('Idle')
                }
            }

        })

        player.onCollide('door', (d) => {
            destroy(d)
            wait(.2, () => {
                go('game', {
                    level: doorMappings[level][d.doorLookup].targetLevel,
                    //score: scoreLabel.value,
                    startX: doorMappings[level][d.doorLookup].targetX,
                    startY: doorMappings[level][d.doorLookup].targetY,
                })
            })
        })
        player.onCollide('stairs', (d) => {
            //parse level data to find level and xy
                go('game', {
                    level: stairMappings[level][d.stairLookup].targetLevel,
                    //score: scoreLabel.value,
                    startX: stairMappings[level][d.stairLookup].targetX,
                    startY: stairMappings[level][d.stairLookup].targetY,
                })
        })
        player.onCollide('monmach', (m) => {
            if(!m.open){
                shake(2,3)
                wait(1, ()=>{
                    dialog('Ah the Monster Machine. How Lovely. It seems to be ready to accept a cofiguration. Now I know those buttons are around this old place somewhere.. . Perhaps I should head to the Library to refresh myself on the Users\' Manuals', player)
                })
                    m.open = true;
                m.play('open', {loop:false})    
            }
        })

        keyDown('left', () => {
            if(dialogOpen) return
            player.move(-MOVE_SPEED, 0)
            player.dir.x = -1;
            player.setState('W-Walk')
            var currCam = camPos();
            if (currCam.x - player.pos.x > width() / 4) {
                camPos(player.pos.x + width() / 4, currCam.y);
            }
        })

        keyDown('right', () => {
            if(dialogOpen) return
            player.move(MOVE_SPEED, 0)
            player.dir.x = 1
            player.setState('E-Walk')
            var currCam = camPos();
            if (player.pos.x - currCam.x > width() / 4) {
                camPos(player.pos.x - width() / 4, currCam.y);
            }
        })

        keyDown('up', () => {
            if(dialogOpen) return
            player.move(0, -MOVE_SPEED)
            player.dir.y = -1
            player.setState('N-Walk')
            var currCam = camPos();
            if (currCam.y - player.pos.y > height() / 3) {
                camPos(currCam.x, player.pos.y + height() / 3);
            }

        })

        keyDown('down', () => {
            if(dialogOpen) return
            player.move(0, MOVE_SPEED)
            player.dir.y = 1
            player.setState('S-walk')
            var currCam = camPos();
            if (player.pos.y - currCam.y > height() / 3) {
                camPos(currCam.x, player.pos.y - height() / 3);
            }
        })

        keyRelease(['up', 'down', ], () => {
            player.dir.y = 0
            player.setState('Idle')
        })
        keyRelease(['left', 'right'], () => {
            player.dir.x = 0
            player.setState('Idle')
        })

        function spawnSpell(p) {
            const obj = add([sprite('explosion'), pos(p), area(), origin('center'), 'spell'])
            wait(1, () => {
                if (player.state == 'Idle') {
                    player.setState('Laugh')
                }
                destroy(obj)
            })
        }

        keyPress('space', () => {
            if(!dialogOpen){
                shake(4)
                spawnSpell(player.pos.add(player.dir.scale(48)))    
            }
        })

        onUpdate('replace', (s) => {
            if(!s.tilereplaced){
                add([
                    sprite('floor'), 
                    layer('bg'),
                    pos(s.pos.x, s.pos.y)
                ])
                s.tilereplaced = true;
            } 
        
        })

    })

    go ('game', { level: 0, score: 0, startX: 192, startY:216, newGame:true })