// Vercel Serverless Function — POST /api/contact
// Las variables de entorno se configuran en Vercel Dashboard → Settings → Environment Variables

module.exports = async function handler(req, res) {
  // Solo acepta metodo POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = {
    SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  };

  // Validar que las variables de entorno existan
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error("Missing EmailJS environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { name, email, title, message } = req.body || {};

    if (!name || !email || !title || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Llamar a la API REST de EmailJS desde el servidor
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: { name, email, title, message },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("EmailJS API error:", text);
      return res.status(502).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
