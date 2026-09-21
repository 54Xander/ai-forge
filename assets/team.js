(() => {
  "use strict";

  // Preserve section links from the former single-page team.html demo.
  const legacyPages = { about: "index.html", research: "research.html", outputs: "outputs.html", contact: "contact.html" };
  const legacyPage = legacyPages[location.hash.slice(1)];
  if (location.pathname.endsWith("/team.html") && legacyPage) {
    const target = new URL(legacyPage, location.href);
    target.search = location.search;
    location.replace(target.href);
    return;
  }

  const { members, outputs } = window.TEAM_DATA;
  const typeLabels = { publication: "Publication", platform: "Platform", software: "Software", community: "Community" };
  const levelLabels = { phd: "Doctoral", masters: "Master's", undergrad: "Undergraduate" };

  const select = (selector) => document.querySelector(selector);
  const outputList = select("#output-list");
  const highlightCarousel = select("#highlight-carousel");
  const memberGrids = document.querySelectorAll(".member-grid[data-member-level]");
  const menuToggle = select(".menu-toggle");
  const siteHeader = select(".site-header");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function initializeHighlights() {
    const slides = [...highlightCarousel.querySelectorAll(".highlight-card")];
    if (!slides.length) return;
    const controls = highlightCarousel.querySelector(".highlight-controls");
    const dots = highlightCarousel.querySelector(".highlight-dots");
    const status = highlightCarousel.querySelector(".highlight-status");
    let current = 0;
    const dotButtons = slides.map((slide, index) => {
      const title = slide.querySelector("h3").textContent;
      slide.id = `highlight-slide-${index + 1}`;
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${slides.length}: ${title}`);
      const button = element("button", "highlight-dot");
      button.type = "button";
      button.setAttribute("aria-label", `Show image ${index + 1}: ${title}`);
      button.setAttribute("aria-controls", slide.id);
      button.addEventListener("click", () => showSlide(index));
      return button;
    });

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => {
        slide.hidden = position !== current;
        dotButtons[position].setAttribute("aria-pressed", String(position === current));
      });
      status.textContent = `Image ${current + 1} of ${slides.length}: ${slides[current].querySelector("h3").textContent}`;
    }

    dots.replaceChildren(...dotButtons);
    highlightCarousel.querySelector(".highlight-previous").addEventListener("click", () => showSlide(current - 1));
    highlightCarousel.querySelector(".highlight-next").addEventListener("click", () => showSlide(current + 1));
    highlightCarousel.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      showSlide(current + (event.key === "ArrowRight" ? 1 : -1));
    });
    showSlide(0);
    controls.hidden = slides.length < 2;
  }

  function taggedList(tags) {
    const node = element("div", "member-tags");
    tags.forEach((tag) => node.append(element("span", "", tag)));
    return node;
  }

  function metadata(entries) {
    const list = element("dl", "member-meta");
    entries.forEach(([label, value]) => {
      const entry = element("div");
      const details = element("dd");
      details.append(value);
      entry.append(element("dt", "", label), details);
      list.append(entry);
    });
    return list;
  }

  function outputYear(output) {
    const year = Number(output.year);
    return Number.isInteger(year) && year >= 1000 && year <= 9999 ? year : null;
  }

  function appendReferenceLink(container, label, url, title) {
    if (!/^https?:\/\//i.test(url || "")) return;
    const link = element("a", "", label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${label}: ${title} (opens a new tab)`);
    container.append(link);
  }

  function outputCard(output) {
    const item = element("article", "card output-item");
    item.dataset.outputId = output.id;
    item.dataset.outputType = output.type;
    const meta = element("div", "output-meta");
    meta.append(element("span", "type-label", typeLabels[output.type]));
    if (output.sample) meta.append(element("span", "sample-badge", "Sample"));
    item.append(meta, element("h3", "output-title", output.title));
    if (output.authors?.length) item.append(element("p", "output-authors", output.authors.join(", ")));
    else if (output.type === "publication") item.append(element("p", "output-authors reference-pending", "Authors to be added"));
    const citation = element("p", "output-publication");
    if (output.venue) citation.append(element("em", "", output.venue), ". ");
    else if (output.type === "publication") citation.append("Publication details to be added. ");
    let publication = String(outputYear(output) || "n.d.");
    if (output.volume) publication += `;${output.volume}`;
    if (output.issue) publication += `(${output.issue})`;
    if (output.pages) publication += `:${output.pages}`;
    citation.append(publication.endsWith(".") ? publication : `${publication}.`);

    const links = element("div", "reference-links");
    const doi = (output.doi || "").trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
    if (doi) appendReferenceLink(links, `DOI: ${doi}`, `https://doi.org/${doi}`, output.title);
    else if (output.type === "publication") links.append(element("span", "reference-pending", "DOI to be added"));
    appendReferenceLink(links, output.type === "publication" ? "Full text" : "Project website", output.url, output.title);
    item.append(citation);
    if (links.childElementCount) item.append(links);
    return item;
  }

  function memberCard(member) {
    const card = element("article", "member-card");
    card.dataset.memberId = member.id;
    const avatar = element("div", `member-avatar ${member.level}`);
    avatar.setAttribute("aria-hidden", "true");
    avatar.append(
      element("span", "member-initials", member.initials),
      element("span", "member-degree", levelLabels[member.level]),
      element("span", "member-avatar-caption", member.placeholder ? "PROFILE TO BE ADDED" : "AI FORGE / PEOPLE")
    );
    if (member.photo) {
      const photo = element("img", "member-photo");
      photo.alt = "";
      photo.loading = "lazy";
      photo.addEventListener("error", () => photo.remove(), { once: true });
      photo.src = member.photo;
      avatar.append(photo);
    }
    const body = element("div", "member-info");
   body.append(element("h3", "", member.name), element("p", "member-role", member.teamRole));
    if (member.placeholder) body.append(element("span", "pending-badge", "To be added"));
    if (member.description) body.append(element("p", "member-description", member.description));
    const focusTags = member.tags?.length ? member.tags : [member.focus || "To be added"];
    body.append(metadata([
      ["Education", member.education || "To be added"],
      [member.placeholder ? "Example focus" : "Research focus", taggedList(focusTags)]
    ]));
    card.append(avatar, body);
    return card;
  }

  function renderOutputs() {
    const sorted = [...outputs].sort((a, b) => (outputYear(b) || 0) - (outputYear(a) || 0));
    const groups = new Map();
    sorted.forEach((output) => {
      const year = outputYear(output);
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(output);
    });
    outputList.replaceChildren();
    groups.forEach((records, year) => {
      const section = element("section", "work-year-group");
      const heading = element("h2", "work-year-title", year === null ? "Year to be added" : String(year));
      heading.id = `work-year-${year || "pending"}`;
      section.setAttribute("aria-labelledby", heading.id);
      const entries = element("div", "work-year-entries");
      entries.append(...records.map(outputCard));
      section.append(heading, entries);
      outputList.append(section);
    });
  }

  function renderMembers() {
    memberGrids.forEach((grid) => {
      const groupMembers = members.filter((member) => member.level === grid.dataset.memberLevel);
      grid.replaceChildren(...groupMembers.map(memberCard));
    });
  }

  function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteHeader.removeAttribute("data-menu-open");
  }
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    siteHeader.toggleAttribute("data-menu-open", open);
  });
  select(".nav-links").addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      const wasOpen = menuToggle.getAttribute("aria-expanded") === "true";
      closeMenu();
      if (wasOpen) menuToggle.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });

  const memberCounts = {};
  Object.keys(levelLabels).forEach((level) => {
    memberCounts[level] = members.filter((member) => member.level === level).length;
  });
  const compositionNote = select("#composition-note");
  if (compositionNote) {
    compositionNote.textContent = `Team layout: ${memberCounts.phd} doctoral, ${memberCounts.masters} master's, and ${memberCounts.undergrad} undergraduate places. Unconfirmed profiles and illustrative focus areas are marked “To be added”.`;
  }
  select("#copyright-year").textContent = new Date().getFullYear();
  if (outputList) renderOutputs();
  if (memberGrids.length) renderMembers();
  if (highlightCarousel) initializeHighlights();
  document.body.classList.add("is-ready");
})();
