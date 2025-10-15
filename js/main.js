// Modern project card rendering
function createProjectCard(project) {
    const cardElement = document.createElement('div');
    cardElement.className = 'project-card';
    cardElement.setAttribute('data-tags', project.tags.join(','));
    
    // Determine button classes
    const buttons = project.buttons.map(btn => {
        const btnClass = btn.type === 'light-blue' ? 'btn-primary' : 'btn-secondary';
        return `<a href="${btn.url}" class="btn ${btnClass}" target="_blank" rel="noopener noreferrer">${btn.label}</a>`;
    }).join('');
    
    cardElement.innerHTML = `
        <div class="card-header">
            <img src="${project.image}" alt="${project.name} logo" class="project-logo">
            <div class="card-title-section">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-tagline">${project.tagline}</p>
            </div>
        </div>
        <div class="card-content">
            <p class="project-description">${project.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}</p>
        </div>
        <div class="card-actions">
            ${buttons}
        </div>
    `;
    
    return cardElement;
}

document.addEventListener('DOMContentLoaded', function () {
    // Only render project cards on the home page
    const container = document.getElementById('projects-container');
    if (container && typeof projects !== 'undefined' && Array.isArray(projects)) {
        // Add staggered animation delay
        projects.forEach((project, index) => {
            const card = createProjectCard(project);
            card.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(card);
        });
    }
});
