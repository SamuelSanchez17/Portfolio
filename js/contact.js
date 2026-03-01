// ─── Contact Form

(() => {

  const EMAILJS_SERVICE_ID = "service_jl9p8wp";
  const EMAILJS_TEMPLATE_ID = "template_ufu8p7d";
  const EMAILJS_PUBLIC_KEY = "n0H0xS-t7x9ANFdDJ";

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("btn-send");
  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");
  const btnReset = document.getElementById("btn-reset");
  const btnRetry = document.getElementById("btn-retry");

  if(!form) return;

  //validacion en tiempo real
  const validateField = (input) => 
  {
    const group = input.closest(".form-group");
    if(!group) return true;

    let valid = true;
    if(input.required && !input.value.trim()) valid = false;
    if(input.type === "email" && input.value.trim()) 
    {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    group.classList.toggle("invalid", !valid);
    return valid;
  };

  form.querySelectorAll("input, textarea").forEach((field) => 
  { 
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if(field.closest("form-group")?.classList.contains("invalid"))
      {
        validateField(field);
      }
    });
  });

  // Enviar formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll("input, textarea").forEach((f) => {
      if(!validateField(f)) allValid = false;
    });
    if(!allValid) return;

    submitButton.disabled = true;
    submitButton.classList.add("sending");

    try {
      // emailjs.sendForm lee los name="" del HTML directamente
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

      form.hidden = false;
      successMessage.hidden = false;
      errorMessage.hidden = true;
      form.hidden = true;

    } catch (err)
    {
      console.error("EmailJS error:", err);
      form.hidden = true;
      successMessage.hidden = true;
      errorMessage.hidden = false;
    } finally 
    {
      submitButton.disabled = false;
      submitButton.classList.remove("sending");
    }
  });


  // Reiniciar formulario
  const resetForm = () => {
    form.reset();
    form.querySelectorAll(".form-group.invalid").forEach((g) => 
      g.classList.remove("invalid")
  );
    form.hidden = false;
    successMessage.hidden = true;
    errorMessage.hidden = true;
  };

  if(btnReset) btnReset.addEventListener("click", resetForm);
  if(btnRetry) btnRetry.addEventListener("click", resetForm);

})();