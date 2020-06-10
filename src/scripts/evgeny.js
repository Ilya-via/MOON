$(document).ready(function () {
	// маска для поля телефона
	$('.phone_us').mask('+375(29) 000-00-00');

	// слайдеры в секции наши работы
	const sliders = {}
	// слайдер наши работы 1
	sliders['works1'] = new Glide('.glide_our-works1', {
		type: 'carousel',
		autoplay: 4000,
		animationDuration: 700,
		focusAt: 'center',
		perView: 3,
		gap: 12,
		// breakpoints:{
		//     460: {
		//         perView: 1,
		//         focusAt: 0
		//     }
		// }
	})
	sliders['works1'].mount();

	// слайдер наши работы 2
	sliders['works2'] = new Glide('.glide_our-works2', {
		type: 'carousel',
		autoplay: 4000,
		animationDuration: 700,
		focusAt: 'center',
		perView: 3,
		gap: 12,
		// breakpoints:{
		//     460: {
		//         perView: 1,
		//         focusAt: 0
		//     }
		// }
	})
	sliders['works2'].mount();

	// слайдер наши работы 3
	sliders['works3'] = new Glide('.glide_our-works3', {
		type: 'carousel',
		autoplay: 4000,
		animationDuration: 700,
		focusAt: 'center',
		perView: 3,
		gap: 12,
		// breakpoints:{
		//     460: {
		//         perView: 1,
		//         focusAt: 0
		//     }
		// }
	})
	sliders['works3'].mount();

	// переключение слайдеров в секции "Наши работы"
	$('.our_works_buttons button').click(function () {
		if (this.classList.contains('active-work')) {
			return
		} else {
			$('.active_slider').removeClass('active_slider')
			$('.our_works_buttons .active-work').removeClass('active-work')
			this.classList.add('active-work')
			const slider = this.dataset.target
			$(`.${slider}`).addClass('active_slider')
		}
	})

	// слайдер отзывы клиентов
	new Glide('.glide', {
		type: 'carousel',
		autoplay: 8000,
		animationDuration: 900,
		perView: 1,
		focusAt: 0,
		gap: 0
	}).mount();

	// модальные окна
	MicroModal.init({});
	// заказать абонемент
	$('.for_modal').click(function () {
		setTimeout(function () {
			MicroModal.close('modal-1')
		}, 3000)
	})


	// запрет отправки формы
	$('.order_form').submit(function (e) {
		e.preventDefault()
	})

})