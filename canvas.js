class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }
    
    reset() {
        // All particles originate from the bottom (flame-like behavior)
        const margin = 100;
        
        // Start position: random position along the bottom
        this.x = Math.random() * (this.canvas.width + margin * 2) - margin;
        this.y = this.canvas.height + margin;
        
        this.startX = this.x;
        this.startY = this.y;
        
        // Generate curved path using bezier control points
        this.generatePath();
        
        // Random color from palette
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        
        // Progress along the path (0 to 1)
        this.progress = 0;
        
        // Speed variation - random speed within configured range
        this.speed = config.particleSpeedMin + Math.random() * (config.particleSpeedMax - config.particleSpeedMin);
        
        // Size variation - randomly choose start and end sizes independently
        const minSize = config.particleSize;
        const maxSize = config.particleSizeMax;
        
        this.startSize = minSize + Math.random() * (maxSize - minSize);
        this.endSize = minSize + Math.random() * (maxSize - minSize);
        
        // For smoother curves
        this.pathProgress = 0;
    }
    
    generatePath() {
        // End point must be above where the particle starts (flame rises up)
        const margin = 100;
        
        // Constrain horizontal drift to within 25% of screen width from start position
        const maxHorizontalDrift = this.canvas.width * 0.25;
        const horizontalOffset = (Math.random() * 2 - 1) * maxHorizontalDrift;
        this.endX = this.startX + horizontalOffset;
        
        // End y position must be off the top of the screen
        // Range from just off-screen (-margin) to way off-screen (-margin - 500)
        this.endY = -margin - Math.random() * 500;
        
        // Generate control points for curved path
        const midX = (this.startX + this.endX) / 2;
        const midY = (this.startY + this.endY) / 2;
        
        // Offset for curvature
        const offset = config.curviness * 300 * (Math.random() * 2 - 1);
        const perpX = -(this.endY - this.startY);
        const perpY = (this.endX - this.startX);
        const perpLen = Math.sqrt(perpX * perpX + perpY * perpY);
        
        this.controlX = midX + (perpX / perpLen) * offset;
        this.controlY = midY + (perpY / perpLen) * offset;
    }
    
    update() {
        // Move along the path
        this.progress += this.speed / config.pathLength;
        
        if (this.progress >= 1) {
            return false; // Particle has completed its journey
        }
        
        // Quadratic bezier curve
        const t = this.progress;
        const mt = 1 - t;
        
        this.x = mt * mt * this.startX + 2 * mt * t * this.controlX + t * t * this.endX;
        this.y = mt * mt * this.startY + 2 * mt * t * this.controlY + t * t * this.endY;
        
        return true;
    }
    
    draw(ctx) {
        // Interpolate size based on progress for depth effect
        const currentSize = this.startSize + (this.endSize - this.startSize) * this.progress;
        
        // Fade out particles as they move along path
        // Start at 100% opacity, reach 0% at 90% progress
        let opacity = 1.0;
        if (this.progress <= 0.9) {
            opacity = 1.0 - (this.progress / 0.9);
        } else {
            opacity = 0;
        }
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = opacity * config.particleOpacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('background');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Pre-populate with particles at random progress for "already in action" feel
        this.initializeParticles();
        
        this.animate();
    }
    
    initializeParticles() {
        // Create initial particles spread across their paths
        const initialCount = Math.floor(config.maxParticles * 0.7);
        for (let i = 0; i < initialCount; i++) {
            const particle = new Particle(this.canvas);
            // Set random progress so particles appear already in motion
            particle.progress = Math.random();
            
            // Update position based on initial progress
            const t = particle.progress;
            const mt = 1 - t;
            particle.x = mt * mt * particle.startX + 2 * mt * t * particle.controlX + t * t * particle.endX;
            particle.y = mt * mt * particle.startY + 2 * mt * t * particle.controlY + t * t * particle.endY;
            
            this.particles.push(particle);
        }
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        // Clear canvas
        this.ctx.fillStyle = config.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles = this.particles.filter(particle => {
            const alive = particle.update();
            if (alive) {
                particle.draw(this.ctx);
            }
            return alive;
        });
        
        // Spawn new particles
        if (this.particles.length < config.maxParticles && Math.random() < config.spawnRate) {
            this.particles.push(new Particle(this.canvas));
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ParticleSystem());
} else {
    new ParticleSystem();
}
