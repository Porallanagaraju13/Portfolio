/**
 * HarnessDiff Figure: A test harness with two dial gauges showing before/after success rates
 * Metaphor: Two dials side by side, one at 58.3%, one at 83.3%, showing the improvement
 * The pointer moves a slider that simulates the harness evaluation
 */

const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  mk, place, pointer, put, register, disposer, solid, circ, flatDot, rad
} = HL;

const BEFORE = 58.3;
const AFTER = 83.3;
const DIAL_R = 18;
const DIAL_H = 6;
const BASE_H = 4;
const DIAL_SPACING = 50;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.68);
  
  fit(C, [
    [-DIAL_SPACING, -DIAL_R - 8, 0],
    [DIAL_SPACING, DIAL_R + 8, DIAL_H + 16]
  ], 200, 160);
  
  const P = proj(C), front = facing(C);
  const g = mk('g', {}, svg);
  
  // Base platform
  const [baseRing, baseInner] = rings(-DIAL_SPACING - 10, -DIAL_R - 8, DIAL_SPACING + 10, DIAL_R + 8, 4, 1.4);
  const baseSolid = solid(g);
  put(baseSolid, prism(P, front, baseRing, baseInner, 0, BASE_H));
  
  // Two dials
  const dials = [
    { x: -DIAL_SPACING/2, value: BEFORE, label: 'Before' },
    { x: DIAL_SPACING/2, value: AFTER, label: 'After' }
  ].map((d, i) => {
    const [ring, inner] = circ(DIAL_R, 48);
    const el = solid(g);
    const sp = spring(DIAL_H + BASE_H, { eps: 0.05 });
    return { ...d, ring, inner, el, sp, drawn: NaN, active: false };
  });
  
  // Needle dots
  const needles = dials.map(d => flatDot(g, C, 0.8, 'dot'));
  
  let over = null;

  function draw() {
    dials.forEach((d, i) => {
      const h = d.sp.x;
      if (h !== d.drawn) {
        d.drawn = h;
        const ringShifted = d.ring.map(s => ({ ...s, u: s.u + d.x, v: s.v }));
        const innerShifted = d.inner.map(s => ({ ...s, u: s.u + d.x, v: s.v }));
        put(d.el, prism(P, front, ringShifted, innerShifted, BASE_H, h));
        d.el.sil.classList.toggle('hi', d.active);
      }
      
      // Needle position
      const angle = rad(135 - (d.value / 100) * 270);
      const nx = d.x + Math.cos(angle) * (DIAL_R - 4);
      const ny = Math.sin(angle) * (DIAL_R - 4);
      place(needles[i], P(nx, ny, h));
    });
  }

  function retarget() {
    if (!over) {
      dials.forEach(d => {
        d.sp.t = DIAL_H + BASE_H;
        d.active = false;
      });
      read.textContent = 'Harness eval: 58.3% → 83.3%';
      B.wake();
      return;
    }

    dials.forEach(d => {
      const dx = over[0] - d.x;
      const dy = over[1];
      const dist = Math.hypot(dx, dy);
      
      if (dist < DIAL_R) {
        d.sp.t = DIAL_H + BASE_H + 4;
        d.active = true;
      } else {
        d.sp.t = DIAL_H + BASE_H;
        d.active = false;
      }
    });

    const active = dials.find(d => d.active);
    read.textContent = active ? `${active.label}: ${active.value}%` : 'Hover dials';
    B.wake();
  }

  const B = register(stage, (dt) => {
    let moving = false;
    for (const d of dials) {
      if (stepS(d.sp, dt)) moving = true;
    }
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
  name: 'harnessdiff',
  means: 'Two gauges showing agent task success before and after harness optimization.',
  rules: [1, 3, 5, 9],
  range: [0, 1, 2],
  tour: [[-25, 160], [25, 160], [0, 180], null],
  mount
});
