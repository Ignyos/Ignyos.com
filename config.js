const config = {
    // Particle system settings
    maxParticles: 200,           // Maximum number of particles on screen at once
    particleSpeedMin: 0.35,     // Minimum speed of particle movement (pixels per frame)
    particleSpeedMax: 0.85,     // Maximum speed of particle movement (pixels per frame)
    particleSize: 2,            // Base size of each particle in pixels (used as minimum)
    particleSizeMax: 6,         // Maximum starting size of particles
    spawnRate: 0.03,            // Probability of spawning a new particle each frame (0-1)
    
    // Path settings
    curviness: 0.5,             // How curved the particle paths are (0-1)
    pathLength: 1500,           // Average length of particle paths in pixels
    
    // Visual settings
    particleOpacity: 0.6,       // Opacity of particles (0-1)
    trailLength: 0,             // Length of particle trails (0 = no trail)
    
    // Color palette - particles will randomly choose from these colors
    colors: [
        '#ff9b6b',              // Soft orange
        '#ff7e5e',              // Coral
        '#ffb85e',              // Golden
        '#ff8d7a',              // Warm pink
        '#ffa97a',              // Peach
    ],
    
    // Background color (should match CSS)
    backgroundColor: '#0a0a0a'
};
