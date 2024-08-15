//import "./styles.css"

// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

const mainEl = document.querySelector("main")
mainEl.style.backgroundColor = "var(--main-bg)"
mainEl.innerHTML = "<h1>DOM Manipulation</h1>"
mainEl.classList.add("flex-ctr")

const topMenuEl = document.getElementById("top-menu")
topMenuEl.style.height = "100%"
topMenuEl.style.backgroundColor = "var(--top-menu-bg)"
topMenuEl.classList.add("flex-around")

menuLinks.forEach(item => {
    let link = document.createElement("a")
    link.href = item.href
    link.textContent = item.text
    topMenuEl.appendChild(link)
}); 

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)"
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

const topMenuLinks = document.querySelectorAll("a")
topMenuEl.addEventListener('click', (e) => {
  e.preventDefault();
  clickedLink = e.target;
  //checks if clicked object is a link ("a")
  if (!clickedLink.matches("a")) {
    // does nothing if it is not a link
    return
  } else {
      //remove active state for non-clicked links
      topMenuLinks.forEach(link => {
        if (link !== clickedLink) {
          link.classList.remove("active")
        }
      });
      if (clickedLink.classList.contains("active")) {
        subMenuEl.style.top = "0%"
      } else {
        for (link of menuLinks) {
          if (link.text == clickedLink.innerText.toLowerCase()) {
                if (link.subLinks) {
                  subMenuEl.style.top = "100%"
                  buildSubmenu(link)
                } else {
                  subMenuEl.style.top = "0%"
                  displayPage(link)
                  console.log(link)
                }
              }
        }
      }
      // toggles state of clicked link
      clickedLink.classList.toggle("active");
  }   
})

function buildSubmenu(link) {
  subMenuEl.innerHTML = '';
  for (subLink in link.subLinks) {
    const subLinkEl = document.createElement("a");
    subLinkEl.href = link.subLinks[subLink].href
    subLinkEl.textContent = link.subLinks[subLink].text
    subMenuEl.appendChild(subLinkEl)
  }
}

subMenuEl.addEventListener('click', (e) => {
  e.preventDefault();
  clickedLink = e.target;
  //checks if clicked object is a link ("a")
  if (!clickedLink.matches("a")) {
    // does nothing if it is not a link
    return
  } else {
    subMenuEl.style.top = "0"
    //remove active state for non-clicked links
    topMenuLinks.forEach(link => {
        link.classList.remove("active")
    });
    displayPage(clickedLink);
  }
});

function displayPage(link) {
  const pageText = document.createElement("h1")
  linkText = link.text.split(" ");
  for (word in linkText) {
    linkText[word] = linkText[word][0].toUpperCase() + linkText[word].substring(1);
  }
  pageText.innerHTML = linkText.join(" ")
  mainEl.innerHTML = ''
  mainEl.append(pageText);
}