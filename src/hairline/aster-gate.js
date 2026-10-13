/**
 * Aster Figure: A browser window with an approval gate that opens/closes
 * Metaphor: Browser automation with per-task approval - gate lifts when approved
 * The pointer controls the gate position
 */

const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  mk, place, pointer, put, register, disposer, solid, rrect
} = HL;

const WINDOW_W = 70;
const WINDOW_H = 50;
const WINDOW_Z = 6;
const GATE_CLOSED = 20;
const GATE_OPEN = 45;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.65);
  
  fit(C, [
    [-WINDOW_W/2 - 6, -WINDOW_H/2 - 6, 0],
    [WINDOW_W/2 + 6, WINDOW_H/2 + 6, GATE_OPEN + 8]
  ], 200, 160);
  
  const P = proj(C), front = facing(C);
  const g = mk('g', {}, svg);
  
  // Base
  const [baseRing, baseInner] = rings(-WINDOW_W/2 - 4, -WINDOW_H/2 - 4, WINDOW_W/2 + 4, WINDOW_H/2 + 4, 3, 1);
  const baseSolid = solid(g);
  put(baseSolid, prism(P, front, baseRing, baseInner, 0, WINDOW_Z));
  
  // Browser window frame
  const [frameRing, frameInner] = rrect(-WINDOW_W/2, -WINDOW_H/2, WINDOW_W/2, WINDOW_H/2, 2, 8);
  const frameSolid = solid(g);
  const frameSp = spring(WINDOW_Z + 3, { eps: 0.05 });
  
  // Approval gate (vertical bar)
  const GATE_W = 8;
  const [gateRing, gateInner] = rings(-GATE_W/2, -WINDOW_H/2 + 6, GATE_W/2, WINDOW_H/2 - 6, 2, 0.8);
  const gateSolid = solid(g);
  const gateSp = spring(GATE_CLOSED, { eps: 0.08 });
  
  let over = null;
  let approved = false;

  function draw() {
    // Frame
    const fh = frameSp.x;
    put(frameSolid, prism(P, front, frameRing, frameInner, WINDOW_Z, fh));
    
    // Gate
    const gh = gateSp.x;
    put(gateSolid, prism(P, front, gateRing, gateInner, WINDOW_Z, gh));
    gateSolid.sil.classList.toggle('hi', approved);
  }

  function retarget() {
    if (!over) {
      gateSp.t = GATE_CLOSED;
      frameSp.t = WINDOW_Z + 3;
      approved = false;
      read.textContent = 'Approval gate: closed';
      B.wake();
      return;
    }

    const inWindow = Math.abs(over[0]) < WINDOW_W/2 && Math.abs(over[1]) < WINDOW_H/2;
    
    if (inWindow) {
      gateSp.t = GATE_OPEN;
      frameSp.t = WINDOW_Z + 5;
      approved = true;
      read.textContent = 'Approved: gate open';
    } else {
      gateSp.t = GATE_CLOSED;
      frameSp.t = WINDOW_Z + 3;
      approved = false;
      read.textContent = 'Waiting for approval';
    }
    
    B.wake();
  }

  const B = register(stage, (dt) => {
    let moving = stepS(gateSp, dt);
    if (stepS(frameSp, dt)) moving = true;
    draw();
    return moving;
  });

  bag.add(B.unregister);
  bag.add(pointer(stage, {
    move: (p) => {
      over = unproj(C, p[0], p[1], 0);
      retarget();
    },
    leave: () => {
      over = null;
      retarget();
    }
  }));

  bag.add(() => svg.replaceChildren());
  retarget();
  draw();

  return {
    set: () => {},
    destroy: bag.dispose
  };
}

hairline({
  name: 'aster-gate',
  means: 'A browser automation gate that lifts when the task is approved.',
  rules: [1, 3, 5, 9],
  range: [0, 1, 2],
  tour: [[200, 160], [200, 120], [200, 80], null],
  mount
});
