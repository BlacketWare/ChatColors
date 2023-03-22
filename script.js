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
  'olden': `localStorage.setItem('chatColor', 'gradient=[25deg: #fcfcfc, #050505]')`,
  'warm': `localStorage.setItem('chatColor', 'gradient=[25deg: #f20505, #f26c05, #f2da05]')`,
  'cyan': `localStorage.setItem('chatColor', 'gradient=[25deg: #b5fffd, #8cfffc, #77ebfc, #68ceed]')`,
  'gold': `localStorage.setItem('chatColor', 'gradient=[25deg: #f2d64b, #967e0b]')`,
  'death': `localStorage.setItem('chatColor', 'gradient=[25deg: #ed1005, #0a0100]')`,
  'sunset': `localStorage.setItem('chatColor', 'gradient=[195deg: #FFA41C, #FF24BD]')`,
  'beach': `localStorage.setItem('chatColor', 'gradient=[75deg: #FAFF5C, #98FFF5]')`,
  'clown': `localStorage.setItem("chatColor", "gradient=[165deg: #5E38F7, #000000, #5E38F7, #000000, #5E38F7, #000000, #5E38F7]")`,
  'red': `localStorage.setItem('chatColor', 'gradient=[100deg: #fc1303, #9e0d03]')`,
  'orange': `localStorage.setItem('chatColor', 'gradient=[100deg: #fa7b05, #ad5605]')`,
  'icy': `localStorage.setItem('chatColor', 'gradient=[25deg: #bef7e7, #b5f5ec, #abeaed, #a5e7f0, #9edaf0]')`  
};

window.copy = async (c) => {
  await navigator.clipboard.writeText(codes[c]);
};

window.transBG = (c) => {
  var background = new TimelineMax();
  background.to('.background', {
    duration: 0.5,
    ease: Expo.easeIn,
    opacity: 0,
    scaleY: 0,
    transformOrigin: 'center bottom'
  }).call(() => {
    document.querySelector('.background').style.background = parseCode(c);
  }).to('.background', {
    duration: 0.5,
    ease: Expo.easeOut,
    opacity: 1,
    scaleY: 1,
    transformOrigin: 'center bottom'
  })
};

function parseCode(c) {
  var code = codes[c];
  var raw = code.split('[')[1].split(']')[0].split(': ');
  var deg = raw[0];
  var colors = raw[1].split(', ');
  var dir;
  if (deg === 'right' || deg === 'left' || deg === 'up' || deg === 'down') dir = 'to ' + (deg === 'up') ? 'top' : (deg === 'down') ? 'bottom' : deg;
  else dir = deg;
  return 'linear-gradient(' + dir + ', ' + colors.join(', ') + ')';
}

Object.keys(codes).forEach(color => {
  $('.prem-btns').append(`<button style="display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center; min-width: 2vw; min-height: 2vw; aspect-ratio: 1/1; box-sizing: border-box; border: 2px solid white; border-radius: 50%; padding: 0px !important;" onclick="transBG('${color}'); copy('${color}')" class="button"><div style="display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center; background: ${parseCode(color)}; border-radius: 50%; min-width: 2.7vw !important; min-height: 2.7vw !important; aspect-ratio: 1/1 !important; margin: 0px !important; padding: 0px !important;"></div></button>`)
});

var cAngle = 9;
var angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360];

var ap = document.getElementById('anglePicker');

ap.onclick = () => {
  if (cAngle !== (angles.length - 1)) {
    cAngle++;
    ap.style.transform = 'rotate(' + angles[cAngle] + 'deg)';
  } else cAngle = 0;
};


window.genG = async () => {
  var tl = document.getElementById('timeline');
  var ch = [...tl.children];

  var ang = angles[cAngle];
  ang = ang === 0 ? 'up' : ang === 90 ? 'right' : ang === 180 ? 'down' : ang === 270 ? 'left' : ang === undefined || ang === 'undefined' ? 'up' : ang + 'deg';

  var grS = [];

  for (var x of ch) {
    grS.push(x.getAttribute('style').split(';').filter(x => x.split(':')[0] === '--color')[0].split(':')[1]);
  }

  await navigator.clipboard.writeText("localStorage.setItem('chatColor', '"+'gradient=['+ang+': '+grS.join(', ')+']'+"')");

  createModal('Text copied to your clipboard.', '<pre><code>&lt;gradient=['+ang+': '+grS.join(', ')+']&gt;'+'text&lt;/g&gt;</code></pre>', {
    'Close': () => document.querySelector('.modal').remove()
  })
}
