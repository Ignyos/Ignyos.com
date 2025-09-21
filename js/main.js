
// Tab highlighting on scroll
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
					<img src="${project.image}" alt="${project.name} logo" class="project-image">
					<h3>${project.name}</h3>
					<p>${project.description}</p>
					<a href="${project.link}" class="project-link">Learn more</a>
				`;
				grid.appendChild(card);
			});
		}
	}
});
