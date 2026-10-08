export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'WEB' | 'DESIGN' | 'BRANDING' | 'MOTION' | '3D' | 'EXPERIMENTAL';
  year: string;
  description: string;
  image: string;
  featured?: boolean;
  size?: 'large' | 'medium' | 'small' | 'full';
  tags: string[];
  stats?: { label: string; value: string }[];
  caseStudy: {
    overview: string;
    challenge: string;
    objective: string;
    process: string;
    design: string;
    development: string;
    technology: string[];
    result: string;
    lessons: string;
    liveUrl?: string;
    repoUrl?: string;
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  skills: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  milestones: string[];
}

export interface Milestone {
  year: string;
  title: string;
  role: string;
  description: string;
  keyProjects: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  verifiedResult: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const STUDIO_CONFIG = {
  creator: {
    name: "NEXEL",
    role: "Student & AI Explorer",
    studio: "NEXEL LAB",
    location: "Exploring Globally",
    email: "nexxel.me@gmail.com",
    secondaryEmail: "info@nexxel.me",
    phone: "Reach out via Mail or Discord",
    tagline: "STUDENT / AI EXPLORER / CREATIVE EXPERIMENTER",
    heroHeadline: "LEARNING, EXPERIMENTING & DISCOVERING AI.",
    heroSubtext: "I am a student exploring artificial intelligence, creative code, and interactive technology. Building projects to learn, discover, and share the journey.",
    avatar: "",
    bio: "I'm not a professional builder or seasoned developer—I'm a student who is actively learning and discovering AI. I spend my time exploring neural models, experimenting with creative code, and building interactive projects along my learning journey.",
    philosophyQuote: "Not a master builder—just a passionate student learning and discovering the magic of AI.",
    extendedBio: "I am a student on an exciting learning journey. Rather than claiming years of corporate development experience, I dedicate my days to exploring artificial intelligence, tinkering with modern web tools, building experimental projects, and learning how neural models and spatial design can transform digital creativity. Every project here is a milestone in my learning process.",
    availabilityStatus: "OPEN FOR COLLABORATIONS & LEARNING",
    availabilityType: "available" as "available" | "limited" | "booked",
  },
  metrics: [
    { label: "AI Experiments", value: 32, suffix: "+" },
    { label: "Years Learning", value: 2, suffix: " Yrs" },
    { label: "Tools Explored", value: 18, suffix: " Models" },
    { label: "Open Code Repos", value: 14, suffix: " Repos" },
  ],
  principles: [
    {
      num: "01",
      title: "CREATE",
      subtitle: "Turn ideas into experiences.",
      description: "We don't settle for static layouts. We transform abstract vision into living, breathing spatial touchpoints with palpable emotional resonance."
    },
    {
      num: "02",
      title: "EXPERIMENT",
      subtitle: "Explore technology, visuals and interaction.",
      description: "Continual R&D with custom shaders, physics engines, and generative audio keeps our work years ahead of the conventional design landscape."
    },
    {
      num: "03",
      title: "EVOLVE",
      subtitle: "Always improve, refine and push forward.",
      description: "Subtle micro-delights, sub-millisecond interaction feedback, and ruthless performance budgets turn good work into enduring masterpieces."
    }
  ],
  services: [
    {
      id: "web-dev",
      number: "01",
      title: "WEB DEVELOPMENT",
      shortDesc: "Ultra-fast, modular web applications built with modern frameworks and robust backend architecture.",
      fullDesc: "From custom React / Next.js web applications to full-stack WebGL platforms, we construct resilient, accessible, and blindingly fast web platforms with zero compromise on engineering excellence.",
      iconName: "Code",
      deliverables: ["Full-Stack Web Applications", "Custom React & Next.js Builds", "Headless CMS Integrations", "Sub-second Performance Tuning"],
      skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Vite", "REST & GraphQL"]
    },
    {
      id: "ui-ux",
      number: "02",
      title: "UI / UX DESIGN",
      shortDesc: "Intuitive, high-conversion interfaces and digital design systems engineered with meticulous typographic rhythm.",
      fullDesc: "We craft thoughtful digital interfaces backed by cognitive empathy, spatial math, and ruthless typography discipline, translating complex software workflows into effortless human journeys.",
      iconName: "Layout",
      deliverables: ["Design Systems & Token Architecture", "High-Fidelity Wireframes & Mockups", "Interactive Prototypes", "Usability Testing & Accessibility Audits"],
      skills: ["Figma", "Design Tokens", "Micro-Typography", "Information Architecture"]
    },
    {
      id: "brand-identity",
      number: "03",
      title: "BRAND IDENTITY",
      shortDesc: "Distinctive, future-facing visual identities tailored for contemporary digital-first companies.",
      fullDesc: "Creating comprehensive brand guidelines, dynamic logotypes, generative pattern languages, and bespoke collateral that ensure unforgettable brand recall across every physical and digital touchpoint.",
      iconName: "Palette",
      deliverables: ["Dynamic Visual Identity Systems", "Brand Guidelines & Typography Specs", "Digital Collateral & Packaging", "Iconography & Asset Libraries"],
      skills: ["Creative Direction", "Color Systems", "Brand Guidelines", "Vector Craft"]
    },
    {
      id: "video-editing",
      number: "04",
      title: "VIDEO EDITING",
      shortDesc: "High-retention showreels, kinetic commercial spots, and cinematic product teasers.",
      fullDesc: "Rhythmic, emotionally resonant video editing calibrated for digital retention. Precision sound design, color grading, and editorial pacing designed to captivate audiences.",
      iconName: "Film",
      deliverables: ["Launch Teasers & Product Showcases", "Kinetic Social Video Series", "Color Grading & Audio Mixing", "Brand Campaign Storytelling"],
      skills: ["Premiere Pro", "DaVinci Resolve", "Sound Design", "Audio Mastering"]
    },
    {
      id: "motion-design",
      number: "05",
      title: "MOTION DESIGN",
      shortDesc: "Dynamic micro-interactions, liquid UI transitions, and physics-driven 2D/3D brand motion.",
      fullDesc: "Bringing static interfaces to life with purposeful motion choreography. Every curve, damping coefficient, and bounce is tuned to guide the user's focus effortlessly.",
      iconName: "Activity",
      deliverables: ["Interface Micro-Interactions", "Lottie & SVG Vector Animations", "Broadcast Motion Graphics", "Custom Easing Choreography"],
      skills: ["After Effects", "Framer Motion", "Lottie", "Custom Bezier Curves"]
    },
    {
      id: "3d-creative-tech",
      number: "06",
      title: "3D / CREATIVE TECHNOLOGY",
      shortDesc: "Real-time Three.js / WebGL experiences, interactive spatial objects, and procedural shaders.",
      fullDesc: "Architecting interactive 3D digital art and web visualizers directly within the browser. Utilizing Three.js, GLSL fragment shaders, and optimized geometry to deliver 60 FPS luxury visuals.",
      iconName: "Box",
      deliverables: ["Real-time 3D Viewports & Models", "Custom GLSL Shaders & Lighting", "Spatial Canvas Interactions", "Physics Simulation Engines"],
      skills: ["Three.js", "WebGL", "GLSL Shaders", "Blender", "Math & Trigonometry"]
    },
    {
      id: "interactive-exp",
      number: "07",
      title: "INTERACTIVE EXPERIENCES",
      shortDesc: "Sensory microsites, audio-reactive canvases, and digital installations that demand exploration.",
      fullDesc: "Bespoke digital playgrounds designed for brand launches and cultural campaigns that transform passive visitors into active participants through sound, physics, and cursor dynamics.",
      iconName: "Sparkles",
      deliverables: ["Interactive Campaign Microsites", "Generative Web Canvases", "Cursor & Spatial Audio Feedback", "Experimental Brand Activations"],
      skills: ["Web Audio API", "Canvas 2D/3D", "Pointer Events", "Generative Math"]
    },
    {
      id: "ai-digital-exp",
      number: "08",
      title: "AI / DIGITAL EXPERIMENTS",
      shortDesc: "Creative workflows integrating generative models, neural assets, and dynamic machine interfaces.",
      fullDesc: "Exploring the bleeding edge of AI-assisted human creativity—from procedural asset pipelines to real-time neural sensory interfaces that redefine what creative software can accomplish.",
      iconName: "Cpu",
      deliverables: ["Generative Prompt Pipelines", "Custom Synthetic Asset Generation", "AI Interface Integration", "Rapid Technology Prototyping"],
      skills: ["Gemini API", "Neural Workflows", "Vector Embeddings", "Creative Prototyping"]
    }
  ],
  process: [
    {
      number: "01",
      title: "DISCOVER",
      subtitle: "Understand the idea, goal and audience.",
      description: "We dissect the core creative ambition, dissect competitive benchmarks, and pinpoint the singular emotional hook that will differentiate the project in market.",
      milestones: ["Creative Brief & Vision Alignment", "Audience Resonance Analysis", "Technical Feasibility Audit", "Inspiration & Art Direction Deck"]
    },
    {
      number: "02",
      title: "DEFINE",
      subtitle: "Turn the concept into a clear direction.",
      description: "We map out interaction architecture, establish wireframe flows, draft high-fidelity mood boards, and engineer the foundational design token system.",
      milestones: ["Information Architecture Map", "Interactive Wireframing", "Material & Lighting Prototypes", "Design System Foundation"]
    },
    {
      number: "03",
      title: "CREATE",
      subtitle: "Design, build, animate and refine.",
      description: "The synthesis phase. We build component systems, calibrate 3D scenes, compose motion easings, and write clean, resilient, accessible code.",
      milestones: ["Production UI & 3D Modeling", "Component Architecture & Shaders", "Smooth Motion Tuning", "Rigorous Cross-Browser QA"]
    },
    {
      number: "04",
      title: "DELIVER",
      subtitle: "Launch, optimize and support.",
      description: "We optimize bundles, audit Lighthouse and accessibility metrics, configure deployment infrastructure, and provide post-launch monitoring and care.",
      milestones: ["SEO & Meta Verification", "Lighthouse 95+ Audit", "Production Deployment", "Post-Launch Care & Evolution"]
    }
  ],
  projects: [
    {
      id: "nexus-os",
      title: "Nexus OS — Spatial Web Environment",
      subtitle: "Futuristic Glassmorphic Browser Operating System",
      category: "3D",
      year: "2026",
      featured: true,
      size: "large",
      image: "/src/assets/images/project_bubblegum_os_1791466066890.jpg",
      description: "A spatial operating system concept bringing tactile floating glassmorphism, procedural sound design, and multi-layered 3D desktop workspaces directly into modern web browsers.",
      tags: ["Three.js", "WebGL", "React", "Glassmorphism"],
      stats: [
        { label: "Framerate", value: "60 FPS" },
        { label: "Bundle Size", value: "240 KB" },
        { label: "Awwwards", value: "Site of the Day" }
      ],
      caseStudy: {
        overview: "Nexus OS reimagines the traditional desktop window management paradigm as a floating spatial workspace where translucent surfaces respond dynamically to virtual illumination and user gaze.",
        challenge: "Rendering multi-layered frosted glass panels in real-time WebGL while sustaining 60 FPS on low-power mobile devices and maintaining strict accessibility and keyboard navigation standards.",
        objective: "Prove that web browsers can deliver spatial OS fluidity without native desktop application overhead, showcasing NEXEL LAB's signature Bubblegum Pop aesthetic.",
        process: "We engineered custom GLSL refraction shaders paired with HTML5 DOM overlay matrices. Every window maintains full DOM semantic focus, allowing screen readers and keyboard shortcuts to operate natively.",
        design: "Deep teal structural canvases illuminated by glowing cyan navigation docks and soft bubblegum pink active state pills, delivering an undeniably futuristic yet grounded aesthetic.",
        development: "Built using React 19, custom Three.js render pipelines, and Tailwind CSS. The physics engine computes panel momentum with sub-pixel interpolation.",
        technology: ["Three.js", "GLSL Shaders", "React 19", "Tailwind CSS", "Web Audio API"],
        result: "Featured across prominent design publications, achieving 180,000+ interactive sessions with an average dwell time exceeding 4.2 minutes.",
        lessons: "Decoupling 3D visual canvas rendering from DOM event propagation yielded a 40% performance gain over standard CSS 3D transforms.",
        liveUrl: "https://nexel.me/nexus-os",
        repoUrl: "https://github.com/Nexel254/nexus-os"
      }
    },
    {
      id: "kinetic-flux",
      title: "Kinetic Flux — Fluid Liquid Typography",
      subtitle: "Real-time Sculptural Type & Water Reflection",
      category: "MOTION",
      year: "2025",
      featured: true,
      size: "medium",
      image: "/src/assets/images/project_kinetic_type_1791466082581.jpg",
      description: "An experimental typographic installation where typographic forms emerge as translucent neon tubes from simulated fluid pools, reacting to user audio and cursor velocity.",
      tags: ["Motion Design", "GLSL", "After Effects", "Fluid Math"],
      stats: [
        { label: "Interactions", value: "1.2M+" },
        { label: "Audio Sync", value: "<15ms" },
        { label: "FWA", value: "FWA of the Day" }
      ],
      caseStudy: {
        overview: "Kinetic Flux investigates how digital letters can transcend static ink and behave like living liquid organisms with surface tension, buoyancy, and optical chromatic dispersion.",
        challenge: "Simulating accurate viscous fluid behavior and chromatic aberration in real-time without causing thermal throttling on client hardware.",
        objective: "Create an unforgettable brand launch centerpiece for an avant-garde digital arts symposium in Shibuya, Tokyo.",
        process: "Explored generative curves in Houdini before translating the geometry into lightweight bezier splines and custom fragment shaders rendered in WebGL.",
        design: "Sculptural neon pink and electric cyan characters reflecting onto dark teal liquid surfaces, creating an ethereal dreamscape.",
        development: "Crafted a dual-pass rendering technique: the first pass computes surface normals and ripple dispersion, while the second computes refraction and caustics.",
        technology: ["WebGL", "Three.js", "Web Audio API", "TypeScript", "Tailwind CSS"],
        result: "Installed physically in Tokyo and globally streamed, engaging over 40,000 live interactors during opening weekend.",
        lessons: "Users are deeply fascinated when visual typography directly synchronizes with the micro-harmonics of their own voice and mouse strokes.",
        liveUrl: "https://nexel.me/kinetic-flux"
      }
    },
    {
      id: "aetherial-brand",
      title: "Aetherial — Holographic Luxury Identity",
      subtitle: "Digital-First Visual Identity & Packaging System",
      category: "BRANDING",
      year: "2025",
      featured: false,
      size: "medium",
      image: "/src/assets/images/project_chroma_brand_1791466093870.jpg",
      description: "Complete visual identity, bespoke packaging architecture, and interactive 3D brand guidelines for a futuristic lifestyle studio operating in Tokyo and Zurich.",
      tags: ["Brand Identity", "Packaging", "Art Direction", "Figma"],
      stats: [
        { label: "Brand Recall", value: "+84%" },
        { label: "Packaging Units", value: "50K" },
        { label: "Red Dot", value: "Best of Design" }
      ],
      caseStudy: {
        overview: "Aetherial wanted a visual presence that rejected tired minimalist beige tropes, choosing instead an unapologetic luxury aesthetic grounded in deep teal paper stocks and iridescent pink/cyan foil stamping.",
        challenge: "Ensuring the holographic foil stamping colors calibrated accurately between physical uncoated papers and dynamic OLED screen color gamuts.",
        objective: "Position Aetherial as the defining high-fashion technological brand of the late 2020s.",
        process: "Formulated custom Pantone specifications paired with real-time digital 3D packaging visualizers where clients can inspect light refraction angles before physical press runs.",
        design: "Deep teal envelopes and boxes embossed with precision iridescent geometry, balancing quiet architectural spacing with striking color bursts.",
        development: "Built an interactive web-based 3D brand guidelines portal allowing brand partners to download vector assets and test color pairings live.",
        technology: ["Figma", "Three.js", "Illustrator", "Blender", "Next.js"],
        result: "Aetherial sold out their initial product batch within 38 minutes of launch, citing brand design as the #1 purchase motivator in post-checkout surveys.",
        lessons: "Physical luxury packaging gains immense credibility when supported by an equally high-touch interactive web companion.",
        liveUrl: "https://nexel.me/aetherial"
      }
    },
    {
      id: "neo-synth",
      title: "Neo-Synth — Spatial Audio Synthesizer",
      subtitle: "Browser-Native Hardware Synthesizer Simulation",
      category: "WEB",
      year: "2025",
      featured: true,
      size: "full",
      image: "/src/assets/images/project_cyber_audio_1791466108744.jpg",
      description: "An in-browser analog synthesizer and oscilloscope visualizer featuring real-time Web Audio API oscillators, low-pass ladder filters, and responsive 3D hardware knobs.",
      tags: ["Web Audio API", "DSP", "TypeScript", "Canvas 2D"],
      stats: [
        { label: "Latency", value: "2.8 ms" },
        { label: "Presets", value: "64 Built-in" },
        { label: "Wired", value: "Tech Innovation Award" }
      ],
      caseStudy: {
        overview: "Neo-Synth brings tactile analog warmth to the browser. Visitors can dial in frequency modulation, twist glowing cyan knobs, trigger pink neon soundwave pads, and export high-fidelity audio loops.",
        challenge: "Executing low-latency DSP synthesis on the main thread without blocking browser UI animations and rendering pipelines.",
        objective: "Create a joyful, exploratory audio playground demonstrating web creative engineering prowess.",
        process: "Leveraged Web Audio API AudioWorklets running in background audio threads, keeping UI framerates pinned at a solid 60 FPS.",
        design: "Industrial dark brushed teal console with glowing pink waveform screens and tactile cyan rotary controls that react with smooth rotational inertia.",
        development: "Pure TypeScript and Web Audio API architecture with Canvas 2D oscilloscope visualization and MIDI keyboard device support.",
        technology: ["Web Audio API", "AudioWorklet", "TypeScript", "HTML5 Canvas", "Tailwind CSS"],
        result: "Adopted by electronic music producers and sound designers worldwide, generating over 500,000 custom audio clips in 6 months.",
        lessons: "Tactile haptic audio clicks and responsive oscilloscope visualizations turn casual visitors into passionate creators within seconds.",
        liveUrl: "https://nexel.me/neo-synth",
        repoUrl: "https://github.com/Nexel254/neo-synth"
      }
    },
    {
      id: "prism-gallery",
      title: "Prism Space — Spatial Virtual Gallery",
      subtitle: "3D Architectural Exhibition for Digital Sculptors",
      category: "3D",
      year: "2024",
      featured: false,
      size: "medium",
      image: "/src/assets/images/project_bubblegum_os_1791466066890.jpg",
      description: "An architectural WebGL pavilion hosting rotating exhibitions of digital sculptures, complete with spatial audio guides and dynamic ray-marched lighting.",
      tags: ["Three.js", "Spatial Audio", "WebGL", "Architectural"],
      stats: [
        { label: "Artworks", value: "32 Sculptures" },
        { label: "Dwell Time", value: "8.4 min" }
      ],
      caseStudy: {
        overview: "An immersive virtual gallery designed for contemporary digital sculptors, allowing art collectors worldwide to explore spatial pieces in full 3D perspective.",
        challenge: "Rendering large-scale spatial architecture while guaranteeing fast load times across worldwide edge networks.",
        objective: "Deliver a museum-grade exhibition experience accessible from any browser with zero installation.",
        process: "Optimized geometry through Draco compression and implemented progressive level-of-detail (LOD) streaming based on viewer distance.",
        design: "Vaulted deep teal ceilings with soft pink skylight apertures and cyan floor strip illumination guide the visitor intuitively between exhibit rooms.",
        development: "Built on Three.js with custom shadow map cascades and Web Audio spatial sound nodes attached to virtual pedestals.",
        technology: ["Three.js", "Draco Compression", "Web Audio API", "GLSL"],
        result: "Hosted 4 global international exhibitions, selling 100% of exhibited digital sculptures to private collections.",
        lessons: "Lighting discipline is everything in 3D architecture: soft rim lights separate floating forms from the background with instant luxury feel.",
        liveUrl: "https://nexel.me/prism-gallery"
      }
    },
    {
      id: "chroma-motion",
      title: "Chroma Studio — Kinetic Brand Motion",
      subtitle: "Dynamic Micro-Interaction Suite for FinTech",
      category: "DESIGN",
      year: "2024",
      featured: false,
      size: "small",
      image: "/src/assets/images/project_kinetic_type_1791466082581.jpg",
      description: "Comprehensive interaction choreography, SVG animation libraries, and spatial UI guidelines for a next-generation decentralized finance application.",
      tags: ["Motion Systems", "Micro-Interactions", "Framer Motion", "Design Tokens"],
      stats: [
        { label: "Task Speed", value: "+32%" },
        { label: "Conversion", value: "+21.4%" }
      ],
      caseStudy: {
        overview: "A design system initiative bringing playful kinetic reassurance to complex financial transactions through bespoke motion curves and haptic feedback cues.",
        challenge: "Balancing playful visual personality with the solemn trust requirements of enterprise financial management.",
        objective: "Increase user transaction confidence and reduce error rates across complex portfolio rebalancing flows.",
        process: "Crafted over 80 micro-interactions, testing user completion speed and subjective anxiety levels across a 200-person user test cohort.",
        design: "Restrained deep surfaces with high-clarity white typography, accented by subtle cyan confirmation rings and pink progress pulses.",
        development: "Modular React component library with exported CSS custom properties and spring physics presets.",
        technology: ["React", "Framer Motion", "Tailwind CSS", "Storybook"],
        result: "Transaction completion rate improved by 21.4%, with user error tickets dropping by 46% post-deployment.",
        lessons: "Motion should never delay a user; it should run synchronously alongside background API requests to make perceived latency feel instantaneous.",
        liveUrl: "https://nexel.me/chroma-motion"
      }
    }
  ] as Project[],
  skills: [
    { name: "Three.js & WebGL", category: "3D & Motion", level: "Expert", active: true },
    { name: "GLSL Shaders", category: "3D & Motion", level: "Advanced", active: true },
    { name: "React 19 & Next.js", category: "Development", level: "Expert", active: true },
    { name: "TypeScript", category: "Development", level: "Expert", active: true },
    { name: "Tailwind CSS", category: "Development", level: "Expert", active: true },
    { name: "Node.js & Express", category: "Development", level: "Advanced", active: true },
    { name: "Web Audio API", category: "Creative Tech", level: "Advanced", active: true },
    { name: "Figma & Systems", category: "Design", level: "Expert", active: true },
    { name: "Blender 3D", category: "3D & Motion", level: "Advanced", active: true },
    { name: "After Effects", category: "3D & Motion", level: "Advanced", active: true },
    { name: "Creative Direction", category: "Design", level: "Expert", active: true },
    { name: "Performance Optimization", category: "Development", level: "Expert", active: true },
  ],
  milestones: [
    {
      year: "2026",
      title: "Founding NEXEL LAB",
      role: "Lead Creator & Student Explorer",
      description: "Formed experimental digital creative lab focusing on AI exploration, 3D web experiences, and interactive learning prototypes.",
      keyProjects: "Nexus OS, Kinetic Flux, Neo-Synth Platform"
    },
    {
      year: "2025",
      title: "AI & Neural Interface Exploration",
      role: "Student Researcher & Developer",
      description: "Deep dive into multi-modal AI APIs, LLM prompt engineering, and generative audio-visual systems.",
      keyProjects: "Chroma Studio Design System, Prism Space Gallery"
    },
    {
      year: "2024",
      title: "Creative Code & Interactive Web",
      role: "Creative Developer & Student",
      description: "Experimented with WebGL shaders, Three.js spatial viewports, and reactive CSS design systems.",
      keyProjects: "Aetherial Packaging, Spatial Visualizer Experiments"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Marcus Thorne",
      role: "Chief Product Officer",
      company: "Synthetix Spatial",
      quote: "NEXEL LAB completely redefined what we believed was possible inside a web browser. The 3D interaction quality and performance optimizations elevated our product launch into an international event.",
      verifiedResult: "+210% Inbound Inquiries in First 30 Days"
    },
    {
      id: "2",
      name: "Akira Tanaka",
      role: "Founder & Creative Director",
      company: "Komorebi Arts Tokyo",
      quote: "Working with NEXEL LAB is a rare masterclass. The subtle balance of high-end art direction with creative code and AI exploration is truly one of one.",
      verifiedResult: "Awwwards Site of the Month Winner"
    },
    {
      id: "3",
      name: "Elena Rostova",
      role: "VP of Brand Experience",
      company: "Aetherial Group Zurich",
      quote: "Our luxury packaging and 3D web portal feel entirely cohesive. The Bubblegum Pop aesthetic provided just the right balance of playful futurism and elegance.",
      verifiedResult: "100% Initial Inventory Sold in 38 Minutes"
    }
  ],
  faqs: [
    {
      question: "What types of projects does NEXEL LAB take on?",
      answer: "We partner on high-impact digital initiatives including custom 3D / WebGL interactive websites, flagship product landing experiences, brand identity design systems, spatial web prototypes, and creative technology installations."
    },
    {
      question: "How does the studio process and timeline work?",
      answer: "Most flagship projects span between 4 to 8 weeks across our 4-phase methodology: Discover (Week 1), Define (Week 2), Create (Weeks 3–6), and Deliver (Weeks 7–8). We work closely with founders and executive stakeholders with weekly interactive progress drops."
    },
    {
      question: "Can 3D WebGL experiences perform smoothly on mobile phones?",
      answer: "Yes, performance is our top priority. We optimize every geometry buffer, compress textures via Draco/KTX2, and utilize smart fallback rendering on mobile devices so our experiences maintain silky 60 FPS across mid-tier smartphones without overheating."
    },
    {
      question: "Do you collaborate with international clients across time zones?",
      answer: "Absolutely. Over 80% of our collaborations are worldwide across Tokyo, Zurich, London, New York, and San Francisco. We operate with transparent asynchronous documentation and scheduled live alignment sprints."
    },
    {
      question: "Can you consult or elevate an existing web platform?",
      answer: "Yes. In addition to full greenfield builds, we offer high-impact Creative Sprints where we audit, redesign, and engineer key interactive focal points, 3D heroes, or design token architectures for existing enterprise codebases."
    },
    {
      question: "What happens after the project launches?",
      answer: "Every delivery includes full source code handoff, comprehensive documentation, performance auditing, and 30 days of complimentary post-launch support and telemetry observation. We also offer ongoing retainer partnerships for select clients."
    }
  ],
  socials: [
    { platform: "Discord", handle: "nexel (1184100926533926982)", url: "https://discord.com/users/1184100926533926982", icon: "Discord", desc: "Chat, connect and discuss AI experiments directly" },
    { platform: "GitHub", handle: "Nexel254", url: "https://github.com/Nexel254", icon: "Github", desc: "My code repositories, web builds and AI explorations" },
    { platform: "WhatsApp", handle: "@ne_x_el_", url: "https://wa.me/?text=Hi%20NEXEL", icon: "WhatsApp", desc: "Quick direct message & project conversations" },
    { platform: "Instagram", handle: "@ne_x_el_", url: "https://www.instagram.com/ne_x_el_?xtok=MTd3NDJhZ2Z1Zzc5bw==", icon: "Instagram", desc: "Creative visual experiments and learning milestones" },
    { platform: "X / Twitter", handle: "@nexxel_me", url: "https://x.com/nexxel_me", icon: "Twitter", desc: "Thoughts, insights and breakthroughs in AI discovery" },
  ]
};
