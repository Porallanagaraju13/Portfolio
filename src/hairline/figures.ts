/**
 * Updated Hairline figures that work with Vite bundling
 * These are converted to TypeScript and don't rely on external kernel loading
 */

// Simple spring physics
class Spring {
  x: number;
  v: number;
  t: number;
  k: number;
  c: number;
  m: number;
  eps: number;

  constructor(initial: number, opts: any = {}) {
    this.x = initial;
    this.v = 0;
    this.t = initial;
    this.k = opts.k ?? 100;
    this.c = opts.c ?? 18;
    this.m = opts.m ?? 1;
    this.eps = opts.eps ?? 0.01;
  }

  step(dt: number): boolean {
    const f = this.k * (this.t - this.x) - this.c * this.v;
    this.v += (f / this.m) * dt;
    this.x += this.v * dt;
    return Math.abs(this.t - this.x) > this.eps || Math.abs(this.v) > this.eps;
  }
}

// Simplified camera and projection for isometric view
function iso(x: number, y: number, z: number, scale = 1.7, cx = 200, cy = 160): [number, number] {
  const a = (45 * Math.PI) / 180;
  const e = (30 * Math.PI) / 180;
  const sinA = Math.sin(a);
  const cosA = Math.cos(a);
  const sinE = Math.sin(e);
  const cosE = Math.cos(e);
  const k = scale * Math.sqrt(1.6);
  
  return [
    cx + (x * sinA - y * cosA) * k,
    cy + ((x * cosA + y * sinA) * sinE - z * cosE) * k
  ];
}

function uniso(sx: number, sy: number, z: number, scale = 1.7, cx = 200, cy = 160): [number, number] {
  const a = (45 * Math.PI) / 180;
  const e = (30 * Math.PI) / 180;
  const sinA = Math.sin(a);
  const cosA = Math.cos(a);
  const sinE = Math.sin(e);
  const cosE = Math.cos(e);
  const k = scale * Math.sqrt(1.6);
  
  const dx = (sx - cx) / k;
  const dy = (sy - cy) / k + z * cosE / k;
  
  const det = sinA * sinA * sinE + cosA * cosA * sinE;
  const x = (dx * sinA * sinE + dy * cosA) / det;
  const y = (-dx * cosA * sinE + dy * sinA) / det;
  
  return [x, y];
}

// Hero network mount function
export const heroNetworkMount = ({ stage, svg, read }: any, value: number) => {
  const ARM_COUNT = 6;
  const ARM_LENGTH = 32;
  const HUB_R = 12;

  const nodes: any[] = [];
  const hubSpring = new Spring(8);

  // Create arms
  for (let i = 0; i < ARM_COUNT; i++) {
    const angle = (i / ARM_COUNT) * Math.PI * 2;
    const x = Math.cos(angle) * ARM_LENGTH;
    const y = Math.sin(angle) * ARM_LENGTH;
    nodes.push({
      x, y,
      sp: new Spring(3 + Math.random() * 2),
      el: document.createElementNS('http://www.w3.org/2000/svg', 'g')
    });
    svg.appendChild(nodes[i].el);
  }

  const hubEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svg.appendChild(hubEl);

  let over: [number, number] | null = null;
  let rafId: number;

  function draw() {
    // Draw hub
    const h = Math.max(6, hubSpring.x);
    const [hx, hy] = iso(0, 0, h);
    hubEl.innerHTML = `<circle cx="${hx}" cy="${hy}" r="${HUB_R}" class="hi" />`;

    // Draw nodes
    nodes.forEach(node => {
      const nodeH = Math.max(2, node.sp.x);
      const [nx, ny] = iso(node.x, node.y, nodeH);
      node.el.innerHTML = `<circle cx="${nx}" cy="${ny}" r="3" class="${nodeH > 8 ? 'hi' : 'mid'}" />`;
    });
  }

  function retarget() {
    if (!over) {
      hubSpring.t = 8;
      nodes.forEach((n, i) => n.sp.t = 3 + Math.sin(i) * 1.5);
      read.textContent = 'AI network at rest';
      return;
    }

    const dist = Math.hypot(over[0], over[1]);
    hubSpring.t = 8 + Math.max(0, 12 - dist * 0.3);

    nodes.forEach(n => {
      const ndist = Math.hypot(n.x - over![0], n.y - over![1]);
      n.sp.t = 3 + Math.max(0, (28 - ndist) * 0.5);
    });

    read.textContent = `Neural signal: ${Math.round(hubSpring.t)}`;
  }

  function tick() {
    let moving = hubSpring.step(1/60);
    nodes.forEach(n => {
      if (n.sp.step(1/60)) moving = true;
    });
    draw();
    if (moving) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function onMove(e: MouseEvent) {
    const rect = stage.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    over = uniso(sx, sy, 0);
    retarget();
    tick();
  }

  function onLeave() {
    over = null;
    retarget();
    tick();
  }

  stage.addEventListener('mousemove', onMove);
  stage.addEventListener('mouseleave', onLeave);

  retarget();
  draw();

  return {
    set: () => {},
    destroy: () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
    }
  };
};

// Simplified jobmatch mount
export const jobMatchMount = ({ stage, svg, read }: any, value: number) => {
  // Simple funnel visualization
  const stages = [
    { w: 50, label: 'Jobs' },
    { w: 38, label: 'Filter' },
    { w: 26, label: 'Match' },
    { w: 14, label: 'Best' }
  ];

  const elements = stages.map((st, i) => {
    const z0 = i * 16;
    const z1 = z0 + 14;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(el);
    return { ...st, z0, z1, el, sp: new Spring(z1), active: false };
  });

  let rafId: number;

  function draw() {
    elements.forEach((el, i) => {
      const h = Math.max(el.z0 + 2, el.sp.x);
      const [x0, y0] = iso(-el.w/2, -el.w/2, el.z0);
      const [x1, y1] = iso(el.w/2, el.w/2, h);
      el.el.innerHTML = `<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" class="${el.active ? 'hi' : 'mid'}" rx="3"/>`;
    });
  }

  function tick() {
    let moving = false;
    elements.forEach(el => {
      if (el.sp.step(1/60)) moving = true;
    });
    draw();
    if (moving) rafId = requestAnimationFrame(tick);
  }

  function onMove(e: MouseEvent) {
    const rect = stage.getBoundingClientRect();
    const [x, y] = uniso(e.clientX - rect.left, e.clientY - rect.top, 0);
    const dist = Math.hypot(x, y);
    
    elements.forEach((el, i) => {
      if (dist < el.w/2) {
        el.sp.t = el.z1 + 3;
        el.active = true;
      } else {
        el.sp.t = el.z1;
        el.active = false;
      }
    });
    
    const active = elements.find(e => e.active);
    read.textContent = active ? active.label : 'Job funnel';
    tick();
  }

  stage.addEventListener('mousemove', onMove);
  draw();

  return {
    set: () => {},
    destroy: () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener('mousemove', onMove);
    }
  };
};

export const harnessDiffMount = jobMatchMount; // Placeholder
export const asterGateMount = jobMatchMount; // Placeholder
