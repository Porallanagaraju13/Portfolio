/**
 * Hairline figure definitions for the portfolio
 * Each figure is a metaphor for a project or concept
 */

// Hero figure: A neural network node that pulses and responds to the pointer
export const heroNetworkMount = ({ stage, svg, read }: any, value: number) => {
  const HL = (window as any).HL;
  if (!HL) return { set: () => {}, destroy: () => {} };

  const {
    Cam, fit, proj, facing, rings, prism, circ, spring, stepS,
    mk, solid, put, register, pointer, unproj, disposer
  } = HL;

  const bag = disposer();
  const C = Cam(45, 0.5, 1.72);
  const nodes: any[] = [];
  
  // Central hub with connecting arms
  const HUB_R = 12;
  const ARM_COUNT = 6;
  const ARM_LENGTH = 32;
  
  fit(C, [
    [-ARM_LENGTH - 10, -ARM_LENGTH - 10, 0],
    [ARM_LENGTH + 10, ARM_LENGTH + 10, 28]
  ], 200, 160);
  
  const P = proj(C);
  const front = facing(C);
  const g = mk('g', {}, svg);

  // Create hub
  const [hubRing, hubInner] = rings(-HUB_R, -HUB_R, HUB_R, HUB_R, 4, 1.2);
  const hubSolid = solid(g);
  const hubSpring = spring(8, { eps: 0.05 });
  
  // Create arms radiating out
  for (let i = 0; i < ARM_COUNT; i++) {
    const angle = (i / ARM_COUNT) * Math.PI * 2;
    const x = Math.cos(angle) * ARM_LENGTH;
    const y = Math.sin(angle) * ARM_LENGTH;
    const [ring, inner] = rings(x - 3, y - 3, x + 3, y + 3, 1.2, 0.6);
    nodes.push({
      x, y, ring, inner,
      el: solid(g),
      sp: spring(3 + Math.random() * 2, { eps: 0.04 }),
      drawn: NaN
    });
  }

  let over: [number, number] | null = null;

  function draw() {
    // Hub
    const h = Math.max(6, hubSpring.x);
    put(hubSolid, prism(P, front, hubRing, hubInner, 0, h));
    hubSolid.sil.classList.toggle('hi', h > 12);

    // Nodes
    for (const node of nodes) {
      const nodeH = Math.max(2, node.sp.x);
      if (nodeH !== node.drawn) {
        node.drawn = nodeH;
        put(node.el, prism(P, front, node.ring, node.inner, 0, nodeH));
        node.el.sil.classList.toggle('hi', nodeH > 8);
      }
    }
  }

  function retarget() {
    if (!over) {
      hubSpring.t = 8;
      nodes.forEach((n, i) => n.sp.t = 3 + Math.sin(i) * 1.5);
      read.textContent = 'AI network at rest';
      return;
    }

    const dx = over[0];
    const dy = over[1];
    const dist = Math.hypot(dx, dy);
    hubSpring.t = 8 + Math.max(0, 12 - dist * 0.3);

    nodes.forEach(n => {
      const ndx = n.x - over[0];
      const ndy = n.y - over[1];
      const ndist = Math.hypot(ndx, ndy);
      n.sp.t = 3 + Math.max(0, (28 - ndist) * 0.5);
    });

    read.textContent = `Neural signal strength: ${Math.round(hubSpring.t)}`;
  }

  const B = register(stage, (dt: number) => {
    let moving = stepS(hubSpring, dt);
    for (const n of nodes) {
      if (stepS(n.sp, dt)) moving = true;
    }
    draw();
    return moving;
  });

  bag.add(B.unregister);
  bag.add(pointer(stage, {
    move: (p: [number, number]) => {
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
};

// Project figure: Job matching system (funnel with filtering stages)
export const jobMatchMount = ({ stage, svg, read }: any, value: number) => {
  const HL = (window as any).HL;
  if (!HL) return { set: () => {}, destroy: () => {} };

  const {
    Cam, fit, proj, facing, rings, prism, spring, stepS,
    mk, solid, put, register, pointer, unproj, disposer
  } = HL;

  const bag = disposer();
  const C = Cam(45, 0.5, 1.85);
  
  const stages = [
    { w: 40, label: 'Jobs' },
    { w: 32, label: 'Filter' },
    { w: 24, label: 'Match' },
    { w: 16, label: 'Best' }
  ];

  fit(C, [[-25, -25, 0], [25, 25, 45]], 200, 160);
  
  const P = proj(C);
  const front = facing(C);
  const g = mk('g', {}, svg);

  const elements = stages.map((st, i) => {
    const z0 = i * 12;
    const z1 = z0 + 10;
    const [ring, inner] = rings(-st.w/2, -st.w/2, st.w/2, st.w/2, 3, 1);
    return {
      ...st,
      z0, z1, ring, inner,
      el: solid(g),
      sp: spring(z1, { eps: 0.06 }),
      drawn: NaN
    };
  });

  let over: [number, number] | null = null;
  let activeStage = -1;

  function draw() {
    elements.forEach((el, i) => {
      const h = Math.max(el.z0 + 2, el.sp.x);
      if (h !== el.drawn) {
        el.drawn = h;
        put(el.el, prism(P, front, el.ring, el.inner, el.z0, h));
        el.el.sil.classList.toggle('hi', i === activeStage);
      }
    });
  }

  function retarget() {
    if (!over) {
      elements.forEach(el => el.sp.t = el.z1);
      activeStage = -1;
      read.textContent = 'Job matching funnel';
      return;
    }

    const z = 8;
    const centerDist = Math.hypot(over[0], over[1]);
    
    elements.forEach((el, i) => {
      if (centerDist < el.w/2) {
        el.sp.t = el.z1 + 4;
        activeStage = i;
      } else {
        el.sp.t = el.z1;
      }
    });

    read.textContent = activeStage >= 0 ? elements[activeStage].label : 'Hover over funnel';
  }

  const B = register(stage, (dt: number) => {
    let moving = false;
    for (const el of elements) {
      if (stepS(el.sp, dt)) moving = true;
    }
    draw();
    return moving;
  });

  bag.add(B.unregister);
  bag.add(pointer(stage, {
    move: (p: [number, number]) => {
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
};

// More figure mount functions would go here for each project
