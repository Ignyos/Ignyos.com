// Tab highlighting on scroll
function renderCardBody(project) {
    // For demo, use placeholder tagline and details if not present
    const tagline = project.tagline || "A brief tagline goes here.";
    const details = project.details || project.description || "Detailed description goes here.";
    return `
        <img src="${project.image}" alt="${project.name} logo" class="project-image">
        <div class="project-name">${project.name}</div>
        <div class="project-tagline">${tagline}</div>
        <div class="project-details">${details}</div>
    `;
}

function renderCardFooter(project) {
    if (!project.buttons || !Array.isArray(project.buttons)) return "";
    return `<div class="project-buttons">${project.buttons.map(btn => `
        <a href="${btn.url}" class="card-btn card-btn-${btn.type || 'primary'}" target="_blank" rel="noopener noreferrer">${btn.label}</a>
    `).join('')}</div>`;
}

document.addEventListener('DOMContentLoaded', function () {
	// Only render project cards on index.html
	if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
		if (typeof projects !== 'undefined' && Array.isArray(projects)) {
			const main = document.querySelector('main');
			main.innerHTML = '<div class="card-grid"></div>';
			const grid = main.querySelector('.card-grid');
			projects.forEach(project => {
				const card = document.createElement('div');
				card.className = 'project-card';
				card.setAttribute('data-tags', project.tags.join(','));
				card.innerHTML = `
					${renderCardBody(project)}
					${renderCardFooter(project)}
				`;
				grid.appendChild(card);
			});
		}
	}
});

function updateScreenWidthIndicator() {
  if (window.location.protocol === 'https:') {
    const bpEl = document.getElementById('breakpoint-indicator');
    if (bpEl && bpEl.parentNode) {
      bpEl.parentNode.removeChild(bpEl);
    }
  } else {
    const el = document.getElementById('screen-width-indicator');
    if (el) el.textContent = `${window.innerWidth} `;
  }
}
window.addEventListener('resize', updateScreenWidthIndicator);
document.addEventListener('DOMContentLoaded', updateScreenWidthIndicator);
