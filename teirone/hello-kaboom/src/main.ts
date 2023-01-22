import { Sprite } from 'pixi.js';
import './style.css'
import kaboom from 'kaboom';
// import $ from "jquery"

const app = document.querySelector<HTMLDivElement>('#app')!;

kaboom({
  global: true,
  width: 960,
  height: 540,
  scale: 1,
  debug: true,
  background: [30, 25, 240],
});

const MOVE_SPEED = 120;

loadRoot('../sprites/');
loadSprite("link-left", "link-left.png");
loadSprite("link-right", "link-right.png");
loadSprite("link-down", "link-down.png");
loadSprite("link-up", "link-up.png");
loadSprite('left-wall', 'left-wall.png');
loadSprite('top-wall', 'top-wall.png');
loadSprite('bottom-wall', 'bottom-wall.png');
loadSprite('right-wall', 'right-wall.png');
loadSprite('bottom-left-wall', 'bottom-left-wall.png');
loadSprite('bottom-right-wall', 'bottom-right-wall.png');
loadSprite('top-left-wall', 'top-left-wall.png');
loadSprite('top-right-wall', 'top-right-wall.jpg');
loadSprite('top-door', 'top-door.png');
loadSprite('fire-pot', 'fire-pot.png');
loadSprite('left-door', 'left-door.png');
loadSprite('stairs', 'stairs.png');
loadSprite('lanterns', 'lanterns.png');
loadSprite('slicer', 'slicer.png');
loadSprite('skeletor', 'skeletor.png');
loadSprite('kaboom', 'kaboom.png');
loadSprite('bg', 'bg.png');

scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const scoreLabel = add([
    text("0"),
    pos(400, 475),
    layer('ui'),
    {
      value: score
    }
  ])

  add([
    text(showLevel(level)),
    pos(100, 495),
    layer('ui'),
    scale(0.4),
  ])

  const player = add([
    sprite('link-right'),
    pos(5, 190),
    solid(),
    area(),
    scale(0.565),
    {
      dir: vec2(1, 0)
    }
  ])

  const maps = [
    [
    ' ;--)--)--T-)--,',
    ' >             <',
    ' >   S         <',
    ' > K     (     <',
    ' >             <',
    ' l            S<',
    ' >       (     <',
    ' >   S         <',
    ' >       K    Z<',
    ' `===)===)==)==!'
  ],
    
  [ ' ;--)--)--)--)-T-,',
    ' >           S   <',
    ' l    K   (      <',
    ' >               <',
    ' >   K   (       <',
    ' >              S<',
    ' >  K     (      <',
    ' >        S (    <',
    ' >    K         Z<',
    ' `===)===)==)====!'
  ]
  
  ]

  const levelConfig = {
    width: 48,
    height: 48,
    '>': () => [sprite('left-wall'), 'wall', area(), solid()],
    '`': () => [sprite('bottom-left-wall'), area(), solid()],
    '!': () => [sprite('bottom-right-wall'), area(), solid()],
    '<': () => [sprite('right-wall'), 'wall', area(), solid()],
    '=': () => [sprite('bottom-wall'), 'wall', area(), solid()],
    '-': () => [sprite('top-wall'), 'wall', area(), solid()],
    ',': () => [sprite('top-right-wall'), area(), solid()],
    ';': () => [sprite('top-left-wall'), area(), solid()],
    'l': () => [sprite('left-door'), 'door', 'wall', area()],
    'T': () => [sprite('top-door'), 'door', 'next-level', area()],
    'Z': () => [sprite('stairs'), 'next-level', area()],
    'S': () => [sprite('slicer'), 'dangerous', 'slicer', scale(0.7), 'wall',  { dir: -1 },  area()],
    'K': () => [sprite('skeletor'), 'dangerous','skeletor', 'wall', { dir: -1, timer: 0 }, area()],
    ')': () => [sprite('lanterns'), 'dangerous', 'wall', area(), solid()],
    '(': () => [sprite('fire-pot'), 'wall', "dangerous", area(), solid()],
  }

  addLevel(maps[level[1]], levelConfig);
  // add([sprite('bg'), layer('bg')]);

  function showLevel(gamelevel: [string, number]): string {
    return ` ${gamelevel[0]} ${gamelevel[1]}`
  }

  player.onCollide("next-level", () => {
    nextLevel();
  })

  function nextLevel() {
    level[1] < maps.length - 1 ?  level[1] += 1 : level[1] = 0;
    go("game", {
      level: level,
      score: scoreLabel.value,
    })
  }

  onKeyDown('left', () => {
    player.move(-MOVE_SPEED, 0);
    player.dir = vec2(-1, 0);
  })
  onKeyDown('a', () => {
    player.move(-MOVE_SPEED, 0);
    player.dir = vec2(-1, 0);
  })

  onKeyDown('right', () => {
    player.move(MOVE_SPEED, 0);
    player.dir = vec2(1, 0);
  })
  onKeyDown('d', () => {
    player.move(MOVE_SPEED, 0);
    player.dir = vec2(1, 0);
  })
  onKeyDown('up', () => {
    player.move(0, -MOVE_SPEED);
    player.dir = vec2(1, -1);
  })
  onKeyDown('w', () => {
    player.move(0, -MOVE_SPEED);
    player.dir = vec2(1, -1);
  })
  onKeyDown('down', () => {
    player.move(0, MOVE_SPEED);
    player.dir = vec2(0, 1);
  })
  onKeyDown('s', () => {
    player.move(0, MOVE_SPEED);
    player.dir = vec2(0, 1);
  })

  onKeyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })

  player.onCollide('door', (d) => {
    destroy(d)
  })

  function spawnKaboom(p) {
   const obj = add([sprite('kaboom'), pos(p), area(), 'kaboom']);
   wait(0.5, () => {
    destroy(obj)
   })
  }

  onCollide('kaboom', 'skeletor', (k, s) => {
    shake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s);
    score += 1
    scoreLabel.value = score
    scoreLabel.text = score
  })

  const SLICER_SPEED = 125;

  onUpdate('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0);
  })

  onCollide('slicer', 'wall', (s)  => {
    s.dir = -s.dir
  })

  const SKELETOR_SPEED = 60;

  onUpdate('skeletor', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -=dt()
    if(s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  onCollide('skeletor', 'wall', (s) => {
    s.dir = -s.dir
  })

  player.onCollide("dangerous", () => {
    shake(10)
      player.destroy()
    wait(2, () => {
      go('lose', { score: scoreLabel.value })
    })
  })
})




scene("lose", ({score}) => {
  add([
    text(score),
    pos(width()/2, height() - 50) 
  ])
})

go("game", { level: ["castle floor", 0], score: 0 });

app.innerHTML = "<h1>Kaboom</h1>";
