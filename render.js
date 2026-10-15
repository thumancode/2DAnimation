const { createCanvas } = require('canvas');
const fs = require('fs');

const W=1280, H=720;
const canvas = createCanvas(W,H);
const ctx = canvas.getContext('2d');

for(let frame=0; frame<90; frame++){
  // background
  ctx.fillStyle='#FFF8DC'; ctx.fillRect(0,0,W,H);

  // head
  ctx.beginPath(); ctx.arc(640,360,100,0,Math.PI*2);
  ctx.fillStyle='#FFDAB9'; ctx.fill(); ctx.stroke();

  // eye blink logic - Day 01 এর magic
  const isBlink = frame>30 && frame<36;
  ctx.fillStyle='black';
  if(isBlink){
    ctx.fillRect(600,340,30,4);
    ctx.fillRect(650,340,30,4);
  } else {
    ctx.beginPath(); ctx.arc(615,340,10,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(665,340,10,0,Math.PI*2); ctx.fill();
  }
  // mouth
  ctx.beginPath(); ctx.arc(640,400,20,0,Math.PI);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`./frame_${String(frame).padStart(3,'0')}.png`, buffer);
}
console.log("Day 01: 90 frames rendered!");