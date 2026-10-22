const NAV = [
  { href: "index.html", label: "Home", id: "home" },
  { href: "about.html", label: "About", id: "about" },
  { href: "news.html", label: "News", id: "news" },
  { href: "reports.html", label: "Research Reports", id: "reports" },
  { href: "data.html", label: "Data", id: "data" },
  { href: "publications.html", label: "Publications", id: "publications" },
  { href: "contact.html", label: "Contact Us", id: "contact" }
];

const SIDEBARS = {
  about: {
    title: "About",
    items: [
      { href: "about.html", label: "About the Project" },
      { href: "team.html", label: "Research Team" },
      { href: "sample.html", label: "Sample" }
    ]
  },
  news: {
    title: "News",
    items: [{ href: "news.html", label: "All News" }]
  },
  reports: {
    title: "Research Reports",
    items: [{ href: "reports.html", label: "Reports" }]
  },
  data: {
    title: "Data",
    items: [
      { href: "data.html", label: "Data Documentation" },
      { href: "data-download.html", label: "Data Download" }
    ]
  },
  publications: {
    title: "Publications",
    items: [
      { href: "publications.html", label: "Chinese Papers" },
      { href: "publications-en.html", label: "English Papers" }
    ]
  },
  contact: {
    title: "Contact Us",
    items: [
      { href: "contact.html", label: "Contact Address" },
      { href: "contact.html#access", label: "Request Access" }
    ]
  }
};

const NEWS = [
  {
    id: "n1",
    date: "2026-09-15",
    title: "August 2026 wave released",
    body: "The August 2026 microdata and codebook are now available to registered users. This wave includes the core expectation modules on inflation, income, and housing, together with updated sampling weights."
  },
  {
    id: "n2",
    date: "2026-08-20",
    title: "User workshop on expectation measures",
    body: "The project team will host a workshop on constructing inflation-expectation series from CSHE and on linking monthly files into a household panel. Registration details will be posted here."
  },
  {
    id: "n3",
    date: "2026-07-26",
    title: "Questionnaire dictionary updated",
    body: "Variable labels for open-ended expectation items and randomized information treatments have been aligned with the current dictionary. Raw export fields are unchanged; only documentation has been revised."
  },
  {
    id: "n4",
    date: "2026-06-28",
    title: "Note on randomized-block exports",
    body: "From June 2026, randomized information blocks are exported as compact group markers. Users comparing earlier months should follow the crosswalk in the codebook rather than matching raw column titles."
  },
  {
    id: "n5",
    date: "2026-05-28",
    title: "Monthly production workflow posted",
    body: "A short note describes how each monthly export is checked against the dictionary, cleaned, and appended to the CSHE panel file. See Research Reports for the full write-up."
  },
  {
    id: "n6",
    date: "2026-03-12",
    title: "Call for papers using CSHE",
    body: "Researchers using CSHE data are invited to send published or forthcoming papers for listing under Publications. Please include the citation and the waves used."
  }
];

function headerHTML(active) {
  const nav = NAV.map((item) => {
    const cls = item.id === active ? "active" : "";
    return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
  }).join("");

  return `
    <header>
      <div class="topbar">
        <a class="brand" href="index.html">
          <img src="assets/logo.svg" alt="CSHE">
          <div class="brand-text">
            <h1>China Survey of Household Expectations</h1>
            <p>中国家庭预期调查</p>
          </div>
        </a>
      </div>
      <nav class="nav">${nav}</nav>
    </header>`;
}

function footerHTML() {
  return `
    <div class="partners"></div>
    <footer class="footer">
      <img src="assets/logo.svg" alt="">
      <div>China Survey of Household Expectations</div>
    </footer>`;
}

function crumbHTML(items) {
  const parts = items.map((item, i) => {
    if (item.href && i < items.length - 1) {
      return `<a href="${item.href}">${item.label}</a>`;
    }
    return item.label;
  });
  return `Location: ${parts.join(" > ")}`;
}

function sidebarHTML(key, activeHref) {
  const sb = SIDEBARS[key];
  if (!sb) return "";
  const links = sb.items.map((item) => {
    const cls = item.href === activeHref ? "active" : "";
    return `<a class="${cls}" href="${item.href}">${item.label}</a>`;
  }).join("");
  return `<h4>${sb.title}</h4>${links}`;
}

function newsListHTML() {
  return NEWS.map(
    (n) => `<li><a href="news.html#${n.id}">[${n.date}] ${n.title}</a></li>`
  ).join("");
}

function newsArticlesHTML() {
  return NEWS.map(
    (n) => `<article id="${n.id}">
      <h3>${n.title}</h3>
      <p class="news-date">${n.date}</p>
      <p>${n.body}</p>
    </article>`
  ).join("");
}

function mount() {
  const page = document.body.dataset.page || "home";
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const crumb = document.getElementById("crumb");
  const sidebar = document.getElementById("sidebar");

  if (header) header.innerHTML = headerHTML(page);
  if (footer) footer.innerHTML = footerHTML();
  if (crumb) {
    const raw = document.body.dataset.crumb || "";
    const items = raw.split("|").map((part) => {
      const [label, href] = part.split("@");
      return { label, href };
    });
    crumb.innerHTML = crumbHTML(items);
  }
  if (sidebar) {
    let active = document.body.dataset.sidebarActive;
    if (page === "contact" && location.hash === "#access") {
      active = "contact.html#access";
    }
    sidebar.innerHTML = sidebarHTML(
      document.body.dataset.sidebar,
      active
    );
  }

  const newsHome = document.getElementById("news-home");
  if (newsHome) newsHome.innerHTML = newsListHTML();

  const newsPage = document.getElementById("news-page");
  if (newsPage) newsPage.innerHTML = newsArticlesHTML();

  const form = document.getElementById("access-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

window.addEventListener("hashchange", () => {
  if (document.body.dataset.page !== "contact") return;
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  const active = location.hash === "#access" ? "contact.html#access" : "contact.html";
  sidebar.innerHTML = sidebarHTML("contact", active);
});

document.addEventListener("DOMContentLoaded", mount);
