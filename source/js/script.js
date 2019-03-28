var popupNavigationToggle = document.querySelector(".header__nav-toggle");
var popupNavigation = document.querySelector(".header__nav");

popupNavigationToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  popupNavigation.classList.toggle("header__nav--closed");
  popupNavigation.classList.toggle("header__nav--opened");
});
