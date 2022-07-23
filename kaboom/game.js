    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        debug: true,
        background: [0, 0, 0, 1],
    })
    //globals
    var dialogOpen = false;
    let keystate
    // Constants
    const MOVE_SPEED = 120
    const dialog = function(message, player, p, choices, callback){
        dialogOpen = true
        var step = 0;
        var camInterval = setInterval(function(){
            step++;
            if(step>6) clearInterval(camInterval)
            var currCam = camPos();
            var xmov = (p.x - currCam.x) / (6-step);
            var ymov = (p.y - currCam.y) / (6-step);
            if(Math.round(p.y)!=Math.round(currCam.y)){
                currCam.y+=ymov;
            }
            if(Math.round(p.x)!=Math.round(currCam.x)){
                currCam.x+=xmov;
            }
            camPos(currCam)
        },1)
        //camPos(player.pos.x, player.pos.y)
        const b = add([
            sprite('dialog'),
            origin('center'),
            pos(p.x, p.y),
        ])

        const t = []
        let selected = 0;
        let cursor
        t.push(add([
            text(message,{
                size: 12,
                width:300
            }),
            pos(p.x, p.y-(choices&&choices.length?40:8)),
            origin('center')
        ]))
        if(choices){
            cursor = add([
                text('>>>',
                {
                    size: 12,
                    width:300
                }),
                pos(p.x-70, p.y+(28+(12*selected))),
                origin('center')
            ])
            t.push(cursor)
            t.push(add([
                text('Use the arrow keys and space to select.',{
                    size: 12,
                    width:300
                }),
                pos(p.x, p.y+100),
                origin('center')
            ]))
            choices.forEach((choice, i)=>{
                t.push(add([
                    text(choice ,{
                        size: 12,
                        width:300
                    }),
                    pos(p.x, p.y+(28+(12*i))),
                    origin('center')
                ]))
            })
        } else{
            t.push(add([
                text('Press space to continue',{
                    size: 12,
                    width:300
                }),
                pos(p.x, p.y+100),
                origin('center')
            ]))                
        }
        wait(.5,()=>{
            keystate=''
            let keyInterval = setInterval(()=>{
                if(cursor){
                    cursor.moveTo(p.x-70, p.y+(28+(12*selected)))
                }
                if(keystate == 'down'){
                    keystate =''
                    selected++
                    if(choices && selected == choices.length){
                        selected = 0
                    }
                }else if(keystate == 'up'){
                    keystate =''
                    selected--
                    if(selected < 0 && choices){
                        selected = choices.length-1
                    }
                }else if(keystate == 'space'){
                    keystate =''
                    clearInterval(keyInterval)
                    destroy(b)
                    t.forEach(t=>{
                        destroy(t)
                    })
                    player.play('Idle')
                    wait(.1,()=>{
                        dialogOpen = false
                        if(callback) callback(selected)
                    })
                } else {
                }
            }, 1)    
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
    loadSprite('bed2', 'bed2.png')
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
                'ycccccceiiiiiifccccccVw',
                'aiiiiiiiiiiiiiiiiiiiiib',
                'xddddddddgiihdddddddddz',
                '         aiib',
                '         aiib',
                '         aiib',
                '         xddz',
            ],
            [
                'yccccw',
                'akDikb',
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
                'ycccccceiiiiiifccccccVw',
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
            1: {
                '^': {
                    targetLevel: 3,
                    targetX: 192,
                    targetY: 400
                },
                'v':{
                    targetLevel: 1,
                    targetX: 508,
                    targetY: 260
                }
            },
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
                    targetX: 1730,
                    targetY: 215
                }
            },
            1: {
                1: {
                    targetLevel: 0,
                    targetX: 194,
                    targetY: 428
                },
                2:{
                    targetLevel: 2,
                    targetX: 708,
                    targetY: 260
                }
            },
            2:{},
            3:{
                2: {
                    targetLevel: 1,
                    targetX: 2272,
                    targetY: 786
                }
                
            }
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
            w: () => [sprite('top-right-wall'), area(), solid(), 'wall'],
            x: () => [sprite('bottom-left-wall'), area(), solid(), 'wall'],
            y: () => [sprite('top-left-wall'), area(), solid(), 'wall'],
            z: () => [sprite('bottom-right-wall'), area(), solid(), 'wall'],
            A: () => [sprite('bottom-left-carpet'), layer('bg')],
            B: () => [sprite('bottom-carpet'), layer('bg')],
            C: () => [sprite('bottom-right-carpet'), layer('bg')],
            D: () => [sprite('bed2'), layer('bg'), layer('mg'), area(), solid(), 'replace', 'bean'],
            I: () => [sprite('column'), layer('mg'), area(), solid(), 'replace'],
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
            //dialog('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16',
            //  player,
            //    player.pos,
            //)
            dialog('Yawn... Another fine evening... TO MAKE THOSE MISERABLE VILLIAGERS PAY!\n\nHAHAHAHA!\n\nTo the Monster Maker Machine!',
                player,
                player.pos,
            )
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
                    dialog('Ah the Monster Machine. How Lovely. It seems to be ready to accept a cofiguration. Now I know those buttons are around this old place somewhere.. . Perhaps I should head to the Library to refresh myself on the Users\' Manuals', 
                        player, 
                        {x:m.pos.x+96, y:m.pos.y+64}
                    )
                })
                 m.open = true;
                m.play('open', {loop:false})    
            }
        })

        player.onCollide('bean', (m) => {
                    dialog('Ah my Lovely kitty. How are you this fine evening, Bean? How would you like to tach those villiagers the lesson of thier lives? HAHAHA!\n\nSend Bean to terrorize the villiage?', 
                        player,  
                        {x:m.pos.x+64, y:m.pos.y+64},
                        ['Yes','No'],
                        function(i){
                            if(i==0){
                                dialog('Ah but he looks so tired. Perhaps later..',
                                    player,
                                    {x:m.pos.x+64, y:m.pos.y+64}
                                )    
                            } else{
                                dialog('Very well. Perhaps later..',
                                    player,
                                    {x:m.pos.x+64, y:m.pos.y+64}
                                )    
                            }
                        }        
                    )
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
        onKeyPress('up', () => {
            keystate = 'up'
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
        onKeyPress('down', () => {
            keystate = 'down'
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
            //keystate = ''
            player.dir.y = 0
            player.setState('Idle')
        })
        keyRelease(['left', 'right'], () => {
            //keystate = ''
            player.dir.x = 0
            player.setState('Idle')
        })
        keyRelease('space', ()=>{
            //keystate = ''
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
        onKeyPress('space', () => {
            keystate = 'space'
        })
        keyPress('space', () => {
            keystate = 'space'
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