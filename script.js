// script.js — lazy-loading thumb.png previews + lazy iframe modal preview
// Projects array (your existing entries). Use `thumb` fields when you have thumb.png inside project folder.
const projects = [
  {
    id: '1d-perlin-noise',
    title: '1D Perlin Noise',
    folder: '1-D perlin noise',
    thumb: '1-D perlin noise/thumb.png',
    description: 'Smooth 1D Perlin noise visualizer — a calm rolling waveform used for natural motion and textures.',
    category: 'visualization',
    tags: ['Perlin Noise', 'Generative', 'Visualization', 'Animation']
  },
  {
    id: '2d-perlin-noise',
    title: '2D Perlin Noise',
    folder: '2D perlin noise',
    thumb: '2D perlin noise/thumb.png',
    description: '2D Perlin noise texture generator — creates organic grayscale patterns resembling clouds or terrain.',
    category: 'generative-art',
    tags: ['Perlin Noise', '2D', 'Texture', 'Generative']
  },
  {
    id: 'a-star-pathfinding',
    title: 'A* Pathfinding',
    folder: 'A star pathfinding',
    thumb: 'A star pathfinding/thumb.png',
    description: 'Interactive A* algorithm visualization showing open/closed sets, pathfinding exploration and final path.',
    category: 'simulation',
    tags: ['Algorithms', 'Pathfinding', 'Visualization', 'AI']
  },
  {
    id: 'afinn-sentiment',
    title: 'AFINN-111 Sentiment Analysis',
    folder: 'AFINN-111 Sentiment Analysis',
    thumb: 'AFINN-111 Sentiment Analysis/thumb.png',
    description: 'Live sentiment analyzer using the AFINN-111 lexicon — type text and see a real-time sentiment score.',
    category: 'analysis',
    tags: ['NLP', 'Sentiment', 'Data Analysis', 'Text']
  },
  {
    id: 'asteroids-destroyer',
    title: 'Asteroids Destroyer',
    folder: 'Asteroids Distroyer',
    thumb: 'Asteroids Distroyer/thumb.png',
    description: 'Arcade-style asteroid shooter with particle effects and player controls — retro gameplay in p5.js.',
    category: 'game',
    tags: ['Game', 'Arcade', 'Particles', 'Controls']
  },
  {
    id: 'Attraction-and-Repulsion-Force',
    title: 'Attraction & Repulsion Force',
    folder: 'Attraction-and-Repulsion-Force',
    thumb: 'Attraction-and-Repulsion-Force/thumb.png',
    description: 'Particle system demonstrating attraction and repulsion forces — interact with mouse to influence the flock-like dynamics.',
    category: 'simulation',
    tags: ['Particles', 'Forces', 'Physics', 'Interaction']
  },
  {
    id: 'bouncing-ball',
    title: 'Bouncing Ball',
    folder: 'Bouncing ball',
    thumb: 'Bouncing ball/thumb.png',
    description: 'Simple physics demo of bouncing balls — collisions, velocity, and interactive mouse controls.',
    category: 'simulation',
    tags: ['Physics', 'Animation', 'Interaction', 'Simulation']
  },
  {
    id: 'bubble-highlighted',
    title: 'Bubble Highlighted',
    folder: 'Bubble highlighted',
    thumb: 'Bubble highlighted/thumb.png',
    description: 'Visual bubble effect with highlights and interactions — playful particle visuals.',
    category: 'generative-art',
    tags: ['Particles', 'Generative', 'Interaction']
  },
  {
    id: 'bubble-illusion',
    title: 'Bubble Illusion',
    folder: 'bubble illusion',
    thumb: 'bubble illusion/thumb.png',
    description: 'Optical bubble illusion that plays with depth and perception using simple particle rules.',
    category: 'generative-art',
    tags: ['Optical', 'Generative', 'Perception']
  },
  {
    id: 'bubble-intersection',
    title: 'Interactive Bubble Game',
    folder: 'bubble intersection',
    thumb: 'bubble intersection/thumb.png',
    description: 'Interactive bubble popping/interaction demo — click and hover to play with floating bubbles.',
    category: 'game',
    tags: ['Interactive', 'Mouse', 'Physics', 'Game']
  },
  {
    id: 'bubbles',
    title: 'Bubbles',
    folder: 'bubbles',
    thumb: 'bubbles/thumb.png',
    description: 'Classic floating bubble animation with smooth motion and playful collisions.',
    category: 'generative-art',
    tags: ['Particles', 'Animation', 'Interaction']
  },
  {
    id: 'bubbles-magicwand',
    title: 'Bubbles — Magic Wand',
    folder: 'bubbles-magicWand',
    thumb: 'bubbles-magicWand/thumb.png',
    description: 'Wave a virtual “magic wand” to influence bubble motion — a playful interactive sketch.',
    category: 'interactive',
    tags: ['Interaction', 'Particles', 'Mouse']
  },
  {
    id: 'cfg-generator',
    title: 'CFG Generator',
    folder: 'CFG Generator',
    thumb: 'CFG Generator/thumb.png',
    description: 'Context-free grammar generator — experiment with grammars to create procedural text or shapes.',
    category: 'tools',
    tags: ['Grammar', 'Procedural', 'Text Generation']
  },
  {
    id: 'circle-packing',
    title: 'Circle Packing',
    folder: 'CirclePacking',
    thumb: 'CirclePacking/thumb.png',
    description: 'Generative circle packing algorithm that fills space with non-overlapping circles.',
    category: 'generative-art',
    tags: ['Geometry', 'Generative', 'Packing']
  },
  {
    id: 'clock',
    title: 'Clock',
    folder: 'Clock',
    thumb: 'Clock/thumb.png',
    description: 'Stylish clock demo using p5.js — demonstrates time functions and smooth animation.',
    category: 'utility',
    tags: ['Clock', 'Time', 'UI']
  },
  {
    id: 'data-visualisation',
    title: 'Data Visualisation',
    folder: 'Data Visualisation (Social_media_data)',
    thumb: 'Data Visualisation (Social_media_data)/thumb.png',
    description: 'Social media dataset visualisations demonstrating basic charts and interactive exploration.',
    category: 'visualization',
    tags: ['Data', 'Visualization', 'Charts', 'Interactive']
  },
  {
    id: 'diastic-machine',
    title: 'Diastic Machine',
    folder: 'Diastic Machine',
    thumb: 'Diastic Machine/thumb.png',
    description: 'Text generation tool inspired by the diastic method — transform seeds into emergent text.',
    category: 'tools',
    tags: ['Text', 'Generative', 'Algorithmic']
  },
  {
    id: 'dla',
    title: 'Diffusion-Limited Aggregation (DLA)',
    folder: 'Diffusion limited Arrgrigation',
    thumb: 'Diffusion limited Arrgrigation/thumb.png',
    description: 'DLA simulation — organic branching growth formed by random walkers sticking to a cluster.',
    category: 'simulation',
    tags: ['Simulation', 'Growth', 'Particles', 'Generative']
  },
  {
    id: 'fireworks',
    title: 'Fireworks',
    folder: 'fireworks',
    thumb: 'fireworks/thumb.png',
    description: 'Particle-based fireworks with explosive bursts and fading trails.',
    category: 'generative-art',
    tags: ['Particles', 'Animation', 'Visual Effects']
  },
  {
    id: 'fractal-tree-obj',
    title: 'Fractal Tree (Object)',
    folder: 'Fractal Tree (Using Object)',
    thumb: 'Fractal Tree (Using Object)/thumb.png',
    description: 'Recursive fractal tree constructed with objects — adjust angles and iterations for variety.',
    category: 'generative-art',
    tags: ['Fractal', 'Recursion', 'Generative', 'Geometry']
  },
  {
    id: 'fractal-tree',
    title: 'Fractal Tree',
    folder: 'Fractal Tree',
    thumb: 'Fractal Tree/thumb.png',
    description: 'A second variant of a fractal tree — explore branching patterns through parameters.',
    category: 'generative-art',
    tags: ['Fractal', 'Geometry', 'Pattern']
  },
  {
    id: 'genetic-algorithm',
    title: 'Genetic Algorithm (TSP / GA)',
    folder: 'genetic algorithm',
    thumb: 'genetic algorithm/thumb.png',
    description: 'Genetic algorithm demos for optimization problems (TSP variants and evolutionary search).',
    category: 'simulation',
    tags: ['GA', 'Optimization', 'TSP', 'Algorithms']
  },
  {
    id: 'isosurface-blobs',
    title: 'IsoSurface Blobs',
    folder: 'isoSurface Blobs',
    thumb: 'isoSurface Blobs/thumb.png',
    description: 'Metaballs / isosurface blobs producing fluid, organic shapes via field blending.',
    category: 'generative-art',
    tags: ['Metaballs', 'Isosurface', 'Generative', '3D-like']
  },
  {
    id: 'l-system-fractal',
    title: 'L-System Fractal Tree',
    folder: 'L-System fractal tree',
    thumb: 'L-System fractal tree/thumb.png',
    description: 'L-system based fractal generation — procedural plant-like structures and branching rules.',
    category: 'generative-art',
    tags: ['L-System', 'Fractal', 'Procedural']
  },
  {
    id: 'lexicographic-order',
    title: 'Lexicographic Order (TSP helper)',
    folder: 'LexicoGraphic Order',
    thumb: 'LexicoGraphic Order/thumb.png',
    description: 'Utility showing lexicographic permutations — useful for brute-force TSP or permutation lessons.',
    category: 'tools',
    tags: ['Permutations', 'TSP', 'Algorithms']
  },
  {
    id: 'lorenz-attractor',
    title: 'Lorenz Attractor',
    folder: 'Lorenz attractor',
    thumb: 'Lorenz attractor/thumb.png',
    description: 'Classic chaotic attractor visualized — illustrates sensitive dependence on initial conditions.',
    category: 'visualization',
    tags: ['Chaos', 'Dynamical Systems', 'Visualization']
  },
  {
    id: 'madlib',
    title: 'MadLib Generator',
    folder: 'MadLib Generator',
    thumb: 'MadLib Generator/thumb.png',
    description: 'MadLib style sentence generator pulling word classes from CSV — playful, interactive text output.',
    category: 'interactive',
    tags: ['Text', 'Interactive', 'CSV', 'Games']
  },
  {
    id: 'mandelbrot',
    title: 'Mandelbrot Set',
    folder: 'mandlebrot set',
    thumb: 'mandlebrot set/thumb.png',
    description: 'Explore the Mandelbrot fractal — zoom and color iterations to discover self-similar patterns.',
    category: 'generative-art',
    tags: ['Fractal', 'Complex', 'Visualization']
  },
  {
    id: 'markov-generator',
    title: 'Markov Generator',
    folder: 'Markov Generator',
    thumb: 'Markov Generator/thumb.png',
    description: 'Markov chain-based text generator — creates new names/text from training input.',
    category: 'tools',
    tags: ['Markov', 'Text', 'Generative']
  },
  {
    id: 'moving-circle',
    title: 'Moving Circle',
    folder: 'moving circle',
    thumb: 'moving circle/thumb.png',
    description: 'Simple motion demo showing interpolation, velocity and mouse interaction with a moving circle.',
    category: 'visualization',
    tags: ['Motion', 'Interpolation', 'Interaction']
  },
  {
    id: 'multiple-bubbles',
    title: 'Multiple Bubbles Intersection',
    folder: 'multiple bubbles intersection',
    thumb: 'multiple bubbles intersection/thumb.png',
    description: 'Multiple bubble collision and intersection demo — physics-inspired particle interactions.',
    category: 'generative-art',
    tags: ['Particles', 'Collision', 'Interaction']
  },
  {
    id: 'perlin-flowfield',
    title: 'Perlin Noise FlowField',
    folder: 'Perlin Noise FlowField',
    thumb: 'Perlin Noise FlowField/thumb.png',
    description: 'Flow field driven by Perlin noise — particles follow smoothly varying vector fields for organic motion.',
    category: 'simulation',
    tags: ['FlowField', 'Perlin', 'Particles', 'Simulation']
  },
  {
    id: 'phyllotaxis',
    title: 'Phyllotaxis',
    folder: 'Phyllotaxis',
    thumb: 'Phyllotaxis/thumb.png',
    description: 'Beautiful phyllotactic packing patterns demonstrating golden angle packing and generative spirals.',
    category: 'generative-art',
    tags: ['Phyllotaxis', 'Spirals', 'Generative']
  },
  {
    id: 'pixel-sorting',
    title: 'Pixel Sorting',
    folder: 'Pixel Sorting',
    thumb: 'Pixel Sorting/thumb.png',
    description: 'Pixel-sorting effect — visual glitch art style that reorganizes image pixels into streaks and patterns.',
    category: 'generative-art',
    tags: ['Image', 'Glitch', 'Effect']
  },
  {
    id: 'poisson-disc',
    title: 'Poisson Disc Sampling',
    folder: 'Poisson disc',
    thumb: 'Poisson disc/thumb.png',
    description: 'Blue noise Poisson-disc sampling — good for distributing points with a minimum distance constraint.',
    category: 'generative-art',
    tags: ['Sampling', 'Blue Noise', 'Geometry']
  },
  {
    id: 'pop-bubbles',
    title: 'Pop Bubbles',
    folder: 'pop bubbles',
    thumb: 'pop bubbles/thumb.png',
    description: 'Interactive popping bubble demo with satisfying particle bursts and sound triggers (if available).',
    category: 'interactive',
    tags: ['Interaction', 'Particles', 'Sound']
  },
  {
    id: 'purple-rain',
    title: 'Purple Rain',
    folder: 'purple rain',
    thumb: 'purple rain/thumb.png',
    description: 'Aesthetic purple particle rain with blending and motion for a moody visual effect.',
    category: 'generative-art',
    tags: ['Particles', 'Atmosphere', 'Visual']
  },
  {
    id: 'random-walker',
    title: 'Random Walker',
    folder: 'Random Walker',
    thumb: 'Random Walker/thumb.png',
    description: 'Random walker algorithm demonstrator — stochastic motion and path trace visuals.',
    category: 'simulation',
    tags: ['Random Walk', 'Stochastic', 'Visualization']
  },
  {
    id: 'Rose-Pattern',
    title: 'Rose Pattern',
    folder: 'Rose-Pattern',
    thumb: 'Rose-Pattern/thumb.png',
    description: 'Generative rose-curve visualizer using polar equations — explore petals, symmetry and color variations.',
    category: 'generative-art',
    tags: ['Math', 'Polar', 'Generative', 'Pattern']
  },
  {
    id: 'screensaver-random',
    title: 'ScreenSaver (Random)',
    folder: 'screenSaver(RANDOM_fuct)',
    // thumb: 'purple rain/thumb.png',
    description: 'Dynamic screensaver-like animation — generative motion with randomized parameters for variety.',
    category: 'generative-art',
    tags: ['Screensaver', 'Generative', 'Motion']
  },
  {
    id: 'snake-game',
    title: 'Snake Game',
    folder: 'Snake Game',
    thumb: 'Snake Game/thumb.png',
    description: 'Classic Snake game implementation with scoring, collision detection and keyboard controls.',
    category: 'game',
    tags: ['Game', 'Classic', 'Keyboard', 'Score']
  },
  {
    id: 'solar-system',
    title: 'Solar System',
    folder: 'solar System',
    thumb: 'solar System/thumb.png',
    description: 'Interactive 3D-ish solar system with orbital motion and camera controls (p5/WebGL).',
    category: 'simulation',
    tags: ['Space', 'Orbits', 'WebGL', 'Interactive']
  },
  {
    id: 'star-patterns',
    title: 'Star Patterns',
    folder: 'Star Patterns',
    thumb: 'Star Patterns/thumb.png',
    description: 'Procedural star patterns & generative constellations for decorative visuals.',
    category: 'generative-art',
    tags: ['Stars', 'Pattern', 'Generative']
  },
  {
    id: 'starfield',
    title: 'Starfield Simulation',
    folder: 'starfield simulation',
    thumb: 'starfield simulation/thumb.png',
    description: 'Hyperspeed starfield with depth and speed control — classic space flight effect.',
    category: 'simulation',
    tags: ['Starfield', 'Speed', 'Space']
  },
  {
    id: 'superellipse',
    title: 'Superellipse',
    folder: 'Superellipse',
    thumb: 'Superellipse/thumb.png',
    description: 'Geometric superellipse visualizer — explore a family of shapes between rectangles and ellipses.',
    category: 'generative-art',
    tags: ['Geometry', 'Superellipse', 'Math']
  },
  {
    id: 'supershape',
    title: 'SuperShape Animation',
    folder: 'superShape Animation',
    thumb: 'superShape Animation/thumb.png',
    description: 'Supershape-based 3D globe that morphs over time — mathematical and generative aesthetics.',
    category: 'generative-art',
    tags: ['Supershape', '3D', 'Mathematics']
  },
  {
    id: 'terrain-generator',
    title: 'Terrain Generator',
    folder: 'terrain generator',
    thumb: 'terrain generator/thumb.png',
    description: 'Procedural terrain generated with noise — useful demo for landscape generation techniques.',
    category: 'simulation',
    tags: ['Terrain', 'Noise', '3D', 'Procedural']
  },
  {
    id: 'tf-idf',
    title: 'TF-IDF Demo',
    folder: 'TF-IDF',
    thumb: 'TF-IDF/thumb.png',
    description: 'Text analytics demo showing term-frequency inverse-document-frequency processing across documents.',
    category: 'analysis',
    tags: ['NLP', 'TF-IDF', 'Text', 'Analytics']
  },
  {
    id: 'traveling-salesperson',
    title: 'Traveling Salesperson (Lexicographic)',
    folder: 'Travelling salesperson using lexico order',
    thumb: 'Travelling salesperson using lexico order/thumb.png',
    description: 'Brute-force TSP demo using lexicographic permutations — educational TSP visualization and timings.',
    category: 'tools',
    tags: ['TSP', 'Algorithms', 'Permutation', 'Optimization']
  },
  {
    id: 'tree-space-colonization',
    title: 'Tree Space Colonization',
    folder: 'Tree space Colonization',
    thumb: 'Tree space Colonization/thumb.png',
    description: 'Space colonization tree growth simulation — procedural trees that grow toward attractor points.',
    category: 'simulation',
    tags: ['Procedural', 'Tree', 'Simulation']
  },
  {
    id: 'tsp-ga',
    title: 'TSP Genetic Algorithm',
    folder: 'TSP Genetic algorithm',
    thumb: 'TSP Genetic algorithm/thumb.png',
    description: 'Genetic Algorithm applied to TSP — visualizes populations, crossover and evolving solutions.',
    category: 'simulation',
    tags: ['GA', 'TSP', 'Evolution', 'Optimization']
  },
  {
    id: 'Visualizing-PI',
    title: 'Visualizing PI',
    folder: 'Visualizing-PI',
    thumb: 'Visualizing-PI/thumb.png',
    description: 'Visual exploration of π: map digits to position and color to reveal patterns hidden in the digits of Pi.',
    category: 'visualization',
    tags: ['Math', 'Visualization', 'Pi', 'Number Theory']
  }
];

// DOM handles
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const projectCountEl = document.getElementById('project-count');

let lastFocusedElBeforeModal = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProjects(projects);
  setupFilters();
  setupModal();
  updateProjectCount();
  setupSmoothScroll();

  // Accessibility: ensure modalClose is a real button element
  if (modalClose && modalClose.tagName !== 'BUTTON') {
    // convert if needed (but typically it's already a button)
  }
});

/* ---------------------------
   Helpers for safe URIs
   --------------------------- */
function safeProjectPath(project) {
  const folder = project.folder || project.path || '';
  const base = folder.endsWith('/') ? folder : folder + '/';
  // encode when used for href/src assignment only
  return encodeURI(base + 'index.html');
}
function safeProjectLink(project) {
  const folder = project.folder || project.path || '';
  const base = folder.endsWith('/') ? folder : folder + '/';
  return encodeURI(base);
}
function githubTreeUrl(project) {
  return 'https://github.com/vineet-00/p5/tree/main/' + encodeURIComponent(project.folder || '');
}
function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* ---------------------------
   Render
   --------------------------- */
function renderProjects(projectsToRender) {
  projectsGrid.innerHTML = '';

  if (projectsToRender.length === 0) {
    projectsGrid.innerHTML = '<div class="loading">No projects found</div>';
    return;
  }

  projectsToRender.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

/* ---------------------------
   IntersectionObserver thumbnail loader
   --------------------------- */
const thumbObserver = (function () {
  let obs = null;
  return function () {
    if (obs) return obs;
    obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const container = entry.target;
        loadThumbMedia(container);
        obs.unobserve(container);
      });
    }, { rootMargin: '200px', threshold: 0.05 });
    return obs;
  };
})();

function attachThumbObserver(card) {
  const media = card.querySelector('.thumb-media');
  if (!media) return;
  if (media.__observed) return;
  media.__observed = true;
  thumbObserver().observe(media);
}

function loadThumbMedia(container) {
  // IMPORTANT: container.dataset.thumb is raw path (we set it without pre-encoding)
  const thumb = container.dataset.thumb || '';
  const fallback = container.dataset.fallback || '';

  if (!thumb) {
    if (fallback) {
      const img = document.createElement('img');
      img.className = 'project-thumb-img';
      img.alt = '';
      img.loading = 'lazy';
      img.src = encodeURI(fallback); 
      replaceThumb(container, img);
    }
    return;
  }

  // Use encodeURI once here when assigning to img.src
  const img = document.createElement('img');
  img.className = 'project-thumb-img';
  img.alt = '';
  img.loading = 'lazy';
  img.src = encodeURI(thumb); // encode once here

  // Fade in
  img.style.opacity = '0';
  img.addEventListener('load', () => {
    img.style.transition = 'opacity 220ms ease';
    img.style.opacity = '1';
  }, { once: true });

  img.addEventListener('error', () => {
    // Helpful debug output in console if the file is missing or path incorrect
    console.warn(`Thumbnail failed to load: ${thumb}`);
    if (fallback) {
      img.src = encodeURI(fallback); // try fallback
    } else {
      // keep placeholder if no fallback
      replaceThumb(container, createPlaceholder());
    }
  }, { once: true });

  replaceThumb(container, img);
}

function replaceThumb(container, element) {
  while (container.firstChild) container.removeChild(container.firstChild);
  container.appendChild(element);
}

function createPlaceholder() {
  const ph = document.createElement('div');
  ph.className = 'project-thumb-placeholder';
  ph.textContent = 'Preview';
  return ph;
}

/* ---------------------------
   Create project card (no iframe here)
   --------------------------- */
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.category = project.category || 'uncategorized';

  const viewHref = safeProjectLink(project);
  const githubTree = githubTreeUrl(project);

  // Create the DOM nodes rather than unsafe innerHTML to avoid accidental encoding issues
  const thumbnail = document.createElement('div');
  thumbnail.className = 'project-thumbnail';

  const thumbMedia = document.createElement('div');
  thumbMedia.className = 'thumb-media';

  // store raw paths on dataset (do NOT pre-encode here)
  if (project.thumb) thumbMedia.dataset.thumb = project.thumb;
  if (project.fallback) thumbMedia.dataset.fallback = project.fallback;

  // placeholder inside thumb-media
  thumbMedia.appendChild(createPlaceholder());
  thumbnail.appendChild(thumbMedia);

  const overlay = document.createElement('div');
  overlay.className = 'project-overlay';
  const playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.type = 'button';
  playBtn.setAttribute('aria-label', `Open ${project.title}`);
  playBtn.textContent = '▶';
  overlay.appendChild(playBtn);
  thumbnail.appendChild(overlay);

  const info = document.createElement('div');
  info.className = 'project-info';
  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;
  const desc = document.createElement('p');
  desc.className = 'project-description';
  desc.textContent = project.description || '';
  const tags = document.createElement('div');
  tags.className = 'project-tags';
  (project.tags || []).forEach(t => {
    const s = document.createElement('span');
    s.className = 'tag';
    s.textContent = t;
    tags.appendChild(s);
  });

  const links = document.createElement('div');
  links.className = 'project-links';
  const aView = document.createElement('a');
  aView.className = 'btn btn-primary';
  aView.href = viewHref;
  aView.target = '_blank';
  aView.rel = 'noopener';
  aView.textContent = 'View Project';
  const aCode = document.createElement('a');
  aCode.className = 'btn btn-secondary';
  aCode.href = githubTree;
  aCode.target = '_blank';
  aCode.rel = 'noopener';
  aCode.textContent = 'View Code';
  links.appendChild(aView);
  links.appendChild(aCode);

  info.appendChild(title);
  info.appendChild(desc);
  info.appendChild(tags);
  info.appendChild(links);

  // assemble
  card.appendChild(thumbnail);
  card.appendChild(info);

  // click to open modal (except when clicking links)
  card.addEventListener('click', (e) => {
    if (e.target.closest('.project-links')) return;
    openModal(project);
  });

  // play button event
  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(project);
  });

  // lazy-load the thumb when visible
  attachThumbObserver(card);

  return card;
}

/* ---------------------------
   Filters
   --------------------------- */
function setupFilters() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
      renderProjects(filtered);
    });
  });
}

/* ---------------------------
   Modal logic (lazy iframe) + focus management
   --------------------------- */
function setupModal() {
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    // If click outside modal-content (modal background), close
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

function openModal(project) {
  // save last focused element
  lastFocusedElBeforeModal = document.activeElement;

  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalIframe = document.getElementById('modal-iframe');
  const modalDescription = document.getElementById('modal-description');

  modalTitle.textContent = project.title;
  modalTags.innerHTML = (project.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
  modalDescription.textContent = project.description || '';

  // load iframe lazily (encode when assigning src)
  modalIframe.src = safeProjectPath(project);
  modal.style.display = 'block';
  modal.removeAttribute('aria-hidden');
  modal.setAttribute('aria-hidden', 'false');

  // move focus into the modal's close button (or iframe fallback)
  // ensure the close button is focusable
  if (modalClose) {
    modalClose.focus();
  }

  document.body.style.overflow = 'hidden';
}

function closeModal() {
  // before hiding, move focus away from modal content to avoid aria-hidden blocked
  // restore focus to last focused element if possible
  if (lastFocusedElBeforeModal) {
    try { lastFocusedElBeforeModal.focus(); } catch (e) { document.body.focus(); }
  } else {
    // if none, set focus to first filter button
    const firstFilter = document.querySelector('.filter-btn');
    if (firstFilter) firstFilter.focus();
    else document.body.focus();
  }

  // now it's safe to hide modal
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';

  // unload iframe to free resources
  const iframe = document.getElementById('modal-iframe');
  if (iframe) {
    iframe.src = '';
  }
}

/* ---------------------------
   Utilities
   --------------------------- */
function updateProjectCount() {
  projectCountEl.textContent = projects.length;
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Modal iframe fade-in handler
document.addEventListener('DOMContentLoaded', () => {
  const ifrm = document.getElementById('modal-iframe');
  if (ifrm) {
    ifrm.addEventListener('load', () => {
      ifrm.style.transition = 'opacity 300ms ease';
      ifrm.style.opacity = '1';
    });
  }
});
