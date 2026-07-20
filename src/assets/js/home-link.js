const homeLink = document.querySelector(".js-home-link");
const hero = document.querySelector("main > section:first-child");

if (homeLink && hero) {
  const setHomeLinkVisible = (visible) => {
    homeLink.hidden = !visible;
  };

  setHomeLinkVisible(false);
  new IntersectionObserver(([entry]) => {
    setHomeLinkVisible(!entry.isIntersecting);
  }).observe(hero);
}
