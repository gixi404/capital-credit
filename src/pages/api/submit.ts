export const prerender = false;
import { Resend, type CreateEmailResponse } from "resend";
import { type APIRoute } from "astro";
import templateHTML from "../../utils/email-template";
import { DOMAIN } from "../../utils/const";

const resend: Resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async req => {
  const form: FormData = await req.request.formData(),
    user: UserData = {
      dni: form.get("dni") as FormDataEntryValue,
      phone: form.get("phone") as FormDataEntryValue,
      email: (form.get("email") || "No especificado") as FormDataEntryValue,
      condition: form.get("condition") as FormDataEntryValue,
    },
    { data, error }: CreateEmailResponse = await resend.emails.send({
      from: "CAPITAL CREDIT <info@gixi.dev>",
      to: "gixi.tsx@gmail.com",
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
    console.error(error.message);
    return Response.redirect(`${DOMAIN}/?s=${error.name}`, 303);
  }

  console.log(data?.id);
  return Response.redirect(`${DOMAIN}/?s=ok`, 303);
};

interface UserData {
  [key: string]: FormDataEntryValue;
}
