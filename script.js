// 모달 관련 기능
function openModal(imageElement) {
  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('modalImg');
  const captionText = document.getElementById('caption');

  modal.style.display = "block";
  setTimeout(() => modal.classList.add('show'), 10); // 애니메이션 적용
  modalImg.src = imageElement.src.replace('_thumbnail', ''); // 원본 이미지 경로로 대체
  captionText.innerHTML = imageElement.alt; // 이미지 설명을 캡션에 표시

  // 슬라이더 화살표 숨기기
  toggleSliderButtons(false);

  // 모달 외부 클릭 시 닫기
  modal.onclick = function(event) {
      if (event.target === modal) {
          closeModal();
      }
  };
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.classList.remove('show');
  setTimeout(() => {
      modal.style.display = "none";
  }, 300); // 애니메이션 시간과 동일하게 설정 (0.3s)

  // 슬라이더 화살표 다시 표시
  toggleSliderButtons(true);
}

// 슬라이더 버튼 표시/숨기기
function toggleSliderButtons(show) {
  const display = show ? 'block' : 'none';
  document.querySelectorAll('.prev, .next').forEach(button => {
      button.style.display = display;
  });
}

// 슬라이더 이동 관련 기능
const currentSlides = {};

function moveSlides(n, sliderId) {
  if (!currentSlides[sliderId]) currentSlides[sliderId] = 0; // 초기화
  const slider = document.getElementById(sliderId);
  const slides = slider.querySelector('.slides');
  const totalSlides = slides.children.length;

  // 현재 슬라이드 업데이트
  currentSlides[sliderId] = (currentSlides[sliderId] + n + totalSlides) % totalSlides;

  // 슬라이드 이동
  const slideWidth = slides.children[0].clientWidth;
  slides.style.transform = `translateX(${-currentSlides[sliderId] * slideWidth}px)`;
}

// jQuery를 활용한 빠른 메뉴 플러그인
(function ($) {
  $.fn.quickMenu = function () {
      return this.each(function () {
          const $wrap = $(this);
          const $menu = $wrap.find(".menu");
          const $btn = $menu.children("li").children("a");
          const $btnScrollTop = $wrap.find(".btn-scroll-top");
          const $section = $(".section");
          const wrapH = $wrap.outerHeight();
          let nowScroll = 0;
          let scrolling = true;

          function btnActive(num) {
              $btn.not($btn.eq(num)).removeClass("on");
              $btn.eq(num).addClass("on");
          }

          function moveScroll(num) {
              if (scrolling) {
                  scrolling = false;
                  $("html, body").animate({ scrollTop: num }, function () {
                      scrolling = true;
                  });
              }
          }

          btnActive(0);
          $wrap.css({ "margin-top": -(wrapH / 2) });

          $btn.on("click", function (e) {
              e.preventDefault();
              const idx = $(this).parent().index();
              const conT = $section.eq(idx).offset().top;
              moveScroll(conT);
          });

          $btnScrollTop.on("click", function (e) {
              e.preventDefault();
              moveScroll(0);
          });

          $(window).scroll(function () {
              nowScroll = $(this).scrollTop();
              $section.each(function (idx) {
                  if (nowScroll >= $(this).offset().top) {
                      btnActive(idx);
                  }
              });
          });
      });
  };
})(jQuery);

$(function () {
  $(".box-shortcut").quickMenu();
});

