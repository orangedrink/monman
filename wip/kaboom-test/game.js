//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    background: [36, 36, 68, 1],
  })
  
  // Speeds
  const MOVE_SPEED = 120
  const SLICER_SPEED = 100
  const SKELETOR_SPEED = 60
  
  // Game Logic
  
  loadSprite('link-going-left', '1Xq9biB.png')
  loadSprite('link-going-right', 'yZIb8O2.png')
  loadSprite('link-going-down', 'tVtlP6y.png')
  loadSprite('link-going-up', 'UkV0we0.png')
  loadSprite('left-wall', 'rfDoaa1.png')
  loadSprite('top-wall', 'QA257Bj.png')
  loadSprite('bottom-wall', 'vWJWmvb.png')
  loadSprite('right-wall', 'SmHhgUn.png')
  loadSprite('bottom-left-wall', 'awnTfNC.png')
  loadSprite('bottom-right-wall', '84oyTFy.png')
  loadSprite('top-left-wall', 'xlpUxIm.png')
  loadSprite('top-right-wall', 'z0OmBd1.png')
  loadSprite('top-door', 'U9nre4n.png')
  loadSprite('fire-pot', 'I7xSp7w.png')
  loadSprite('left-door', 'okdJNls.png')
  loadSprite('lanterns', 'wiSiY09.png')
  loadSprite('slicer', 'c6JFi5Z.png')
  loadSprite('skeletor', 'Ei1VnX8.png')
  loadSprite('kaboom', 'o9WizfI.png')
  loadSprite('stairs', 'VghkL08.png')
  loadSprite('stairs-dn', 'VghkL08-2.png')
  loadSprite('bg', 'u4DVsx6.png')
  loadSprite('slime', 'slime.png', {
    sliceX: 3,
    sliceY: 3,
    anims: {
        idle: { from: 0, to: 0 },
        pulse: { from: 0, to: 8 },
    }
  })
  loadAseprite("doctor", "doctor.png", "doctor.json");
  scene('game', ({ level, score, startX, startY }) => {
    layers(['bg', 'mg', 'fg', 'obj', 'ui'], 'obj')
  
    const maps = [
        [
            'yccccccccw',
            'a        b',
            'a        b',
            'a        b',
            'a        b',
            'a        b',
            'a      2 b',
            'a        b',
            'xddddddddz',
      ],
      [
        'yccccc^ccw',
        'a        b',
        'a      * b',
        'a        b',
        'a        b',
        'a        b',
        'a   *    b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        b',
        'a        cccccccccccccccccccccccccccccccccccccccccccccccccccw',
        'a                                                 *         b',
        'a                                                           b',
        'a                                                           b',
        'a     *                                                     b',
        'a                                                           b',
        'xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddz',
      ],
      [
        'ycccccccccccccccccccc1cccccccccccccccccccw',
        'a                                        b',
        'a                                        b',
        'a                                        b',
        'a                                        b',
        'a   }                                    b',
        'a                                        b',
        'xdddddvddddddddddddddddddddddddddddddddddz',
      ],
      [
        'yccccccccw',
        'a        b',
        ')    1   )',
        'a      } b',
        'a        b',
        'a    2   b',
        ')   }    )',
        'a        b',
        'xddddddddz',
      ],
      [
        'yccccccccw',
        'a        b',
        ')    1   )',
        'a        b',
        'a        b',
        'a    2   b',
        ')      } )',
        'a}}      b',
        'xddddddddz',
      ],
      [
        'yccccccccw',
        'a        b',
        ')        )',
        'a }     }b',
        'a        b',
        'a}   2   b',
        ')      } )',
        'a        b',
        'xddddddddz',
      ],
    ]
    const stairMappings = {
        0:{
            2: { targetLevel:1, targetX:120, targetY:100 }
        },
        2:{
            1: { targetLevel:3, targetX:520, targetY:500 }
        },
        3:{
            1:{ targetLevel:4, targetX:520, targetY:420 },
            2:{ targetLevel:2, targetX:520, targetY:420 },
        },
        4:{
            1:{ targetLevel:5, targetX:520, targetY:420 },
            2:{ targetLevel:3, targetX:520, targetY:420 },
        },
        5:{
            2:{ targetLevel:4, targetX:520, targetY:420 },
        },
    }
    const levelCfg = {
      width: 64,
      height: 64,
      a: ()=>[sprite('left-wall'), area(), solid(), 'wall'],
      b: ()=>[sprite('right-wall'), area(), solid(), 'wall'],
      c: ()=>[sprite('top-wall'), area(), solid(),  layer('bg'), 'wall'],
      d: ()=>[sprite('bottom-wall'), area(), solid(), layer('fg'), 'wall'],
      w: ()=>[sprite('top-right-wall'), area(), solid(), 'wall'],
      x: ()=>[sprite('bottom-left-wall'), area(), solid(), 'wall'],
      y: ()=>[sprite('top-left-wall'), area(), solid(), 'wall'],
      z: ()=>[sprite('bottom-right-wall'), area(), solid(), 'wall'],
      ' ': ()=>[sprite('bg'), layer('bg')],
      '%': ()=>[sprite('left-door'), area(), solid()],
      '^': ()=>[sprite('top-door'), area(), 'door', { door:true, targetLevel:2, targetX:520, targetY:120 }],
      'v': ()=>[sprite('top-door'), area(), 'door', { door:true, targetLevel:0, targetX:320, targetY:150 }],
      1: ()=>[sprite('stairs'), layer('mg'), area(), 'stairs', { stairLookup:1 }],
      2: ()=>[sprite('stairs-dn'), layer('mg'), area(), 'stairs', { stairLookup:2 }],
      '*': ()=>[sprite('slicer'), area(), 'slicer', { dir: -1 }, 'dangerous'],
      '}': ()=>[sprite('skeletor'), area(), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
      ')': ()=>[sprite('lanterns'), area(), solid()],
      '(': ()=>[sprite('fire-pot'), area(), solid()],
    }
    addLevel(maps[level], levelCfg)
  
    //add([sprite('bg'), layer('bg')])
  
    /*const scoreLabel = add([
      text('0'),
      pos(400, 450),
      layer('ui'),
      {
        value: score,
      },
      scale(2),
    ])
  
    add([text('level ' + parseInt(level + 1)), pos(400, 465), scale(2)])*/

    const player = add([
      sprite('doctor'),
      pos(startX, startY),
      {
        dir: vec2(0, 0),
        animDir: vec2(0, 0),
        state: 'Laugh',
        setState: function(state){
            if(player.state==state) return;
            player.state=state;
            if(player.state=='Laugh'){
                player.play(state)
                wait(2,()=>{
                    if(player.state=='Laugh') player.setState('Idle')
                })
            } else if(player.state=='Idle'){
                player.play(state)
            }
        }
      },
      area({scale:.5}),
      solid(),
      scale(1.5),
      origin('center'),
      layer('mg')
    ])

    player.play("Idle")

    camPos(startX,startY)
    player.onUpdate(() => {
        if(player.dir.y != player.animDir.y ||player.dir.x != player.animDir.x ){
            player.animDir.x = player.dir.x;
            player.animDir.y = player.dir.y;
            console.log(player.animDir.x)
            console.log(player.animDir.y)
            if(player.dir.x==-1&&player.dir.y==-1){
                player.play('NW-Walk')
            }else if(player.dir.x==1&&player.dir.y==-1){
                player.play('NE-Walk')
            }else if(player.dir.x==1&&player.dir.y==1){
                player.play('SE-Walk')
            }else if(player.dir.x==-1&&player.dir.y==1){
                player.play('SW-Walk')
            }else if(player.dir.x==0&&player.dir.y==1){
                player.play('S-walk')
            }else if(player.dir.x==0&&player.dir.y==-1){
                player.play('N-Walk')
            }else if(player.dir.x==-1&&player.dir.y==0){
                player.play('W-Walk')
            }else if(player.dir.x==1&&player.dir.y==0){
                player.play('E-Walk')
            }else if(player.dir.x==0&&player.dir.y==0){
                player.play('Idle')
            }
        }

    })
  
    player.onCollide('door', (d) => {
    //parse level data to find level and xy
        destroy(d)
        wait(.2, () => {
            go('game', {
                level: d.targetLevel,
                //score: scoreLabel.value,
                startX: d.targetX,
                startY: d.targetY,
            })    
        })
    })
    player.onCollide('stairs', (d)  => {
        //parse level data to find level and xy
            console.log(d)
            wait(.2, () => {
                go('game', {
                    level: stairMappings[level][d.stairLookup].targetLevel,
                    //score: scoreLabel.value,
                    startX: stairMappings[level][d.stairLookup].targetX,
                    startY: stairMappings[level][d.stairLookup].targetY,
                    })    
            })
        })
    keyDown('left', () => {
      player.move(-MOVE_SPEED, 0)
      player.dir.x = -1;
      player.setState('W-Walk')
      var currCam = camPos();
      if (currCam.x - player.pos.x > width()/4 ) {
        camPos(player.pos.x+width()/4, currCam.y);
      }
    })
  
    keyDown('right', () => {
      player.move(MOVE_SPEED, 0)
      player.dir.x = 1
      player.setState('E-Walk')
      var currCam = camPos();
      if (player.pos.x - currCam.x > width()/4 ) {
        camPos(player.pos.x-width()/4, currCam.y);
      }
    })
  
    keyDown('up', () => {
      player.move(0, -MOVE_SPEED)
      player.dir.y =  -1
      player.setState('N-Walk')
      var currCam = camPos();
      if (currCam.y - player.pos.y > height()/3 ) {
        camPos(currCam.x, player.pos.y+height()/3);
      }

    })
  
    keyDown('down', () => {
      player.move(0, MOVE_SPEED)
      player.dir.y = 1
      player.setState('S-walk')
      var currCam = camPos();
      if (player.pos.y - currCam.y > height()/3 ) {
        camPos(currCam.x, player.pos.y-height()/3);
      }
    })

    keyRelease(['up', 'down', ],() => {
        player.dir.y = 0
        player.setState('Idle')              
    })
    keyRelease(['left', 'right'],() => {
        player.dir.x = 0
        player.setState('Idle')              
    })

    function spawnKaboom(p) {
      const obj = add([sprite('kaboom'), pos(p), area(), origin('center'), 'kaboom'])
      wait(1, () => {
        if(player.state=='Idle'){
            player.setState('Laugh')
        }
        destroy(obj)
      })
    }
  
    keyPress('space', () => {
      shake(4)
      spawnKaboom(player.pos.add(player.dir.scale(48)))
    })
  
    onCollide('kaboom', 'skeletor', (k,s) => {
      wait(1, () => {
        destroy(k)
      })
      destroy(s)
    })
    action('door', (s) => {
        if(!s.tilereplaced){
            add([
                sprite('bg'), 
                layer('bg'),
                pos(s.pos.x, s.pos.y)
            ])
            s.tilereplaced = true;
        } 
    
    })
    action('stairs', (s) => {
        if(!s.tilereplaced){
            add([
                sprite('bg'), 
                layer('bg'),
                pos(s.pos.x, s.pos.y)
            ])
            s.tilereplaced = true;
        } 
    
    })
    action('slicer', (s) => {
        if(!s.tilereplaced){
            add([
                sprite('bg'), 
                layer('bg'),
                pos(s.pos.x, s.pos.y)
            ])
            s.tilereplaced = true;
        } 
    
      s.move(s.dir * SLICER_SPEED, 0)
    })
  
    collides('slicer', 'wall', (s) => {
      s.dir = -s.dir
    })
  
    action('skeletor', (s) => {
      if(!s.tilereplaced){
        add([
            sprite('bg'), 
            layer('bg'),
            pos(s.pos.x, s.pos.y)
        ])
        s.tilereplaced = true;
      } 
      s.move(0, s.dir * SKELETOR_SPEED)
      s.timer -= dt()
      if (s.timer <= 0) {
        s.dir = -s.dir
        s.timer = rand(5)+3
      }
    })
  
    collides('skeletor', 'wall', (s) => {
      s.dir = -s.dir
      s.timer = rand(5)+3
    })
  
    onCollide('player', 'dangerous', () => {
      //go('lose', { score: scoreLabel.value })
    })
    
  })
  
  scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
  })

 go ('game', { level: 0, score: 0, startX: 100, startY:160})