(() => {
    const buttons = [...document.querySelectorAll("[data-filter]")];
    const yearSelect = document.querySelector("#publication-year");
    const papers = [...document.querySelectorAll(".paper-entry[data-category]")];
    const count = document.querySelector("#publication-count");

    if (!buttons.length || !yearSelect || !papers.length || !count) return;

    let activeCategory = "all";

    const updatePublications = () => {
        const activeYear = yearSelect.value;
        let visible = 0;

        papers.forEach((paper) => {
            const matchesCategory = activeCategory === "all" || paper.dataset.category === activeCategory;
            const matchesYear = activeYear === "all" || paper.dataset.year === activeYear;
            const show = matchesCategory && matchesYear;
            paper.hidden = !show;
            if (show) visible += 1;
        });

        count.textContent = `${visible} publication${visible === 1 ? "" : "s"}`;
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.filter;
            buttons.forEach((item) => {
                const selected = item === button;
                item.classList.toggle("is-active", selected);
                item.setAttribute("aria-pressed", String(selected));
            });
            updatePublications();
        });
    });

    yearSelect.addEventListener("change", updatePublications);
})();
