const { createCanvas } = require('canvas');
const fs = require('fs');
const W=1280, H=720;
const canvas = createCanvas(W,H);
const ctx = canvas.getContext('2d');

// --- Day 02 Dialogue Script ---
// frame: কখন, text: কি বলবে, mouth: কত বড় হা করবে
const script = [
  { start: 0, end: 20, text: "", mouth: "closed" },
  { start: 20, end: 35, text: "মা,", mouth: "small" },
  { start: 35, end: 60, text: "মা, টাকা", mouth: "big" },
  { start: 60, end: 95, text: "মা, টাকা দাও", mouth: "small" },
  { start: 95, end: 120, text: "মা, টাকা দাও!", mouth: "big" },
];

for(let frame=0; frame<120; frame++){
  // bg
  ctx.fillStyle='#FFF8DC'; ctx.fillRect(0,0,W,H);

  // current dialogue
  const line = script.find(s => frame>=s.start && frame < s.end);

  // head
  ctx.beginPath(); ctx.arc(640,380,100,0,Math.PI*2);
  ctx.fillStyle='#FFDAB9'; ctx.fill(); ctx.lineWidth=4; ctx.strokeStyle='black'; ctx.stroke();

  // eyes
  const isBlink = frame % 80 > 76;
  ctx.fillStyle='black';
  if(isBlink){
    ctx.fillRect(600,360,30,4); ctx.fillRect(650,360,30,4);
  } else {
    ctx.beginPath(); ctx.arc(615,360,10,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(665,360,10,0,Math.PI*2); ctx.fill();
  }

  // --- MOUTH LOGIC (Day 02 Magic) ---
  ctx.fillStyle='black';
  if(line.mouth === 'closed'){
    ctx.beginPath(); ctx.moveTo(620,410); ctx.lineTo(660,410); ctx.stroke();
  } else if(line.mouth === 'small'){
    ctx.beginPath(); ctx.ellipse(640,415,12,8,0,0,Math.PI*2); ctx.fill();
  } else { // big
    ctx.beginPath(); ctx.ellipse(640,420,18,16,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='darkred'; ctx.beginPath(); ctx.ellipse(640,425,10,6,0,0,Math.PI*2); ctx.fill();
  }

  // dialogue bubble
  if(line.text){
    ctx.fillStyle='white'; ctx.strokeStyle='black'; ctx.lineWidth=3;
    ctx.fillRect(500,100,350,70); ctx.strokeRect(500,100,350,70);
    ctx.fillStyle='black'; ctx.font='bold 32px sans-serif';
    ctx.fillText(line.text, 520, 145);
  }

  fs.writeFileSync(`./frame_${String(frame).padStart(3,'0')}.png`, canvas.toBuffer('image/png'));
}
console.log("Day 02: Talking rendered!");
