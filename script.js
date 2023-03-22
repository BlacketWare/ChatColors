const createModal = (title, content, buttons) => {
  $('body').append(`<div class="modal"><div class="modal-container"><div class="modal-header" style="width: 100%; text-align: center; justify-content: center;">${title}</div><div class="modal-content">${content}</div><div class="modal-buttons"></div></div></div>`);
  Object.keys(buttons).forEach(button => {
    document.querySelector('.modal-buttons').appendChild(document.createElement('div')).classList.add('button');
    document.querySelector('.modal-buttons').lastChild.innerHTML = button;
    document.querySelector('.modal-buttons').lastChild.addEventListener('click', buttons[button]);
  });
};

const codes = {
  'rainbow': `localStorage.setItem('chatColor', 'gradient=[25deg: #f20505, #f26c05, #f2da05, #74f205, #05f28b, #05a7f2, #050df2]')`,
  'shades of grey': `localStorage.setItem('chatColor', 'gradient=[25deg: #fcfcfc, #050505]')`,
  'firey red': `localStorage.setItem('chatColor', 'gradient=[25deg: #f20505, #f26c05, #f2da05]')`,
  'bright cyan': `localStorage.setItem('chatColor', 'gradient=[25deg: #b5fffd, #8cfffc, #77ebfc, #68ceed]')`,
  'rich gold': `localStorage.setItem('chatColor', 'gradient=[25deg: #f2d64b, #967e0b]')`,
  'death': `localStorage.setItem('chatColor', 'gradient=[25deg: #ed1005, #0a0100]')`,
  'watching the sunset': `localStorage.setItem('chatColor', 'gradient=[195deg: #FFA41C, #FF24BD]')`,
  'beach': `localStorage.setItem('chatColor', 'gradient=[75deg: #FAFF5C, #98FFF5]')`,
  'striped': `localStorage.setItem("chatColor", "gradient=[165deg: #5E38F7, #000000, #5E38F7, #000000, #5E38F7, #000000, #5E38F7]")`,
  'passion': `localStorage.setItem('chatColor', 'gradient=[100deg: #fc1303, #9e0d03]')`,
  'blood orange': `localStorage.setItem('chatColor', 'gradient=[100deg: #fa7b05, #ad5605]')`,
  'ice cold': `localStorage.setItem('chatColor', 'gradient=[25deg: #bef7e7, #b5f5ec, #abeaed, #a5e7f0, #9edaf0]')`,
  'cotton candy': `localStorage.setItem('chatColor', 'gradient=[40deg: #ffbcd9, #A0D9EF]')`,
  'pretty in pastel': `localStorage.setItem('chatColor', 'gradient=[90deg: #ffb3ba, #ffdfba, #ffffba, #baffc9, #bae1ff]')`,
  'preposterous purple': `localStorage.setItem('chatColor', 'gradient=[right: #e0c3fc, #8ec5fc]')`,
};

window.copy = async (c) => {
  await navigator.clipboard.writeText(codes[c]);
};

window.transBG = (c) => {
  let bg = new TimelineMax();
  bg.to('#gradName', {
    opacity: 0,
    scaleX: 0,
    ease: Expo.easeIn
  }).to('.background', {
    duration: 0.5,
    ease: Expo.easeIn,
    opacity: 0,
    scaleY: 0,
    scaleX: 0,
    transformOrigin: 'center bottom'
  }).call(() => {
    document.querySelector('.background').style.background = parseCode(c);
    document.querySelector('#gradName').textContent = c;
  }).to('#gradName', {
    opacity: 1,
    scaleX: 1,
    ease: Expo.easeOut
  }).to('.background', {
    duration: 0.5,
    ease: Expo.easeOut,
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    transformOrigin: 'center bottom'
  });
};

const parseCode = (g) => {
  let code = codes[g] ? codes[g] : g;
  let raw = code.split('[')[1].split(']')[0].split(': ');
  let deg = raw[0];
  let colors = raw[1].split(', ');
  let dir;
  if (!deg.endsWith('deg')) dir = 'to ' + ((deg === 'up') ? 'top' : (deg === 'down') ? 'bottom' : (deg === 'right') ? 'right' : deg);
  else dir = deg;
  return 'linear-gradient(' + dir + ', ' + colors.join(', ') + ')';
};

Object.keys(codes).forEach(code => {
  $('.prem-btns').append(`<button style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center; min-width: 2vw; min-height: 2vw; aspect-ratio: 1/1; box-sizing: border-box; border: 2px solid white; border-radius: 50%; padding: 0px !important;" onclick="transBG('${code}'); copy('${code}')" class="button"><div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; background: ${parseCode(code)}; border-radius: 50%; min-width: 2.7vw !important; min-height: 2.7vw !important; aspect-ratio: 1/1 !important; margin: 0px !important; padding: 0px !important;"></div></button>`)
});

let cAngle = 9;
let angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360];

let ap = document.getElementById('anglePicker');

ap.onclick = () => {
  if (cAngle !== (angles.length - 1)) {
    cAngle++;
    ap.style.transform = 'rotate(' + angles[cAngle] + 'deg)';
  } else cAngle = 0;
};


window.genG = async () => {
  let tl = document.getElementById('timeline');
  let ch = [...tl.children];

  let ang = angles[cAngle];
  ang = ang === 0 ? 'up' : ang === 90 ? 'right' : ang === 180 ? 'down' : ang === 270 ? 'left' : ang === undefined || ang === 'undefined' ? 'up' : ang + 'deg';

  let grS = [];

  for (let x of ch) {
    grS.push(x.getAttribute('style').split(';').filter(x => x.split(':')[0] === '--color')[0].split(':')[1]);
  }

  await navigator.clipboard.writeText("localStorage.setItem('chatColor', '"+'gradient=['+ang+': '+grS.join(', ')+']'+"')");

  createModal('Text copied to your clipboard.', `<span style="font-family: \'Courier New\', monospace; -webkit-text-fill-color: transparent; background: ${parseCode("gradient=["+ang+": "+grS.join(', ')+"]")}; -webkit-background-clip: text; background-clip: text;">Text looks like this.</span>`, {
    'Close': () => document.querySelector('.modal').remove()
  })
};
