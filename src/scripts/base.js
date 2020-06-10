// SCALE FOR BUTTON
function reservationButtonHold(value, className) {
	value.classList.add(className);
}
function removeReservationButtonHold(value, className) {
	value.classList.remove(className);
}

$(document).ready(function () {
	function formVissible() {
		$(".order_form_container1").fadeIn();
	}
	// ourServices button
	$('#ourServices').on("mousedown", ".ourServices__reservation-button", function () {
		reservationButtonHold(this, "ourServices__reservation-button--on");
		formVissible();
	});
	$('#ourServices').on("mouseup mouseout", ".ourServices__reservation-button", function () {
		removeReservationButtonHold(this, "ourServices__reservation-button--on");
	});
	// header button shadow
	$('.header').on("mousedown", ".header__phone-button", function () {
		reservationButtonHold(this, "header__phone-button--on");
	});
	$('.header').on("mouseup mouseout", ".header__phone-button", function () {
		removeReservationButtonHold(this, "header__phone-button--on");
	});
	// hamburger button shadow
	$('.header').on("mousedown", ".header__hamburger", function () {
		reservationButtonHold(this, "header__hamburger-button--on");
	});
	$('.header').on("mouseup mouseout", ".header__hamburger", function () {
		removeReservationButtonHold(this, "header__hamburger-button--on");
	});
	// header registration button
	$('.header').on("mousedown", ".header__online-registration-button", function () {
		reservationButtonHold(this, "header__online-registration-button--on");
		formVissible();
	});
	$('.header').on("mouseup mouseout", ".header__online-registration-button", function () {
		removeReservationButtonHold(this, "header__online-registration-button--on");
	});
});

function unvissibleInputsService() {
	$(".inputs__type-service").removeClass("accordion-active").removeClass("inputs__type-service--on");
	$(".inputs__type-service").siblings('.content').fadeOut();
	$(".inputs__tick").removeClass("rotate-arrow").removeClass("inputs__tick--on");
}
var Data = {
	date: {
		days: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
		weekDay: '',
		number: '',
		month: '',
		year: ''
	},
	turn: 0
}

// ANIMATION HAMBURGER MENU
$(document).ready(function () {
	$('#hamburger').click(function () {
		$('#hamburger-icon').toggleClass('hamburger-active');
		Data.turn++;
		if ((Data.turn) % 2 == 0) {
			$('.header__menu-tablet').fadeOut("slow").removeClass("tick");
		} else {
			$('.header__menu-tablet').fadeIn("slow").addClass("tick");
		}
	});
});

// MENU TABLET UNVISSIBLE - EVENT SCROLL
window.addEventListener('scroll', trackScroll);
function trackScroll() {
	if (window.pageYOffset > 200 && $('.header__menu-tablet').hasClass("tick")) {
		$('#hamburger-icon').toggleClass('hamburger-active');
		$('.header__menu-tablet').fadeOut("slow").removeClass("tick");
		Data.turn++;
	}
}

// Accordion
$(document).ready(function () {
	$(".inputs__type-service").on("click", function () {
		if ($(".inputs__type-service").hasClass('accordion-active')) {
			unvissibleInputsService();
		} else {
			$(".inputs__type-service").addClass("accordion-active").addClass("inputs__type-service--on");
			$(".inputs__tick").addClass("rotate-arrow").addClass("inputs__tick--on");
			$(".inputs__type-service").siblings('.content').fadeIn();
		}
	});
});

// Type of service input
$(document).ready(function () {
	$('.content>div>label').mousedown(function () {
		reservationButtonHold(this, "inputs__label--on");
	});
	$('.content>div>label').mouseup(function () {
		removeReservationButtonHold(this, "inputs__label--on");
	});
	$('.content>div>label').mouseout(function () {
		removeReservationButtonHold(this, "inputs__label--on");
	});
	$('.content>div>label').click(function () {
		var inputId = $(this).attr("for"),
			inputValue = $("#" + inputId).attr("value");
		$('#type-service').attr("value", inputValue);
		$('.inputs__type-service>span:first-child').html(inputValue).addClass('inputs__font-active');
		unvissibleInputsService();
	});
});

// CALENDAR
$(document).ready(function () {
	$("#datepicker").datepicker({ firstDay: 1 });
	$('.inputs__date-time-container').click(function () {
		$(".datepicker_container").fadeIn();
	});

	// Close
	$('.datepicker__close').mousedown(function () {
		$('.datepicker__close>div').addClass("datepicker__close--on");
	});
	$('.datepicker__close>div').mouseup(function () {
		$('.datepicker__close>div').removeClass("datepicker__close--on");
	});
	$('.datepicker__close>div').mouseout(function () {
		$('.datepicker__close>div').removeClass("datepicker__close--on");
	});
	$('.datepicker__close').click(function () {
		$(".datepicker_container").fadeOut();
	});

	// Close на весь container
	$('.order_form__close').mousedown(function () {
		$('.order_form__close>div').addClass("order_form__close--on");
	});
	$('.order_form__close>div').mouseup(function () {
		$('.order_form__close>div').removeClass("order_form__close--on");
	});
	$('.order_form__close>div').mouseout(function () {
		$('.order_form__close>div').removeClass("order_form__close--on");
	});
	$('.order_form__close').click(function () {
		$(".order_form_container1").fadeOut();
	});

	// Close на весь container при нажатии кнопки "заказать"
	$('.order_form_container1 .for_modal').click(function () {
		$(".order_form_container1").fadeOut();
	});

	// Делаем возможным выбор только одной ячейки - раздел день.
	$('.datepicker__time').click(function () {
		var list = this.classList,
			element = this,
			classValue,
			elemetClassName;

		for (var a = 0; a < $('.datepicker__time').length; a++) {
			if ($($('.datepicker__time')[a]).hasClass("checked")) {
				$($('.datepicker__time')[a]).removeClass("checked").removeClass("datepicker__time--on");
				$(element).addClass("checked");
			} else {
				for (var i = 0; i < list.length; i++) {
					if (list[i].indexOf('datepicker__time-block') > -1) {
						classValue = list[i];
					}
				}
			}
		}
		elemetClassName = '.' + classValue;
		$(elemetClassName).addClass("datepicker__time--on").addClass("checked");
		$('.inputs__time>:last-child').html($(elemetClassName + '>span').text()).addClass('inputs__font-active');
		$('.inputs__time>:first-child').addClass('inputs__time-icon--on');
	});

	// Изменение цвета шрифта в input
	$('.inputs__name').change(function () {
		$('.inputs__name').addClass("inputs__font-active");
	});
	$('.phone_us').change(function () {
		$('.phone_us').addClass("inputs__font-active");
	});
});

// Убрать календарь при нажатии на все елементы вне его.
$(document).click(function (e) {
	let elem = $(".datepicker_container");
	if (e.target != elem[0] && !elem.has(e.target).length && (!$(e.target).hasClass("ui-datepicker-prev")) && (!$(e.target).hasClass("ui-datepicker-next"))) {
		elem.hide();
	}
});

// Извлекаем дату  - календарь
$(document).ready(function () {
	$(document).on("mouseup", ".ui-state-default", function () {
		var parent = $($(this).parent()[0]);
		Data.date.number = $(this).text();
		Data.date.month = 1 + Number(parent.attr('data-month'));
		Data.date.year = parent.attr('data-year');
		if (Data.date.number < 10) {
			Data.date.number = "0" + Data.date.number;
		}
		if (Data.date.month < 10) {
			Data.date.month = "0" + Data.date.month;
		}
		function getWeekDay(date) {
			return Data.date.days[date.getDay()];
		}
		Data.date.weekDay = getWeekDay(new Date(Data.date.year, (Data.date.month - 1), Data.date.number));
		$('.inputs__date>:last-child').html(Data.date.number + '.' + Data.date.month + '.' + Data.date.year).addClass('inputs__font-active');
		$('.inputs__date>:first-child').addClass('inputs__date-icon--on');
		$('.inputs__date>:last-child').html(Data.date.number + '.' + Data.date.month + '.' + Data.date.year).addClass('inputs__font-active');
		$('.datepicker__day').html(Data.date.weekDay);
	});
});

// Плавный скролл
$(document).ready(function () {
	$("ul>li>a:not(.header__container-tel a)").on("click", function (event) {
		event.preventDefault();
		let id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 700);
	});
});

// Animated scroll button
var eventObj = {
	appended: ""
};
$(window).scroll(function () {
	if (window.pageYOffset > 200) {
		if (eventObj.appended == "") {
			eventObj.appended = false;
		}
		if (!eventObj.appended) {
			$('.btn-scrollUp').removeClass('invisible');
			setTimeout(function () {
				$('.btn-scrollUp').removeClass("opacityNone");
				eventObj.appended = true;
			}, 50);
		}

	} else if (eventObj.appended) {
		$('.btn-scrollUp').addClass("opacityNone");
		setTimeout(function () {
			$('.btn-scrollUp').addClass("invisible");
			eventObj.appended = false;
		}, 250);
	}
});

$(document).ready(function () {
	$('.btn-scrollUp').click(function () {
		$('html, body').animate({
			scrollTop: 0
		}, 150)
	});

	$(document).on("mousedown", ".btn-scrollUp", function () {
		selectionScrollButton();
	});
	$(document).on("mouseup mouseout", ".btn-scrollUp", function () {
		noselectionScrollButton();
	});
});

function selectionScrollButton() {
	$('.btn-scrollUp').addClass('btn-scrollUp--on');
}
function noselectionScrollButton() {
	$('.btn-scrollUp').removeClass('btn-scrollUp--on');
}


// Слайдер для дней недели
// $('.datepicker__tick-prev').click(function () {
// 	for (let i = 0; i < Data.date.days.length; i++) {
// 		if (Data.date.days[i] == $('.datepicker__day').text()) {
// 			if (i == 0) {
// 				$('.datepicker__day').html(Data.date.days[6]);
// 				console.log(Data.date.days[6]);
// 				return
// 			} else {
// 				$('.datepicker__day').html(Data.date.days[i - 1]);
// 				console.log(Data.date.days[i - 1]);
// 			}
// 		}
// 	}
// });
// $('.datepicker__tick-next').click(function () {
// 	for (let c = 0; c < Data.date.days.length; c++) {
// 		if (Data.date.days[c] === $('.datepicker__day').text()) {
// 			if (c == 6) {
// 				$('.datepicker__day').html(Data.date.days[0]);
// 				console.log(Data.date.days[0]);
// 			} else {
// 				$('.datepicker__day').html(Data.date.days[c + 1]);
// 				console.log(Data.date.days[c + 1]);
// 				return
// 			}
// 		}
// 	}
// });