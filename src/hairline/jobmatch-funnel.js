/**
 * JobMatch Figure: A sorting funnel with job cards flowing through stages
 * Metaphor: Jobs enter the wide top, filtered through stages, best matches emerge at bottom
 * The pointer controls which stage is active/highlighted
 */

// This will be a standalone hairline figure file
// Build with: node src/hairline/build.mjs src/hairline/jobmatch-funnel.js

const {
  Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS,
  mk, place, pointer, put, register, disposer, solid, circ, rrect
} = HL;

const STAGES = 4;
const TOP_W = 50;
const BOTTOM_W = 12;
const STAGE_H = 18;
const TOTAL_H = STAGES * STAGE_H;

/** Funnel width at stage index (0 = top, widest) */
const widthAt = (i) => TOP_W - ((TOP_W - BOTTOM_W) / STAGES) * i;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.75);
  
  fit(C, [
    [-TOP_W/2 - 8, -TOP_W/2 - 8, 0],
    [TOP_W/2 + 8, TOP_W/2 + 8, TOTAL_H + 4]
  ], 200, 160);
  
  const P = proj(C), front = facing(C);
  const g = mk('g', {}, svg);
  
  // Build stages from bottom to top for painter's order
  const stages = [];
  for (let i = STAGES - 1; i >= 0; i--) {
    const w0 = widthAt(i);
    const w1 = widthAt(i + 1);
    const z0 = i * STAGE_H;
    const z1 = (i + 1) * STAGE_H;
    
    const [ring, inner] = rings(-w0/2, -w0/2, w0/2, w0/2, 3, 1.2);
    const [ringTop, innerTop] = rings(-w1/2, -w1/2, w1/2, w1/2, 3, 1);
    
    stages.push({
      index: i,
      ring, inner, ringTop, innerTop,
      z0, z1, w0, w1,
      el: solid(g),
      sp: spring(z1, { eps: 0.06 }),
      drawn: NaN
    });
  }
  
  let over = null;
  let activeStage = -1;

  function draw() {
    stages.forEach((st, idx) => {
      const h = Math.max(st.z0 + 1, st.sp.x);
      if (h !== st.drawn) {
        st.drawn = h;
        // Draw stage as a truncated pyramid
        put(st.el, prism(P, front, st.ring, st.inner, st.z0, h));
        st.el.sil.classList.toggle('hi', st.index === activeStage);
      }
    });
  }

  function retarget() {
    if (!over) {
      stages.forEach(st => st.sp.t = st.z1);
      activeStage = -1;
      read.textContent = 'Job funnel: hover to highlight stage';
      B.wake();
      return;
    }

    const centerDist = Math.hypot(over[0], over[1]);
    activeStage = -1;
    
    stages.forEach(st => {
      if (centerDist < st.w0/2) {
        st.sp.t = st.z1 + 3;
        activeStage = st.index;
      } else {
        st.sp.t = st.z1;
      }
    });

    const labels = ['All Jobs', 'Filtered', 'Matched', 'Best Fit'];
    read.textContent = activeStage >= 0 ? labels[activeStage] : 'Hover funnel';
    B.wake();
  }

  const B = register(stage, (dt) => {
    let moving = false;
    for (const st of stages) {
      if (stepS(st.sp, dt)) moving = true;
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
  name: 'jobmatch-funnel',
  means: 'A sorting funnel where jobs flow through filtering stages to best matches.',
  rules: [1, 3, 5, 9],
  range: [0, 1, 2],
  tour: [[200, 140], [200, 100], [200, 60], null],
  mount
});
