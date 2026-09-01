(() => {
  "use strict";

  const form = document.querySelector("#enquiry-form");
  const status = document.querySelector("#form-status");
  if (!form) return;

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    phone: form.querySelector("#phone"),
    company: form.querySelector("#company"),
    message: form.querySelector("#message")
  };
  const serviceInputs = [...form.querySelectorAll('input[name="services"]')];
  const serviceField = form.querySelector("#service-field");
  const serviceError = form.querySelector("#service-error");
  const serviceSummary = form.querySelector("#service-summary");

  const messages = {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    phone: "Please enter a valid phone number.",
    company: "Please enter your company name.",
    message: "Please share a little more about your requirement."
  };

  const isValid = (key, value) => {
    const clean = value.trim();
    if (key === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    if (key === "phone") return clean.replace(/\D/g, "").length >= 7 && clean.replace(/\D/g, "").length <= 15;
    if (key === "message") return clean.length >= 10;
    return clean.length >= 2;
  };

  const getSelectedServices = () => serviceInputs.filter((input) => input.checked).map((input) => input.value);

  const updateServiceSummary = () => {
    if (!serviceSummary) return;
    const selected = getSelectedServices();
    serviceSummary.textContent = selected.length === 0
      ? "Choose services"
      : selected.length === 1
        ? selected[0]
        : `${selected.length} services selected`;
  };

  const setServiceState = (showError) => {
    serviceField?.classList.toggle("has-error", showError);
    serviceInputs.forEach((input) => input.setAttribute("aria-invalid", String(showError)));
    if (serviceError) serviceError.textContent = showError ? "Please choose at least one service." : "";
  };

  const setFieldState = (key, showError) => {
    const input = fields[key];
    const wrapper = input.closest(".field");
    const error = wrapper.querySelector(".field-error");
    wrapper.classList.toggle("has-error", showError);
    input.setAttribute("aria-invalid", String(showError));
    error.textContent = showError ? messages[key] : "";
  };

  Object.entries(fields).forEach(([key, input]) => {
    input.addEventListener("blur", () => {
      setFieldState(key, !isValid(key, input.value));
    });

    input.addEventListener("input", () => {
      if (isValid(key, input.value)) setFieldState(key, false);
    });
  });

  serviceInputs.forEach((input) => {
    input.addEventListener("change", () => {
      updateServiceSummary();
      if (getSelectedServices().length) setServiceState(false);
    });
  });

  updateServiceSummary();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    let firstInvalid = null;

    Object.entries(fields).forEach(([key, input]) => {
      const failed = !isValid(key, input.value);
      setFieldState(key, failed);
      if (failed && !firstInvalid) firstInvalid = input;
      if (failed) valid = false;
    });

    const servicesFailed = getSelectedServices().length === 0;
    setServiceState(servicesFailed);
    if (servicesFailed && !firstInvalid) firstInvalid = serviceInputs[0];
    if (servicesFailed) valid = false;

    if (!valid) {
      if (status) status.textContent = "Please review the highlighted fields.";
      firstInvalid?.focus();
      return;
    }

    const enquiry = [
      "Hello Simtrak Solutions,",
      "",
      "I would like to discuss a business service.",
      `Name: ${fields.name.value.trim()}`,
      `Email: ${fields.email.value.trim()}`,
      `Phone: ${fields.phone.value.trim()}`,
      `Company: ${fields.company.value.trim()}`,
      `Services: ${getSelectedServices().join(", ")}`,
      `Message: ${fields.message.value.trim()}`
    ].join("\n");

    const url = `https://api.whatsapp.com/send/?phone=919555299371&text=${encodeURIComponent(enquiry)}&type=phone_number&app_absent=0`;
    if (status) status.textContent = "Your enquiry is ready. WhatsApp will open so you can send it to Simtrak.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
})();
