// ─── Contact Form
// Las claves de EmailJS se almacenan en Vercel Environment Variables.
// frontend solo llama a /api/contact.

(() => {
  const form = document.getElementById("contact-form");
  const btnSend = document.getElementById("btn-send");
  const successEl = document.getElementById("form-success");
  const errorEl = document.getElementById("form-error");
  const btnReset = document.getElementById("btn-reset");
  const btnRetry = document.getElementById("btn-retry");

  if (!form) return;

  const validateField = (input) => {
    const group = input.closest(".form-group");
    if (!group) return true;
    let valid = true;
    if (input.required && !input.value.trim()) valid = false;
    if (input.type === "email" && input.value.trim()) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    group.classList.toggle("invalid", !valid);
    return valid;
  };

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-group")?.classList.contains("invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let allValid = true;
    form.querySelectorAll("input, textarea").forEach((f) => {
      if (!validateField(f)) allValid = false;
    });
    if (!allValid) return;

    btnSend.disabled = true;
    btnSend.classList.add("sending");

    try {
      const name = form.querySelector("#from_name")?.value.trim() || "";
      const email = form.querySelector("#from_email")?.value.trim() || "";
      const title = form.querySelector("#Title")?.value.trim() || "";
      const message = form.querySelector("#message")?.value.trim() || "";

      // Enviar datos a la serverless function — las claves están en el servidor
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          title,
          message,
        }),
      });

      if (!response.ok) throw new Error("Server error");

      form.hidden = true;
      successEl.hidden = false;
      errorEl.hidden = true;
    } catch (err) {
      console.error("Contact form error:", err);
      form.hidden = true;
      errorEl.hidden = false;
      successEl.hidden = true;
    } finally {
      btnSend.disabled = false;
      btnSend.classList.remove("sending");
    }
  });

  const resetForm = () => {
    form.reset();
    form.querySelectorAll(".form-group.invalid").forEach((g) => g.classList.remove("invalid"));
    form.hidden = false;
    successEl.hidden = true;
    errorEl.hidden = true;
  };

  if (btnReset) btnReset.addEventListener("click", resetForm);
  if (btnRetry) btnRetry.addEventListener("click", resetForm);
})();
