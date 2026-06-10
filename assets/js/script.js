/*!
 * script.js
 * メインスクリプト
 * 特定ページのみで動作する処理は、DOMの存在確認を最初に行うこと
 * 提出前に console.log・デバッグコードを削除すること
 */

jQuery(function ($) {

	// ハンバーガーメニュー（SP）
	let navButton = $("#js-nav-button");
	let globalNav = $(".global-nav");

	navButton.on("click", function () {
		if (globalNav.css("display") === "block") {
			globalNav.slideUp();
			$(this).removeClass('is-active');
			$(this).attr('aria-expanded', 'false');
		} else {
			globalNav.slideDown();
			$(this).addClass('is-active');
			$(this).attr('aria-expanded', 'true');
		}
	});

	// ヘッダー DOM 移動・高さ調整
	$(window).on("load resize", function () {
		const headerSnsLinks = $(".header-links");
		const searchBox      = $("#___gcse_0, .gcse-searchbox-only");
		const icon           = $(".header-icon");

		function headerDomMove() {
			if (window.innerWidth > 1100) {
				// PC：SNS→ロゴ→検索の順
				headerSnsLinks.prependTo(".header-inner");
				if (icon.next()[0] !== searchBox[0]) {
					searchBox.insertAfter(icon);
				}
				$('.global-nav').show();
			} else {
				// SP：検索を .global-nav 内の .header-contact-wrap の前へ
				headerSnsLinks.insertAfter(".nav-list");
				const $contactInNav = $(".global-nav .header-contact-wrap").first();
				if ($contactInNav.length) {
					searchBox.first().insertBefore($contactInNav);
				}
				$('.global-nav').hide();
			}
		}

		function adjustHeight() {
			const headerHeight    = $("#js-header").outerHeight();
			const fixedLinkHeight = $(".fixed-link").outerHeight();
			if (window.innerWidth > 767) {
				$('.footer').css('padding-bottom', 0);
			} else {
				$('.footer').css('padding-bottom', fixedLinkHeight + 'px');
			}
			$('.global-nav-header').css('height', headerHeight + 'px');
		}

		$.when(headerDomMove()).done(adjustHeight);
	});

	// matchHeight
	$(window).on('load resize', function () {
		$('.list-card-heading').matchHeight();
	});

	// ヘッダースクロールアクション（PCのみ：下スクロールで隠す）
	$(window).on('load resize', function () {
		let windowWidth = $(window).width();
		const trigger   = 1100;
		const $header   = $('#js-header-wrapper');
		let scrollPosition = 0;
		let lastPosition   = 0;

		if (trigger <= windowWidth) {
			$(window).on('scroll', function () {
				scrollPosition = $(this).scrollTop();
				if (scrollPosition > lastPosition) {
					$header.addClass('is-fixed');
				} else {
					$header.removeClass('is-fixed');
				}
				lastPosition = scrollPosition;
			});
		}
	});

	// カードレイアウト：ボタンがある li に下マージンを付与
	$('.list-card li').has('.button-wrap').each(function () {
		$(this).find('.list-card-description').css('margin-bottom', '50px');
	});

	// Slick スライダー（KVメイン）
	function initSlick() {
		const slickOptions = {
			autoplay: true,
			dots: true,
			lazyLoad: 'progressive',
		};

		if ($(window).width() <= 767) {
			$.extend(slickOptions, {
				fade: true,
				slidesToShow: 1,
			});
		} else {
			$.extend(slickOptions, {
				centerMode: true,
				pauseOnHover: false,
				slidesToShow: 5,
				variableWidth: true,
			});
		}

		$('#js-kv-slider').slick(slickOptions);
	}

	initSlick();

	$(window).on('resize', function () {
		$('#js-kv-slider').slick('unslick');
		initSlick();
	});

	// Slick アクセシビリティ修正：aria-hidden と tabindex を同期
	$(document).on('init breakpoint afterChange', '.slick-slider', function (event, slick) {
		$(this).find('.slick-slide').each(function () {
			var $slide    = $(this);
			var isHidden  = $slide.attr('aria-hidden') === 'true';
			if (isHidden) {
				$slide.attr('tabindex', '-1');
				$slide.find('a, button, input, select, textarea').attr('tabindex', '-1');
			} else {
				$slide.removeAttr('tabindex');
				$slide.find('a, button, input, select, textarea').removeAttr('tabindex');
			}
		});
	});

	// Slick センターモード
	function slickCenterMode() {
		$('#js-slider-center-mode').not('.slick-initialized').slick({
			responsive: [{
				breakpoint: 3000,
				settings: "unslick"
			}, {
				breakpoint: 768,
				settings: {
					arrows: true,
					lazyLoad: 'progressive',
					centerMode: true,
					centerPadding: '10%'
				}
			}]
		});
	}

	// Slick 連動メイン
	function slickInterlockingMain() {
		$('#js-slider-interlocking-main').not('.slick-initialized').slick({
			arrows: true
		});
	}

	$(window).on("load resize", function () {
		slickCenterMode();
		slickInterlockingMain();
	});

	$('.js-slick-list').slick({
		autoplay: true,
		dots: true,
		arrows: false,
		fade: true
	});

	// お試し居住スライダー
	$(".js-trial-house").each(function (i) {
		$(this).find(".js-trail-house-slider").addClass('data-slider-' + i).slick({
			fade: true,
			draggable: false,
			swipe: false,
			touchMove: false,
			asNavFor: ".data-slider-thumbnail-" + i
		});

		$(this).find(".js-trail-house-slider-thumbnail").addClass('data-slider-thumbnail-' + i).slick({
			slidesToShow: 3,
			focusOnSelect: true,
			draggable: false,
			swipe: false,
			touchMove: false,
			asNavFor: ".data-slider-" + i
		});
	});

	// Modaal（インライン・動画）
	$(".inline").modaal({
		background: '#F8F7F0',
	});

	$('.js-modal-movie').modaal({
		type: 'video',
		background: '#F8F7F0',
		after_open: function () {
			$(".modaal-close").appendTo(".modaal-video-wrap");
		}
	});

	// タブ（シンプル）
	$('.js-tab-button').on('click', function () {
		$('.js-tab-button, .js-tab-panel').removeClass('is-active');
		$(this).addClass('is-active');
		var index = $('.js-tab-button').index(this);
		$('.js-tab-panel').eq(index).addClass('is-active');
	});

	// タブ（ルート）
	(function () {
		let tabButton    = $('#js-route-tokyo li');
		let stationDot   = $(".station-dot");
		let contents     = $('.route-map-tab');
		let itemStation  = $('.route-map-tab-item');
		contents.not(':first').hide();
		tabButton.click(function () {
			let index = tabButton.index(this);
			contents.hide();
			itemStation.hide();
			stationDot.removeClass('is-select');
			contents.eq(index).show();
			itemStation.fadeIn("100");
			stationDot.eq(index).addClass('is-select');
			tabButton.removeClass('is-select');
			$(this).addClass('is-select');
		});
	})();

	// ツールチップ幅計算
	$('.js-tooltip-body').each(function () {
		const $this        = $(this);
		const $tooltipLine = $this.find('.route-map-tooltip-line');
		const leftPadding  = parseInt($this.css('padding-left'));
		const rightPadding = parseInt($this.css('padding-right'));
		const totalPadding = leftPadding + rightPadding;
		const rate         = parseInt($tooltipLine.css('font-size'));
		const textCount    = $tooltipLine.text().length;
		const tooltipWidth = textCount * rate + totalPadding;
		$this.css('width', tooltipWidth);
	});

	$('.js-tooltip').hover(
		function () {
			$(this).addClass('is-hover').children('.js-tooltip-body').end();
			$(this).next('.route-map-tooltip-annotation').show();
		},
		function () {
			$(this).removeClass('is-hover').children('.js-tooltip-body').end();
			$(this).next('.route-map-tooltip-annotation').hide();
		}
	);

	// エリアマップ：ホバー連動
	$('#js-area-map-svg a').hover(
		function () {
			let index = $('#js-area-map-svg a').index(this);
			$(".area-map-hover-wrap .area-map-hover").eq(index).addClass('is-hover');
			$(this).addClass('is-hover');
		},
		function () {
			$(".area-map-hover").removeClass('is-hover');
			$(this).removeClass('is-hover');
		}
	);

	// 郵便番号検索
	$('.zip-button').click(function () {
		AjaxZip3.zip2addr('zip', '', 'pref', 'address');
	});

	// プライバシーポリシー同意チェックボックス
	$('.js-mw-checkbox .mwform-checkbox-field-text').html(
		'<a href="/" target="_blank" rel="noopener noreferrer" class="contact-privacy-policy-link">プライバシーポリシー</a>に同意する'
	);

	// サイドバー開閉（SP）
	$('.section-nav-open').click(function () {
		if (window.matchMedia('(min-width: 768px)').matches) return;
		$(this).toggleClass('is-active');
		$(this).next('.area-sidebar-wrap').slideToggle();
	});

	// アンカースクロール（ヘッダー高さ考慮）
	function scrollToTarget(speed) {
		const $anchors           = $('a[href^="#"]:not(a[href^="#modal"])');
		const headerHeight       = $('#js-header').height();
		const headerWrapperHeight = $('#js-header-wrapper').height();
		let translateYNumber     = 0;
		const transformValue     = $('.global-nav').css('transform');
		if (transformValue !== 'none') {
			translateYNumber = parseInt(transformValue.match(/matrix.*\,\s*(-?\d+)/)[1]);
		}
		const apparentHeight = headerWrapperHeight - (-translateYNumber);

		$anchors.on('click', function (event) {
			event.preventDefault();
			const href = $(this).attr('href');

			if (href === '#') {
				$('body,html').animate({ scrollTop: 0 }, speed, 'swing');
			} else {
				const $target     = $(href);
				const targetOffset = $target.offset().top;
				let position       = targetOffset;

				if (window.innerWidth > 1100 && $(window).scrollTop() > targetOffset) {
					position = targetOffset - apparentHeight;
				} else if (window.innerWidth > 767 && window.innerWidth <= 1100 && $(window).scrollTop() > targetOffset) {
					position = targetOffset;
				} else {
					position = targetOffset - headerHeight;
				}

				$('body,html').animate({ scrollTop: position }, speed, 'swing', function () {
					if (href !== '#' && $target.length) {
						if (!$target.is(':focusable')) {
							$target.attr('tabindex', '-1');
						}
						$target.focus();
					}
				});
			}
		});
	}

	scrollToTarget(800);

	// ハッシュ付き URL でのヘッダー調整
	if (window.location.hash) {
		$('#js-header-wrapper').addClass('is-fixed').css('transition', 'none');
		setTimeout(function () {
			$('#js-header-wrapper').css('transition', '');
		}, 100);
	}

	// エリア紹介：スクロール連動カレント表示
	$(window).scroll(function () {
		let area                 = $(".area-heading");
		let areaNumber           = area.length;
		let areaMap              = $("#js-area-anchor-map");
		let areaNav              = $("#js-area-anchor-nav");
		let areaMainContentsItem = $(".area-main-contents-item");
		let triggerHeight        = 300;
		for (var i = 0; i < areaNumber; i++) {
			areaMap.find("path").eq(i).removeClass("is-current");
			let areaOffsetTop        = area.eq(i).offset().top;
			let areaHeight           = areaMainContentsItem.eq(i).outerHeight();
			let areaBottom           = areaOffsetTop + areaHeight;
			let isInGuidebookContents = area[i].closest(".guidebook-contents");
			if (areaOffsetTop < $(window).scrollTop() + triggerHeight && areaBottom > $(window).scrollTop() + triggerHeight && !isInGuidebookContents) {
				areaMap.find("path").eq(i).addClass("is-current");
				areaNav.find("li").eq(i).addClass("is-current");
			} else {
				areaMap.find("path").eq(i).removeClass("is-current");
				if (!isInGuidebookContents) {
					areaNav.find("li").eq(i).removeClass("is-current");
				}
			}
		}
	});

	// 移住相談フォーム：ラジオボタンテキスト挿入
	$(".mwform-radio-field-text:contains('埼玉県に相談予約')").append(
		'<span class="mwform-radio-field-text-sub">｢住むなら埼玉｣ 移住サポートセンター</span>'
	);

	// ページトップボタン
	let pageTopArrow = $('#js-page-top');
	pageTopArrow.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			pageTopArrow.fadeIn();
		} else {
			pageTopArrow.fadeOut();
		}
	});
	pageTopArrow.click(function () {
		$('body, html').animate({ scrollTop: 0 }, 500);
		return false;
	});

	// 同意ボタン制御
	$('button[value=confirm]').prop("disabled", true);
	$('.contact-form-agree').change(function () {
		if (this.checked) {
			$('button[type=submit]').prop("disabled", false);
		} else {
			$('button[type=submit]').prop("disabled", true);
		}
	});

	// 相談希望日時：日付セレクトボックス生成
	const weekSet = ['日', '月', '火', '水', '木', '金', '土'];

	const holidays = [
		'2025-01-01', '2025-01-13', '2025-02-11', '2025-02-23', '2025-02-24',
		'2025-03-20', '2025-04-29', '2025-05-03', '2025-05-04', '2025-05-05',
		'2025-05-06', '2025-07-21', '2025-08-11', '2025-09-15', '2025-09-23',
		'2025-10-13', '2025-11-03', '2025-11-23', '2025-11-24',
	];

	const newYearHolidays = {
		default: ['2024-12-28', '2024-12-29', '2024-12-30', '2024-12-31', '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'],
		saitama: ['2024-12-29', '2024-12-30', '2024-12-31', '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05', '2025-01-06'],
		others:  ['2024-12-29', '2024-12-30', '2024-12-31', '2025-01-01', '2025-01-02', '2025-01-03'],
	};

	function formatDate(date) {
		const year  = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day   = ('0' + date.getDate()).slice(-2);
		const week  = weekSet[date.getDay()];
		return `${year}年${month}月${day}日(${week})`;
	}

	const selectBoxes = $('.js-date_create');

	const startDate  = new Date(Date.now() + 5 * 86400000);
	let currentDate  = startDate;
	for (let i = 0; i < 15; i++) {
		currentDate.setDate(currentDate.getDate() + 1);
		const valueFormat = currentDate.toISOString().slice(0, 10);
		const textFormat  = formatDate(currentDate);
		const option      = $('<option>', { text: textFormat, value: valueFormat });
		selectBoxes.append(option);
	}

	function updateForReserveButton() {
		selectBoxes.children('option').each(function () {
			const date      = new Date($(this).val());
			const dayOfWeek = date.getDay();
			if ($(this).val() === '埼玉県に相談予約' || dayOfWeek === 1 || dayOfWeek === 3 || holidays.includes($(this).val()) || newYearHolidays.saitama.includes($(this).val())) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	}

	function updateForCities(city) {
		selectBoxes.children('option').each(function () {
			const date      = new Date($(this).val());
			const dayOfWeek = date.getDay();
			if (
				(city === '長瀞町'              && (dayOfWeek === 0 || dayOfWeek === 6 || holidays.includes($(this).val()) || newYearHolidays.default.includes($(this).val()))) ||
				(city === '鳩山町 ※対面、電話のみ' && (holidays.includes($(this).val()) || newYearHolidays.others.includes($(this).val()))) ||
				(city === '小川町'              && (dayOfWeek === 1 || newYearHolidays.others.includes($(this).val()))) ||
				(city === '飯能市'              && (dayOfWeek === 0 || dayOfWeek === 6 || holidays.includes($(this).val()) || newYearHolidays.default.includes($(this).val()))) ||
				(city === '秩父市'              && newYearHolidays.others.includes($(this).val())) ||
				(city === '小鹿野町'            && newYearHolidays.default.includes($(this).val())) ||
				(city === '行田市'              && (dayOfWeek === 0 || dayOfWeek === 6 || holidays.includes($(this).val()) || newYearHolidays.default.includes($(this).val()))) ||
				(city === '北本市 ※対面、電話のみ' && (dayOfWeek === 0 || dayOfWeek === 6 || holidays.includes($(this).val()) || newYearHolidays.default.includes($(this).val()))) ||
				(city === '皆野町 ※対面、電話のみ' && (dayOfWeek === 0 || dayOfWeek === 6 || holidays.includes($(this).val()) || newYearHolidays.default.includes($(this).val())))
			) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});
	}

	$(document).ready(function () {
		const selectedCity = $('.cities').val();
		if (selectedCity) {
			updateForCities(selectedCity);
		} else {
			updateForReserveButton();
		}
	});

	$('.reserve-button').on('click', function () {
		updateForReserveButton();
	});

	$('.cities').on('click', function () {
		const city = $(this).val();
		updateForCities(city);
	});

	$(window).on('pageshow', function () {
		const selectedCity = $('.cities').val();
		if (selectedCity) {
			updateForCities(selectedCity);
		} else {
			updateForReserveButton();
		}
	});

	// 祝日の option に holiday クラスを付与
	selectBoxes.children('option').each(function () {
		if (holidays.includes($(this).val()) || newYearHolidays.default.includes($(this).val())) {
			$(this).addClass('holiday');
		}
	});

	// セレクト初期値
	$('.mw_wp_form_input select option[value=""]').html('選択してください。');

	// 日時テキスト取得（第一〜第三希望）
	$('.tmp-date-item01').on('change', function () {
		$('.date-item01-text').val($('.tmp-date-item01 option:selected').text());
	});
	$('.tmp-date-item02').on('change', function () {
		$('.date-item02-text').val($(this).val());
	});
	$('.tmp-date-item03').on('change', function () {
		$('.date-item03-text').val($('.tmp-date-item03 option:selected').text());
	});
	$('.tmp-date-item04').on('change', function () {
		$('.date-item04-text').val($(this).val());
	});
	$('.tmp-date-item05').on('change', function () {
		$('.date-item05-text').val($('.tmp-date-item05 option:selected').text());
	});
	$('.tmp-date-item06').on('change', function () {
		$('.date-item06-text').val($(this).val());
	});

	if (!$('input[name=date-item03]').val() && !$('input[name=date-item04]').val()) {
		$('.page-template-page-confirm').find('input[name=date-item03]').closest('.js-date-list02').remove();
	}
	if (!$('input[name=date-item05]').val() && !$('input[name=date-item06]').val()) {
		$('.page-template-page-confirm').find('input[name=date-item05]').closest('.js-date-list03').remove();
	}

	// アコーディオン（詳細）
	$(".detail-top-title").on('click', function () {
		$(this).next().slideToggle();
		$(this).toggleClass("arrow-open");
	});

	// 検索チェックボックス（SP のみ開閉）
	$(function () {
		$(window).on('load resize', function () {
			let w = $(window).width();
			let x = 767;
			if (w <= x) {
				$(".search-check-box-title").off('click');
				$(".search-check-box-title").on('click', function () {
					$(this).next().slideToggle();
					$(this).toggleClass("arrow-open");
				});
			} else {
				$(".search-check-box-title").off('click');
				$(".search-check-box-inner").show();
			}
		});
	});

	$(".uncheck-text").click(function () {
		$('.checkbox').prop('checked', false);
	});

	// 検索件数表示位置切り替え
	$(function () {
		$(window).on('load resize', function () {
			let w            = $(window).width();
			let x            = 767;
			let searchNumber = $(".search-results-number");
			if (w <= x) {
				searchNumber.insertBefore(".search-results-two-wrap");
			} else {
				searchNumber.insertBefore(".search-check-box");
			}
		});
	});

	$(".search-check-box-title").on('click', function () {
		$(this).next().slideToggle();
		$(this).toggleClass("arrow-open");
	});

	$(".requirement-01-list-title").on('click', function () {
		$(this).next().slideToggle();
		$(this).toggleClass("arrow-open");
	});

	if ($('.contact-form-address-wrap').is(":contains('都道府県')")) {
		$('.page-template-page-contact_confirm').find('.contact-form-address-wrap').closest('.contact-form-address-wrap').remove();
	}

	// ボディ上部マージン（固定ヘッダー分）
	function setBodyMarginTop(idName) {
		const baseElement  = $(`#${idName}`);
		const headerHeight = baseElement.outerHeight();
		const windowWidth  = $(window).width();
		let translateYNumber = 0;
		const transformValue = $('.global-nav').css('transform');
		if (transformValue !== 'none') {
			translateYNumber = parseInt(transformValue.match(/matrix.*\,\s*(-?\d+)/)[1]);
		}
		if (windowWidth >= 1100) {
			const marginTop = headerHeight - (-translateYNumber);
			$('.is-desktop').css('margin-top', marginTop);
		} else {
			$('.is-desktop').css('margin-top', '');
		}
	}

	setBodyMarginTop('js-header-wrapper');

	$(window).on('resize', function () {
		setBodyMarginTop('js-header-wrapper');
	});

	// フォームエラー時背景色変更
	function handleBackgroundErrors() {
		let errorElement              = $(".input-error .error");
		let bgErrorElements           = $(".js-bg-error");
		let bgErrorElementTargetValue = $(".mw_wp_form_input option:selected").val();
		let bgErrorElementTarget      = $('.mw_wp_form_input select option[value=""]');

		if (errorElement.length > 0) {
			bgErrorElements.each(function () {
				let $this = $(this);
				if ($this.val() === "") {
					$this.css("background-color", "#FF9A9A");
				}
			});
			if (bgErrorElementTargetValue === "") {
				bgErrorElementTarget.parent().css({ cssText: "background-color: #FF9A9A!important;" });
			}
		}

		bgErrorElements.each(function () {
			let $this = $(this);
			$this.on("change keyup paste", function () {
				if ($this.val() !== "") {
					$this.removeAttr("style");
				}
			});
		});
	}

	handleBackgroundErrors();

	// 確認画面：埼玉県選択時に市町村選択を削除
	if ($('.page-template-page-confirm input[name="reserve"]').val() === '埼玉県に相談予約') {
		$('.js-target-element').remove();
	}

	// 相談フォーム：ラジオ選択で市町村セレクト表示制御
	$(document).ready(function () {
		var selectBox    = $('select[name="cities01"]');
		var initialValue = selectBox.val();
		selectBox.data('initialValue', initialValue);

		$('input[name="reserve"]').click(function () {
			if ($(this).val() === "埼玉県に相談予約") {
				$('#target-element').hide();
				selectBox.val('');
			} else {
				$('#target-element').show();
				selectBox.val(selectBox.data('initialValue'));
			}
		});

		$('.contact-form-back').click(function () {
			if ($('input[name="reserve"]:checked').val() === "埼玉県に相談予約") {
				selectBox.val('');
			}
		});
	});

	$(document).ready(function () {
		if ($('input[name="reserve"]:checked').val() === '埼玉県に相談予約') {
			$('.js-target-element').hide();
		}
		$('input[name="reserve"]').change(function () {
			if ($(this).val() === '市町村に相談予約') {
				$('.form-wrap .js-target-element').show();
			} else {
				$('.form-wrap .js-target-element').hide();
			}
		});
	});

}); // end jQuery()


// ============================================================
// ソート：支援金ページ
// ============================================================
const sortSupportBtn = document.getElementById('sort-support-btn');
if (sortSupportBtn) {
	sortSupportBtn.addEventListener('click', function (event) {
		event.preventDefault();
		const form      = document.querySelector('.form-comparative-search');
		form.action     = window.location.href;
		const sortInput = document.createElement('input');
		sortInput.type  = 'hidden';
		sortInput.name  = 'sort';
		sortInput.value = 'support';
		form.appendChild(sortInput);
		form.submit();
	});
}

// ============================================================
// チェックボックスと SVG エリアマップの連動
// ============================================================
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
	checkbox.addEventListener('change', function () {
		const area        = this.value;
		const isChecked   = this.checked;
		const areaItem    = document.getElementById(`map-${area}`);
		const areaMapName = document.getElementById(`js-name-${area}`);
		if (!areaItem || !areaMapName) return;
		areaItem.classList.toggle('checked', isChecked);
		areaMapName.classList.toggle('checked', isChecked);
	});
});

// ============================================================
// DOMContentLoaded 処理
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

	// 施設リスト：対応エリアの SVG にクラスを付与
	const facilitiesItems = document.querySelectorAll('.list-facilities-item');
	if (facilitiesItems.length > 0) {
		facilitiesItems.forEach(item => {
			const area    = item.getAttribute('data-area');
			const svgLink = area ? document.getElementById(`map-${area}`) : null;
			if (svgLink) svgLink.classList.add('checked');
		});
	}

	// チェックボックスの初期状態を SVG に反映
	document.querySelectorAll('input[name="available_area[]"]').forEach(checkbox => {
		if (checkbox.checked) {
			const area        = checkbox.value;
			const areaItem    = document.getElementById(`map-${area}`);
			const areaMapName = document.getElementById(`js-name-${area}`);
			if (areaItem)    areaItem.classList.add('checked');
			if (areaMapName) areaMapName.classList.add('checked');
		}
	});

	// アコーディオン（PC 初期展開）
	document.querySelectorAll('.accordion-arrow--pc').forEach(function (accordion) {
		if (window.innerWidth >= 768) {
			const content = accordion.nextElementSibling;
			if (content && content.classList.contains('accordion-content')) {
				content.style.display = "block";
			}
		}
	});

	document.querySelectorAll('.accordion-arrow').forEach(function (accordion) {
		accordion.addEventListener('click', function () {
			this.classList.toggle('accordion-open');
			const content = this.nextElementSibling;
			content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
		});
	});

	// TOPスライド→動画ページ遷移後に YouTube を自動オープン（6個目）
	const triggerLinks = document.querySelectorAll('.js-trigger-modal');
	triggerLinks.forEach(link => {
		link.addEventListener('click', function () {
			localStorage.setItem('triggerModalClick', 'true');
		});
	});

	if (localStorage.getItem('triggerModalClick') === 'true') {
		const modalTriggers = document.querySelectorAll('.js-modal-movie');
		if (modalTriggers.length >= 6) {
			const sixthModalTrigger = modalTriggers[5];
			jQuery(sixthModalTrigger).modaal({
				type: 'video',
				background: '#F8F7F0',
				after_open: function () {
					jQuery(".modaal-close").appendTo(".modaal-video-wrap");
				}
			});
			sixthModalTrigger.click();
		}
		localStorage.removeItem('triggerModalClick');
	}

	// Modaal 再設定（DOMContentLoaded 版）
	jQuery('.inline').modaal({ background: '#F8F7F0' });

	jQuery('.js-modal-movie').modaal({
		type: 'video',
		background: '#F8F7F0',
		after_open: function () {
			jQuery(".modaal-close").appendTo(".modaal-video-wrap");
		}
	});

	jQuery('.js-modal-inline').modaal({
		type: 'inline',
		background: '#F8F7F0',
		after_open: function () {
			jQuery(".modaal-close").appendTo(".modaal-content");
		},
		before_close: function () {
			jQuery('.modaal-content video').each(function () {
				this.pause();
				this.currentTime = 0;
			});
		}
	});

});
