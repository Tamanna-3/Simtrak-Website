(() => {
  "use strict";
  const search = document.querySelector("#career-search");
  const department = document.querySelector("#career-department");
  const mode = document.querySelector("#career-mode");
  const clear = document.querySelector("#career-clear");
  const submit = document.querySelector("#career-filter");
  const jobs = [...document.querySelectorAll(".career-job")];
  const count = document.querySelector("#career-count");
  const empty = document.querySelector("#career-empty");
  const filterJobs = () => {
    const term = search.value.trim().toLowerCase();
    const dept = department.value;
    const workMode = mode.value;
    let visible = 0;
    jobs.forEach(job => {
      const departmentMap = { business:"marketing", marketing:"marketing", design:"creative", management:"operations", hr:"people" };
      const normalizedDepartment = departmentMap[job.dataset.department] || job.dataset.department;
      const matches = (!term || job.textContent.toLowerCase().includes(term)) && (dept === "all" || normalizedDepartment === dept) && (workMode === "all" || job.dataset.mode === workMode);
      job.hidden = !matches;
      if (matches) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? "role" : "roles"} available`;
    empty.hidden = visible !== 0;
  };
  submit?.addEventListener("click", filterJobs);
  search.addEventListener("keydown", event => { if (event.key === "Enter") filterJobs(); });
  clear.addEventListener("click", () => { search.value = ""; department.value = "all"; mode.value = "all"; filterJobs(); search.focus(); });
  jobs.forEach(job => {
    const button = job.querySelector(".career-view");
    if (button.tagName === "A") return;
    button.addEventListener("click", () => {
      const open = job.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
      button.firstChild.textContent = open ? "Close role " : "View role ";
    });
    const apply = job.querySelector('.career-job-details a');
    if (apply) {
      apply.href = 'https://docs.google.com/forms/d/1kBnEpLv2b-nOMh9k_-PNIQaXnUQmE8ydAgq4OlA5EJE/viewform';
      apply.target = '_blank';
      apply.rel = 'noopener noreferrer';
    }
  });
})();
