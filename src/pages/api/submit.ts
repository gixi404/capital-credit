export const prerender = false;
import { Resend, type CreateEmailResponse } from "resend";
import { type APIRoute } from "astro";
import templateHTML from "../../utils/email-template";
import { DOMAIN } from "../../utils/const";

const { RESEND_API_KEY, ADMIN_EMAIL }: ImportMetaEnv = import.meta.env;
const resend: Resend = new Resend(RESEND_API_KEY);

export const POST: APIRoute = async req => {
  const form: FormData = await req.request.formData();

  const dni = form.get("dni") as string | null;
  const phone = form.get("phone") as string | null;
  const email = (form.get("email") as string) || "No especificado";
  const condition = form.get("condition") as string | null;

  if (!dni || !phone || !condition) {
    return Response.redirect(`${DOMAIN}/?s=missing_fields`, 303);
  }

  const user: UserData = { dni, phone, email, condition };

  try {
    const { data, error }: CreateEmailResponse = await resend.emails.send({
      from: "CAPITAL CREDIT <info@gixi.dev>",
      to: ADMIN_EMAIL,
      subject: "Nueva solicitud",
      html: templateHTML(user.dni, user.phone, user.email, user.condition),
      text: `Nueva solicitud:
      DNI: ${user.dni},
      CELULAR: ${user.phone},
      EMAIL: ${user.email},
      CONDICIÓN LABORAL: ${user.condition}
      `,
    });

    if (error) {
      console.error("Error al enviar email:", error);
      return Response.redirect(`${DOMAIN}/?s=email_error`, 303);
    }

    console.log("Email enviado, ID:", data?.id);
    return Response.redirect(`${DOMAIN}/?s=ok`, 303);
  } catch (err) {
    console.error("Error inesperado:", err);
    return Response.redirect(`${DOMAIN}/?s=server_error`, 303);
  }
};

interface UserData {
  [key: string]: FormDataEntryValue;
}
