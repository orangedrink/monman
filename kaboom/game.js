    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    kaboom({
        global: true,
        fullscreen: true,
        scale: 2,
        debug: true,
        background: [0, 0, 0, 1],
    })
    //globals
    let dialogOpen = false;
    let keystate
    let gamestate = {
        mmFound: false,
        bit1: false,
        bit2: false,
        bit3: false,
        bit4: false,
    }
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
    loadSprite('couch', 'couch.png')
    loadSprite('bed2', 'bed2.png')
    loadSprite('dialog', 'dialog.png')
    loadSprite('chair', 'chair.png')
    loadSprite('chair2', 'chair2.png')
    loadSprite('chair3', 'chair3.png')
    loadSprite('table', 'table.png')
    loadSprite('table2', 'table2.png')
    loadSprite('column', 'column.png')
    loadSprite('statue', 'statue.png')
    loadSprite('button2', 'button2.png')
    loadSprite('bookshelf', 'bookshelf.png')
    loadSprite('shelf', 'shelf.png')
    loadSprite('web', 'web.png')
    loadSprite('web2', 'web2.png')
    loadSprite('web-line', 'web-line.png')
    loadAseprite("doctor", "doctor.png", "doctor.json");
    loadAseprite('monmach', 'monmach.png', 'monmach.json')
    loadAseprite('switch', 'switch.png', 'switch.json')
    loadAseprite('button', 'button.png', 'button.json')
    loadAseprite('ghoulie', 'ghoulies.png', 'ghoulies.json')
    loadAseprite('bone', 'bone.png', 'bone.json')
    loadAseprite('skull', 'skull.png', 'skull.json')
    loadAseprite('slime', 'slime.png', 'slime.json')
    loadAseprite('slime-drop', 'slime-drop.png', 'slime-drop.json')
    loadAseprite('spider', 'spider.png', 'spider.json')
    scene('mansion', ({
        level,
        startX,
        startY,
        newGame,
    }) => {
        layers(['bg', 'mg', 'fg', 'obj', 'ui'], 'obj')
        let buttonsPressed = 0
        const maps = [
            [
                'yccccw',
                'akjikb',
//                'aiiiYb',
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
                '        yccw     M       yccw',
                '        a3ib   ycccccw   a1ib',
                '        aiib   aiiiiib   aiib',
                '        aiib   aiqrsib   aiib',
                '    a>b aiifccceituvifccceiib a<b',
                '    aib aiiiiiiiituviiiiiiiib aib', 
                '    aifcccccccceituvifcccccccceib',
                '    aiiiiiiiiiiIituviIiiiiiiiiiib',
                '    xdddgiippiiIituviIiippiihdddz',
//                '        aiippiiIituviIiippiib',
//                '        aiippiiIituviIiippiib',
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
                '  yEEEEEw',
                'yFeiiiiifGw',
                'aiiiiiiiiib',
                'xdgiqrsihdz',
                '  aotuvib',
                '  aituvib',
                '  aituvib',
                'yHeiABCifJw',
                'aiiiiiiiiib',
                'xdgiiiiihdz',
                '  aiiiiib',
                '  xdgihdz',
                '    aib',
                '    aib',
                '    aib',
                '    x>z',
            ],
            [
                '          y^w',
                '          aib',
                '          aib',
                '          aib',
                'yLcKccKccceifccKccKccLw',
                'aiNiiNiiiiiNNiiiiNiiiNb',
                'xdddddddgiqrsihdddddddz',
                '        aItuvIb',
                '        aituvib',
                '        aItuvIb',
                'yLcKccKceituvifKccKccLwcccccccccc<cLw',
                'aNiiiNiiiituviiiiNiiiNOiiiiiiiiiiiiib',
                'xdddddddgituvihdddddddzdddddddddddddz',
                '        aItuvIb',
                '        aituvib',
                '        aItuvIb',
                'yLcKccKceituvifKccKccLw',
                'aiNiiNiiiiABCiiiiNiiiNb',
                'xdddddddddgihdddddddddz',
                '          x>z',
            ],
            [
                'yccccw',
                'aiRiib',
                'aqrrsb',
                'atuuvb',
                'aABBCb',
                'xgiihz',
                ' aiib ',
                ' a1ib ',
                ' aiib ',
                ' xddz  ',
            ],
            [
                'yccccw',
                'akDikb',
                'aqrrsb',
                'atuuvb',
                'aABBCb',
                'xgiihz',
                ' aiib ',
                ' a1ib ',
                ' aiib ',
                ' xddz  ',
            ],
            [
                '                        y^w',
                '                        aib',
                '                        aib',
                '                        aib',
                'ycLcTcccTcccTcccTcccTccceifTcccTcccTcccTcccTccccLcw',
                'aiUiiUiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiUiiiiiUiiib',
                'aiiiiiUiiiiiUiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiUiiiiiUb',
                'xdddddddddddddddgiiUiqrrrrrrrsiUiihdddddddddddddddz',
                '                aimnltuuuuuuuvmnilb',
                '                amniltuuuuuuuvmnlib',
                '                aiiiiABBBBBBBCiiiib',
                '                xdddddddgihdddddddz',
                '                        aib',
                '                        aib',
                '                        aib',
                '                        xVz',
            ],
            [
                'yccccw',
                'aiSiib',
                'aqrrsb',
                'atuuvb',
                'aABBCb',
                'xgiihz',
                ' aiib ',
                ' a1ib ',
                ' aiib ',
                ' xddz  ',
            ],
            [
                'yTcccTcccTcccTcccTcccTcccTcccTcccTcccTcccc>cw',
                'aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiUiiiiiUiiib',
                'aiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiUiiiiiUb',
                'xd<dddddddddddddddddddddddddddddddddddddddddz',
            ],
            [
                'yTcccTcccTcccTcccTcccTcccTcccTcccTcccTcccTcccc>cw',
                'aiiiiiiiiiiiiiiiiiiiiiiiiiiiUUiiiiiiiiUiiiiiUiiib',
                'xd<dddddddddddddddddddddddddddddddddddddddddddddz',
            ],
            [
                '              yccw',
                '       yc/c\\cwa1ibyc<c>cw',
                '       aiiiiibaiibaiiiiib',
                '       xdddddzaiibxdddddz',
                '   ycVcccccccceiifcccccccc^cw',
                '   aXiiii!iiiii!iWXiiiiWZii!b',
                '   xddddddddddddddddddddddddz',
                'yccccccccccccccccccccccccccccccw',
                'a!ii!iiYZiiiiiYXiii!iiWXiii!iiWb',
                'xd[dddddddddddddddddddddddddd]dz',
            ],
            [
                '         y^w',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                'yc<cccccceifcccccc>cw',
                'aiiiiiiiiiWiiiiiiiiWb',
                'xddddddddgihddddddddz',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         xVz',
            ],
            [
                'ycccw',
                'aiiib',
                'aiiib',
                'xgihz',
                ' aib',
                ' aib',
                ' aib',
                ' xVz',
            ],
            [
                'yccccw',
                'aiQiib',
                'aqrrsb',
                'atuuvb',
                'aABBCb',
                'xgiihz',
                ' aiib ',
                ' a1ib ',
                ' aiib ',
                ' xddz  ',
            ],
            [
                '         y^w',
                '         aib',
                '         aib',
                '         aWb',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                'yc<cccccceifcccccc>cw',
                'aiiiiiiiiiWiiiiiiiiib',
                'xddddddddgihddddddddz',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         xVz',
            ],
            [
                '         y^w',
                '         aWb',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                'yc<cccccceifcccccc>cw',
                'aiiiiiiiiiiiiiiiiiiib',
                'xddddddddgihddddddddz',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         xVz',
            ],
            [
                '         y^w',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                'yc<cccccceifcccccc>cw',
                'aWiiiiiiiiWiiiiiiiiib',
                'xddddddddgihddddddddz',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         xVz',
            ],
            [
                '         y^w',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                'yc<cccccceifcccccc>cw',
                'aiiiiiiiiiiiiiiiiiiWb',
                'xddddddddgihddddddddz',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         aib',
                '         xVz',
            ],
            [],
            [],
            [
                'yccccccw',
                'aiiiiiWb',
                'a2iiiiib',
                'a1ihgiib',
                'aiifeiib',
                'aiiiiiib',
                'aiiiiiib',
                'xddddddz',
            ],
            [
                'yccccccw',
                'aiiiiiib',
                'a2iiiiib',
                'a1ihgiib',
                'aiifeiib',
                'aiiiiiib',
                'aiiiiiib',
                'xddddddz',
            ],
            [
                'yccccccw',
                'aiiiiiib',
                'a2iiiiib',
                'a1ihgiib',
                'aiifeiib',
                'aiiiiiib',
                'aiiiiiib',
                'xddddddz',
            ],
            [
                'yccccccw',
                'aiiiiiib',
                'a2iiiiib',
                'a1ihgiib',
                'aiifeiib',
                'aiiiiiib',
                'aiiiiiib',
                'xddddddz',
            ],
            [
                '   yccw',
                '   a1ib',
                '   aiib',
                'ycceiifccw',
                'aIiqrrsiIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIituuviIb',
                'aIiABBCiIb',
                'xddgiihddz',
                '   a2ib',
                '   aiib',
                '   xddz',
            ],
            [
                'ycLcw     ycLcw     ycLcw',
                'aiiib     aiiib     aiiib',
                'aiiib     aiiib     aiiib',
                'aiiib     aiiib     aiiib',
                'aiiifccccceiiifccccceiiib',
                'aiiiiiiiiiiiiiiiiiiiiiiib',
                'xddddddgiiiiiiiiihddddddz',
                '       aiiiiiiiiib',
                '       aiiiiiiiiib',
                'yc<cccceiiiiiiiiifccccc>cw',
                'aiiiiiiiiiiiiiiiiiiiiiiiib',
                'xddddddddgiiiiihdddddddddz',
                '         aiiiiib',
                '         aiiiiifcccccccw',
                '         aiiiiiiiiiiiiib',
                '         xddddddddddg2ib',
                '                    aiib',
            ],
            [
                'yccccw',
                'aiPiib',
                'aqrrsb',
                'atuuvb',
                'aABBCb',
                'xgiihz',
                ' aiib ',
                ' a1ib ',
                ' aiib ',
                ' xddz  ',
            ],


        ]
        const doorMappings = {
            1: {
                '<': {
                    targetLevel: 6,
                    targetX: 1638,
                    targetY: 926,
                    keys: [
                        ()=>{
                            if(gamestate.mmFound){
                                return true;
                            }else{
                                dialog('That Monster Maker is around here somewhere! I can\'t leave until I find it.', player, player.pos)
                                return false;
                            }
                        }
                    ]

                },
                '>': {
                    targetLevel: 2,
                    targetX: 352,
                    targetY: 932,
                    keys: [
                        ()=>{
                            if(gamestate.mmFound){
                                return true;
                            }else{
                                dialog('That Monster Maker is around here somewhere! I can\'t leave until I find it.', player, player.pos)
                                return false;
                            }
                        },
                    ]
                },
                '^': {
                    targetLevel: 3,
                    targetX: 737,
                    targetY: 1182,
                    keys: [
                        ()=>{
                            if(gamestate.mmFound){
                                return true;
                            }else{
                                dialog('That Monster Maker is around here somewhere! I can\'t leave until I find it.', player, player.pos)
                                return false;
                            }
                        },
                    ]
                },
                'v':{
                    targetLevel: 5,
                    targetX: 194,
                    targetY: 428,
                    keys: [
                        ()=>{
                            if(gamestate.mmFound){
                                
                                return true;
                            }else{
                                dialog('Where in the blazes is that Monster Maker Machine? I can\'t leave here until I find it.', player, player.pos)
                                return false;
                            }
                        },
                    ]
                }
            },
            2: {
                '>': {
                    targetLevel: 1,
                    targetX: 353,
                    targetY: 345,
                },
            },
            3:{
                '^': {
                    targetLevel: 3,
                    targetX: 737,
                    targetY: 1182,
                    keys: [
                        ()=>{
                            if(buttonsPressed==6){
                                return true;
                            }else{
                                let left = 6-buttonsPressed
                                dialog('There are '+ left+' unpressed buttons remaining.', player, player.pos)
                            }
                        }
                    ]
                },
                '<': {
                    targetLevel: 4,
                    targetX: 194,
                    targetY: 428,
                    keys: [
                        ()=>{
                            if(buttonsPressed==7){
                                return true;
                            }else{
                                let left = 7-buttonsPressed
                                dialog('There are '+ left+' unpressed buttons remaining.', player, player.pos)
                            }
                        }
                    ]
                },
                '>':{
                    targetLevel: 1,
                    targetX: 2272,
                    targetY: 664,
                }
            },
            4:{},
            5:{},
            6: {
                '^':{
                    targetLevel: 7,
                    targetX: 194,
                    targetY: 428,
                    keys:[
                        ()=>{
                            if(buttonsPressed==2){
                                return true;
                            }else{
                                let left = 2-buttonsPressed
                                dialog('There are '+ left+' unpressed buttons remaining.', player, player.pos)
                            }
                        }
                    ]
                },
                'v':{
                    targetLevel: 1,
                    targetX: 2015,
                    targetY: 340,
                },
            },
            7:{},
            8:{},
            9:{},
            10:{
                '^':{
                    targetLevel: 10,
                    targetX: 1890,
                    targetY: 540
                },                
                'v':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '[':{
                    targetLevel: 10,
                    targetX: 1309,
                    targetY: 150
                },                
                ']':{
                    targetLevel: 10,
                    targetX: 735,
                    targetY: 150
                },                
                '<':{
                    targetLevel: 10,
                    targetX: 160,
                    targetY: 540
                },                
                '>':{
                    targetLevel: 10,
                    targetX: 1890,
                    targetY: 540
                },                
                '/':{
                    targetLevel: 13,
                    targetX: 194,
                    targetY: 428
                },                
                '\\':{
                    targetLevel: 10,
                    targetX: 1890,
                    targetY: 540
                },                
            },
            11:{
                '^':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '>':{
                    targetLevel: 14,
                    targetX: 672,
                    targetY: 1250
                },                
                '<':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                'v':{
                    targetLevel: 10,
                    targetX: 350,
                    targetY:350
                },                

            },
            12:{
                'v':{
                    targetLevel: 10,
                    targetX: 350,
                    targetY:350
                },                
            },
            13:{},
            14:{
                '^':{
                    targetLevel: 15,
                    targetX: 672,
                    targetY: 1250
                },                
                '>':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '<':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                'v':{
                    targetLevel: 10,
                    targetX: 350,
                    targetY:350
                },                

            },
            15:{
                '^':{
                    targetLevel: 16,
                    targetX: 672,
                    targetY: 1250
                },                
                '>':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '<':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                'v':{
                    targetLevel: 10,
                    targetX: 350,
                    targetY:350
                },                

            },
            16:{
                '^':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '>':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '<':{
                    targetLevel: 17,
                    targetX: 672,
                    targetY: 1250
                },                
                'v':{
                    targetLevel: 10,
                    targetX: 350,
                    targetY:350
                },                

            },
            17:{
                '^':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                '>':{                    
                    targetLevel: 12,
                    targetX: 160,
                    targetY: 428
                },                
                '<':{
                    targetLevel: 11,
                    targetX: 672,
                    targetY: 1250
                },                
                'v':{
                    targetLevel: 10,
                    targetX: 350,
                    targetY:350
                },                

            },
            25:{
                '<':{
                    targetLevel: 0,
                    targetX: 0,
                    targetY:0,
                    keys:[
                        ()=>{
                            return false;
                        }
                    ]
                },
                '>':{
                    targetLevel: 26,
                    targetX: 194,
                    targetY: 428,
                    keys:[
                        ()=>{
                            if(buttonsPressed==3){
                                return true;
                            }else{
                                let left = 3-buttonsPressed
                                dialog('There are '+ left+' unpressed buttons remaining.', player, player.pos)
                            }
                        }
                    ]
                }
            }
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
                    targetLevel: 10,
                    targetX: 1026,
                    targetY: 210,
                    keys:[
                        ()=>{
                            if(gamestate.mmFound){
                                //dialog('The Cellar is under construction.', player, player.pos)
                                //return false;
    
                                return true;
                            }else{
                                dialog('Where in the blazes is that Monster Maker Machine? I can\'t leave until I find it.', player, player.pos)
                                return false;
                            }
                        }
                    ]
                },
                3:{
                    targetLevel: 20,
                    targetX: 100,
                    targetY: 100,
                    keys:[
                        ()=>{
                            if(gamestate.mmFound){   
                                return true;
                            }else{
                                dialog('Where in the blazes is that Monster Maker Machine? I can\'t leave until I find it.', player, player.pos)
                                return false;
                            }
                        }
                    ]
                }
            },
            2:{},
            3:{
                2: {
                    targetLevel: 1,
                    targetX: 2272,
                    targetY: 786
                }
                
            },
            4:{
                1:{
                    targetLevel: 3,
                    targetX: 737,
                    targetY: 76,
                }
            },
            5: {
                1: {
                    targetLevel: 1,
                    targetX: 98,
                    targetY: 657
                }
            },
            6:{},
            7:{
                1:{
                    targetLevel: 6,
                    targetX: 1627,
                    targetY: 98
                }
            },
            10:{
                1:{
                    targetLevel: 1,
                    targetX: 1730,
                    targetY:1050
                },                
            },
            13:{
                1:{
                    targetLevel: 10,
                    targetX: 1695,
                    targetY:350
                },                
            },
            20:{
                1:{
                    targetLevel: 21,
                    targetX: 100,
                    targetY:100
                },
                2:{
                    targetLevel: 1,
                    targetX: 640,
                    targetY:210
                }
            },
            21:{
                1:{
                    targetLevel: 22,
                    targetX: 100,
                    targetY:100
                },
                2:{
                    targetLevel: 20,
                    targetX: 130,
                    targetY:360
                }
            },
            22:{
                1:{
                    targetLevel: 23,
                    targetX: 100,
                    targetY:100
                },
                2:{
                    targetLevel: 21,
                    targetX: 130,
                    targetY:360
                }
            },
            23:{
                1:{
                    targetLevel: 24,
                    targetX: 320,
                    targetY:924
                },
                2:{
                    targetLevel: 22,
                    targetX: 130,
                    targetY:360
                }
            },
            24:{
                1:{
                    targetLevel: 25,
                    targetX: 1410,
                    targetY:930
                },
                2:{
                    targetLevel: 23,
                    targetX: 130,
                    targetY:360
                }
            },
            25:{
                2:{
                    targetLevel: 24,
                    targetX: 322,
                    targetY:250
                }
            },
            26:{
                1:{
                    targetLevel: 25,
                    targetX: 1500,
                    targetY:666        
                }
            }

        }
        const bookMappings = {
            'manual': ()=>{
                dialog('Volume I: Overview\n\nThe Monser Maker Machine is configured by setting the four bits that make up the Monster Byte.\nThe levers that allow for setting and unsetting the bits in the Monster Byte are located in the Mansion as follows:\n\nBit 1:\tThe Galley\nBit 2:\tThe Cellar\nBit 3:\tThe Tower\nBit 4:\tThe Parlor\n', player, player.pos)
            },
            'bit1': ()=>{
                dialog('Volume II: Monster Byte Bit 1 Settings and Corresponding Monster Types\nSkeleton:\t1\nBoar:\t0\nBeast:\t0\nMushroom:\t1\ntroll:\t1\nreaver:\t0\nDraconian:\t1\nelemental:\t0\niron Golem:\t1\nGiant mushroom:\t0\nGiant troll:\t0\nGiant Beast:\t1\nGiant Boar:\t1\nDragonman:\t0\nGiant Iron Golem:\t1', player, player.pos)
            },
            'bit2': ()=>{
                dialog('Volume III: Monster Byte Bit 2 Settings and Corresponding Monster Types\nSkeleton\t0\nBoar\t1\nBeast\t0\nMushroom\t1\ntroll\t0\nreaver\t1\nDraconian\t1\nelemental\t0\niron Golem\t0\nGiant mushroom\t1\nGiant troll\t0\nGiant Beast\t1\nGiant Boar\t0\nDragonman\t1\nGiant Iron Golem\t1', player, player.pos)

            },
            'bit3': ()=>{
                dialog('Volume IV: Monster Byte Bit 3 Settings and Corresponding Monster Types\nSkeleton\t0\nBoar\t0\nBeast\t1\nMushroom\t0\ntroll\t1\nreaver\t1\nDraconian\t1\nelemental\t0\niron Golem\t0\nGiant mushroom\t0\nGiant troll\t1\nGiant Beast\t0\nGiant Boar\t1\nDragonman\t1\nGiant Iron Golem\t1', player, player.pos)
            },
            'bit4': ()=>{
                dialog('Volume V: Monster Byte Bit 4 Settings and Corresponding Monster Types\nSkeleton\t0\nBoar\t0\nBeast\t0\nMushroom\t0\ntroll\t0\nreaver\t0\nDraconian\t0\nelemental\t1\niron Golem\t1\nGiant mushroom\t1\nGiant troll\t1\nGiant Beast\t1\nGiant Boar\t1\nDragonman\t1\nGiant Iron Golem\t1', player, player.pos)
            },
            'appendixa': ()=>{
                dialog('Appendix A: Other features and settings\n\n', player, player.pos)
            },
            'appendixb': ()=>{
                dialog('Appendix B: Power and Maintenance\n\n', player, player.pos)
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
            w: () => [sprite('top-right-wall'), area(), solid(), 'wall'],
            x: () => [sprite('bottom-left-wall'), area(), solid(), 'wall'],
            y: () => [sprite('top-left-wall'), area(), solid(), 'wall'],
            z: () => [sprite('bottom-right-wall'), area(), solid(), 'wall'],
            A: () => [sprite('bottom-left-carpet'), layer('bg')],
            B: () => [sprite('bottom-carpet'), layer('bg')],
            C: () => [sprite('bottom-right-carpet'), layer('bg')],
            D: () => [sprite('bed'), layer('bg'), layer('mg'), area(), solid(), 'replace', 'bean'],
            E: () => [sprite('bookshelf'), layer('bg'), layer('mg'), area(), solid(), 'book' , 'replace-wall', {book: 'manual'}],
            F: () => [sprite('bookshelf'), layer('bg'), layer('mg'), area(), solid(), 'book' , 'replace-wall', {book: 'bit1'}],
            G: () => [sprite('bookshelf'), layer('bg'), layer('mg'), area(), solid(), 'book' , 'replace-wall', {book: 'bit2'}],
            H: () => [sprite('bookshelf'), layer('bg'), layer('mg'), area(), solid(), 'book' , 'replace-wall', {book: 'bit3'}],
            I: () => [sprite('column'), layer('mg'), area(), solid(), 'replace'],
            J: () => [sprite('bookshelf'), layer('mg'), area(), solid(), 'book', 'replace-wall', {book: 'bit4'}],
            K: () => [sprite('couch'), layer('mg'), area(), solid(), 'replace-wall'],
            L: () => [sprite('button'), layer('mg'), area(), solid(), 'button', 'replace-wall', {replaceNotSolid:true}],
            M: () => [sprite('monmach'), {frame: 0}, area(), solid(), layer('mg'), 'monmach'],
            N: () => [sprite('ghoulie'), {frame: 0}, area({scale:.6}), solid(), layer('mg'), 'ghoulie', 'replace', 'destructible', 'hurts', { dir: -1, timer: 0, expSpr:'bone'  }],
            O: () => [sprite('left-wall'), area(), solid(), 'wall', 'replace', 'destructible', ],
            P: () => [sprite('switch'), {frame: 0}, area(), solid(), layer('mg'), 'replace', 'switch', {bit:1}],
            Q: () => [sprite('switch'), {frame: 0}, area(), solid(), layer('mg'), 'replace', 'switch', {bit:2}],
            R: () => [sprite('switch'), {frame: 0}, area(), solid(), layer('mg'), 'replace', 'switch', {bit:3}],
            S: () => [sprite('switch'), {frame: 0}, area(), solid(), layer('mg'), 'replace', 'switch', {bit:4}],
            T: () => [sprite('shelf'), layer('mg'), 'replace-wall'],
            U: () => [sprite('slime', {anim: "idle"}), {frame: 0}, area({scale:.6}), solid(), layer('mg'), scale(2),  'slime', 'replace', 'hurts', { state: 'idle', dir:{x:1,y:1},  timer: 0, ready: true}],
            W: () => [sprite('web'), layer('fg'), area(), 'replace', 'destructible'],
            X: () => [sprite('web2'), layer('fg'), area(), 'replace', 'destructible'],
            Y: () => [sprite('web'), layer('fg'), area(), 'replace', 'destructible', 'trigger-spider'],
            Z: () => [sprite('web2'), layer('fg'), area(), 'replace', 'destructible', 'trigger-spider'],
            '!': () => [sprite('spider'), {anim:'Walk-L'}, area({scale:.6}), solid(), layer('mg'), 'spider', 'replace', 'destructible', 'hurts', { dir: -1, timer: 0 }],
            
            '>': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: '>'
            }],
            '<': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: '<'
            }],
            '^': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: '^'
            }],
            'V': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: 'v'
            }],
            '/': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: '/'
            }],
            '\\': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: '\\'
            }],
            '[': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: '['
            }],
            ']': () => [sprite('top-door'), area(), layer('mg'), solid(), 'door', 'replace', {
                doorLookup: ']'
            }],
            1: () => [sprite('stairs-up'), layer('mg'), area(), 'stairs', 'replace', {
                stairLookup: 1
            }],
            2: () => [sprite('stairs-dn'), layer('mg'), area(), 'stairs', 'replace', {
                stairLookup: 2
            }],
            3: () => [sprite('stairs-up'), layer('mg'), area(), 'stairs', 'replace', {
                stairLookup: 3
            }],
        }
        if(gamestate.mmFound){
            levelCfg.D = () => [sprite('bed2'), layer('mg'), area(), solid(), 'replace', 'bean'];
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
            dialog('Yawn... Another fine morning... TO MAKE THOSE MISERABLE VILLIAGERS PAY!\n\nHAHAHAHA!\n\nTo the Monster Maker Machine!',
                player,
                player.pos,
            )
      player.play("Laugh")
        }else{
            player.play("Idle")

        }

        camPos(startX, startY)
        player.onUpdate(() => {
            //console.log(player.pos)
            if(player.dead){
                return
            }
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
            const doorMapping = doorMappings[level][d.doorLookup];
            let LockFlag = true;
            if(doorMapping&&doorMapping.keys){
                doorMapping.keys.forEach((callback)=>{
                    if(callback()){
                        LockFlag = false;
                    }
                })
            }else{
                LockFlag = false
            }
            if(!LockFlag){
                destroy(d)
                wait(.2, () => {
                    go('mansion', {
                        level: doorMapping.targetLevel,
                        //score: scoreLabel.value,
                        startX: doorMapping.targetX,
                        startY: doorMapping.targetY,
                    })
                })    
            }
        })
        player.onCollide('stairs', (d) => {
            const stairMapping = stairMappings[level][d.stairLookup];
            let LockFlag = true;
            if(stairMapping&&stairMapping.keys){
                stairMapping.keys.forEach((callback)=>{
                    if(callback()){
                        LockFlag = false;
                    }
                })
            }else{
                LockFlag = false
            }
            if(!LockFlag){
                go('mansion', {
                    level: stairMapping.targetLevel,
                    //score: scoreLabel.value,
                    startX: stairMapping.targetX,
                    startY: stairMapping.targetY,
                })
            }
        })
        player.onCollide('book', (m) => {
            bookMappings[m.book]();
        });
        player.onCollide('button', (m) => {
            if(!m.pressed){
                m.pressed = true
                m.frame=1
                buttonsPressed++
                //dialog(buttonsPressed+' buttons activated', player, m.pos)
                shake(5)
            }
        });
        player.onCollide('monmach', (m) => {
                if(!m.open){
                shake(10,5)
                wait(1, ()=>{
                    if(!gamestate.bit1&&!gamestate.bit2&&!gamestate.bit3&&!gamestate.bit4){
                        gamestate.mmFound=true
                        dialog('Ah the Monster Maker Machine. How Lovely. It seems to be ready to accept a cofiguration. Now I know those bit switches are around this old place somewhere.. . Perhaps I should head to the Library to refresh myself on the Users\' Manuals', 
                            player, 
                            {x:m.pos.x+96, y:m.pos.y+64}
                        )    
                    }else{
                        let monByte = '0000'
                        if(gamestate.bit1) monByte = monByte.replaceAt(0, '1')
                        if(gamestate.bit2) monByte = monByte.replaceAt(1, '1')
                        if(gamestate.bit3) monByte = monByte.replaceAt(2, '1')
                        if(gamestate.bit4) monByte = monByte.replaceAt(3, '1')
                        dialog('The Monster Maker Machine is configured with the following Monster Byte:\n\n'+monByte+'\n\n', 
                            player, 
                            {x:m.pos.x+96, y:m.pos.y+64}
                        )    

                    }
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
        player.onCollide('trigger-spider', (m) => {
            let spider = add([sprite('spider', {anim:'Drop'}), pos(player.pos.x+rand(64)-32, player.pos.y+rand(64)-height()), area({scale:.6}), layer('ui'), 'spider-down', 'hurts', 'destructible', { dir: {x:0, y:0}, timer: 3, webs:[]}])
        });

        keyDown('left', () => {
            if(dialogOpen || player.dead) return
            player.move(-MOVE_SPEED, 0)
            player.dir.x = -1;
            player.setState('W-Walk')
            var currCam = camPos();
            if (currCam.x - player.pos.x > width() / 4) {
                camPos(player.pos.x + width() / 4, currCam.y);
            }
        })

        keyDown('right', () => {
            if(dialogOpen || player.dead) return
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
            if(dialogOpen || player.dead) return
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
            if(dialogOpen || player.dead) return
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
            if(!player.dead) player.setState('Idle')
        })
        keyRelease(['left', 'right'], () => {
            //keystate = ''
            player.dir.x = 0
            if(!player.dead) player.setState('Idle')
        })
        keyRelease('space', ()=>{
            //keystate = ''
        })
        function spawnSpell(p) {
            const obj = add([sprite('explosion'), pos(p), area(), origin('center'), 'spell'])
            wait(.5, () => {
                if (player.state == 'Idle' && !player.dead) {
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
            if(!dialogOpen && !player.dead){
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
        onUpdate('replace-wall', (s) => {
            if(!s.tilereplaced){
                add([
                    sprite('top-wall'), 
                    layer('bg'),
                    pos(s.pos.x, s.pos.y),
                    area(),
                    !s.replaceNotSolid?solid():'',
                ])
                s.tilereplaced = true;
            } 
        
        })
        const die = ()=>{
            if (player.dead) return
            player.dead = true;
            player.play('Die', {speed:15});
            shake(5)
            wait(1.5,()=>{
                player.dead = false
                go ('mansion', { level: 0, score: 0, startX: 192, startY:216, newGame:true })
            })
        }
        const addProjectile = (spr, ps, vel, lifespan, effect)=>{
            const p = add([
                sprite(spr),
                area(),
                pos(ps),
                layer('fg'),
                vel,
                'projectile',
                !effect?'destructible':'',
                !effect?'hurts':''
            ])
            p.play('idle', {speed:30})
            wait(lifespan, ()=>{
                destroy(p)
            })
        }
        const addExplosion = (spr, p, vel, lifespan, count)=>{
            for (let index = 0; index < count; index++) {
                const xv = (rand(vel.xv*2)-vel.xv)
                const yv = (rand(vel.yv)-vel.yv)
                addProjectile(spr, p, {xv:xv, yv:yv}, lifespan, true)
            }
            if(spr=='bone') addProjectile('skull', p, {xv:0, yv:-200}, lifespan, true)
        }
        onUpdate('projectile', (p)=>{
            p.move(p.xv, p.yv)
        })
        player.onCollide('hurts', (s) => {
            if (player.dead) return
            if(!player.dead){
                die();
            }
        })
        player.onCollide('switch', (s) => {
            let bitKey = 'bit'+s.bit;
            dialog('Do you want to set bit '+s.bit+'?',
            player,
            player.pos,
            ['Set','Unset'],
            (i)=>{
                if(!i){
                    gamestate[bitKey] = 1
                    s.frame = 1
                }else{
                    gamestate[bitKey] = 0
                    s.frame = 0
                }
            }
            )
        })
        onCollide('spell', 'destructible', (k,s) => {
            //wait(1, () => {
            //  destroy(k)
            //})
            if(s.expSpr) addExplosion(s.expSpr , s.pos,  {xv:200, yv:200}, .5, 5)
            destroy(s)
        })      
        onCollide('spell', 'slime', (k,s) => {
            //wait(1, () => {
            //  destroy(k)
            //})
            if(!s.ready) return
            if(s.small){
                destroy(s)
                addExplosion('slime-drop', s.pos, {xv:300, yv:300}, .5, 2)
            }else{
                s.small = true;
                const count = rand(3)+3
                for (let index = 0; index < count; index++) {
                    let ns = add([sprite('slime', {anim:'idle'}), pos(s.pos.x+rand(64)-32, s.pos.y+rand(64)-32), area({scale:.6}), solid(), layer('fg'), 'slime', 'hurts', { dir: {x:0, y:0}, timer: 3, small: true, ready: false}])
                    wait(.6, ()=>{
                        ns.ready = true;
                    })
                }
                addExplosion('slime-drop', s.pos,  {xv:300, yv:300}, .5, 5)
                s.scale = 1;
                s.play('idle')
            }
        })      
        onUpdate('slime', (s)=>{
            if(!s.ready) return
            if(s.timer<0){
                s.timer = 2
                if(player.pos.x-s.pos.x>0 &&player.pos.y-s.pos.y>0){
                    //player is below and to the right of slime
                    if(rand(10)>5){
                        s.dir = {x:1, y:0}
                        s.state = 'walk-e'
                    }else{
                        s.dir = {x:0, y:1}
                        s.state = 'walk-s'
                    }
                }else if(player.pos.x-s.pos.x<=0 && player.pos.y-s.pos.y<=0){
                    //player is above and to the left of slime                
                    if(rand(10)>5){
                        s.dir = {x:-1, y:0}
                        s.state = 'walk-w'
                    }else{
                        s.dir = {x:0, y:-1}
                        s.state = 'walk-n'
                    }
                }else if(player.pos.x-s.pos.x<=0 && player.pos.y-s.pos.y>0){
                    //player is below and to the left of slime                
                    if(rand(10)>5){
                        s.dir = {x:-1, y:0}
                        s.state = 'walk-w'
                    }else{
                        s.dir = {x:0, y:1}
                        s.state = 'walk-s'
                    }
                }else if(player.pos.x-s.pos.x>0 && player.pos.y-s.pos.y<=0){
                    //player is above and to the right of slime                
                    if(rand(10)>5){
                        s.dir = {x:1, y:0}
                        s.state = 'walk-e'
                    }else{
                        s.dir = {x:0, y:-1}
                        s.state = 'walk-n'
                    }
                }    
            }
            s.timer -= dt()
            if(s.state!=s.playing){
                s.play(s.state)
                s.playing = s.state
            }
            console.log(s.dir)
            s.move(s.dir.x * 10, s.dir.y * 10)
        })
        onUpdate('spider-down', (s)=>{
            let w = add([sprite('web-line'), pos(s.pos.x+32, s.pos.y+4), area({scale:.6}), layer('ui')])
            s.move(0, 270)
            s.webs.push(w)
            if(s.pos.y>player.pos.y-16){
                s.webs.forEach((w, i)=>{
                    wait(.004*i, ()=>{
                        destroy(w)
                    })
                })
                destroy(s)
                let spider = add([sprite('spider', {anim:'Drop'}), pos(s.pos.x, s.pos.y), area({scale:.6}), layer('mg'), solid(), 'spider', 'hurts', 'destructible', { dir: 0, timer: 1, small: true, ready: false}])
                if(player.pos.x>s.pos.x){
                    spider.dir=1
                    spider.play('Walk-R')
                }else{
                    spider.dir=-1
                    spider.play('Walk-L')
                }

            }
        })
        onUpdate('spider', (s)=>{
            s.move(s.dir * 150, 0)
            s.timer -= dt()
            if (s.timer <= 0) {
                s.dir = -s.dir
                if(s.dir > 0){
                  s.play('Walk-R')
                }else{
                  s.play('Walk-L')
                }
                s.timer = rand(1)+1
              }       
        })
        
        onUpdate('ghoulie', (g)=>{
            g.move(0, g.dir * 50)
            g.timer -= dt()
            if(!g.shooting && Math.abs(player.pos.y-g.pos.y)<20){
                if(player.pos.x - g.pos.x > 0){
                    g.play('throw-e')
                    addProjectile('bone', g.pos, {xv:100, yv:0}, 3)
                }else{
                    g.play('throw-w')
                    addProjectile('bone', g.pos, {xv:-100, yv:0}, 3)
                }
                g.shooting = true
                g.timer = .25
            }
            if (g.timer <= 0) {
              g.shooting = false;
              g.dir = -g.dir
              if(g.dir > 0){
                g.play('walk-s')
              }else{
                g.play('walk-n')
              }
              g.timer = rand(2)+1
            }     
        })

    })

    go ('mansion', { level: 0, score: 0, startX: 192, startY:216, newGame:true })