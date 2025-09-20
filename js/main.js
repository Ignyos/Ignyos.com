
// Tab highlighting on scroll
document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.querySelectorAll('nav a.tab');
	const sections = Array.from(document.querySelectorAll('.category-section'));

	function activateTab(index) {
		tabs.forEach(tab => tab.classList.remove('active'));
		if (tabs[index]) tabs[index].classList.add('active');
	}

	function onScroll() {
		let activeIndex = 0;
		const scrollY = window.scrollY + window.innerHeight / 4;
		sections.forEach((section, i) => {
			if (section.offsetTop <= scrollY) {
				activeIndex = i;
			}
		});
		activateTab(activeIndex);
	}

	window.addEventListener('scroll', onScroll);
	onScroll();

	// Smooth scroll for tab clicks
	tabs.forEach((tab, i) => {
		tab.addEventListener('click', function (e) {
			e.preventDefault();
			sections[i].scrollIntoView({ behavior: 'smooth' });
			activateTab(i);
		});
	});
});
