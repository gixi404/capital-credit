export const prerender = false;
import { Resend, type CreateEmailResponse } from "resend";
import { type APIRoute } from "astro";
import templateHTML from "../../utils/email-template";
import { DOMAIN, DOMAIN_URL } from "../../utils/const";

const { RESEND_API_KEY, ADMIN_EMAIL }: ImportMetaEnv = import.meta.env;
const resend: Resend = new Resend(RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const form: FormData = await request.formData();
  const honeypot: Honeypot = form.get("provincia");

  if (honeypot) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.warn("Honeypot detectado, solicitud ignorada");
    return Response.redirect(`${DOMAIN_URL}/?s=err`, 303);
  }

  const dni = form.get("dni") as string,
    phone = form.get("phone") as string,
    email = form.get("email") as string,
    employ = form.get("employSelect") as string,
    income = (form.get("incomeSelect") as string) || "No aplica",
    { data, error }: CreateEmailResponse = await resend.emails.send({
      from: `CAPITAL CREDIT <hola@${DOMAIN.split("www.")[1]}>`,
      to: String(ADMIN_EMAIL),
      subject: "Nueva solicitud",
      html: templateHTML({ dni, phone, email, employ, income }),
      text: `
      DNI: ${dni}
      CELULAR: ${phone}
      EMAIL: ${email}
      CONDICIÓN LABORAL: ${employ}
      INGRESO MENSUAL: ${income}
      `,
    });

  if (error) {
    console.error("Email error:", error);
    return Response.redirect(`${DOMAIN_URL}/?s=err`, 303);
  }

  console.log("ID:", data?.id);
  return Response.redirect(`${DOMAIN_URL}/?s=ok`, 303);
};

type Honeypot = FormDataEntryValue | null;
