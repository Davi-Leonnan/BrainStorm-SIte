(() => {
	const storageKey = 'brainstorm-theme';
	let currentTheme = 'dark';

	try {
		const savedTheme = localStorage.getItem(storageKey);
		if (savedTheme === 'light' || savedTheme === 'dark') {
			currentTheme = savedTheme;
		}
	} catch {
		currentTheme = 'dark';
	}

	const applyTheme = (theme) => {
		currentTheme = theme;
		document.documentElement.dataset.theme = theme;
	};

	applyTheme(currentTheme);

	const mountToggle = () => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'theme-toggle';
		button.innerHTML = '<span class="theme-toggle__sr-only"></span>';

		const updateButton = () => {
			const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
			const targetLabel = targetTheme === 'light' ? 'claro' : 'escuro';
			const icon = currentTheme === 'dark'
				? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>'
				: '<path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"></path>';

			button.setAttribute('aria-label', `Ativar tema ${targetLabel}`);
			button.setAttribute('aria-pressed', String(currentTheme === 'light'));
			button.title = `Ativar tema ${targetLabel}`;
			button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg><span class="theme-toggle__sr-only">Ativar tema ${targetLabel}</span>`;
		};

		button.addEventListener('click', () => {
			const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
			applyTheme(nextTheme);
			updateButton();
			try {
				localStorage.setItem(storageKey, nextTheme);
			} catch {
				return;
			}
		});

		updateButton();
		document.body.append(button);
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', mountToggle, { once: true });
	} else {
		mountToggle();
	}
})();