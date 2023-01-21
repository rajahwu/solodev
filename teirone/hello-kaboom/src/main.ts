import './style.css'
import kaboom from 'kaboom';
import $ from "jquery"
import { start } from 'pm2';

const app = document.querySelector<HTMLDivElement>('#app')!;

kaboom({
  global: true,
  width: 800,
  height: 400,
  scale: 1,
  debug: true,
});

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
loadSprite('lanterns', 'lanterns.png');
loadSprite('slicer', 'slicer.png');
loadSprite('skeletor', 'skeletor.png');
loadSprite('kaboom', 'kaboom.png');
loadSprite('bg', 'bg.png');

scene("game", () => {

})

go("game");

app.innerHTML = "<h1>Kaboom</h1>";
