const form = document.querySelector('#pedido-form');
const statusMessage = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const formData = new FormData(form);
	const request = [
		'Pedido de projeto - BrainStorm Engenharia',
		'',
		`Nome: ${formData.get('nome')}`,
		`E-mail: ${formData.get('email')}`,
		`Empresa: ${formData.get('empresa') || 'Não informada'}`,
		`Serviço: ${formData.get('servico')}`,
		'',
		'Sobre o projeto:',
		formData.get('projeto'),
	].join('\n');

	const file = new Blob([request], { type: 'text/plain;charset=utf-8' });
	const fileUrl = URL.createObjectURL(file);
	const downloadLink = document.createElement('a');
	downloadLink.href = fileUrl;
	downloadLink.download = 'pedido-brainstorm.txt';
	document.body.append(downloadLink);
	downloadLink.click();
	downloadLink.remove();
	window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);

	statusMessage.textContent = 'Seu pedido foi preparado e baixado neste dispositivo.';
});
