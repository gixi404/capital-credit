export const prerender = false;
import { Resend, type CreateEmailResponse } from "resend";
import { type APIRoute } from "astro";
import templateHTML from "../../utils/email-template";
import { DOMAIN } from "../../utils/const";

const resend: Resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async req => {
  const formData: FormData = await req.request.formData(),
    user: UserData = {
      dni: formData.get("dni") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      condition: formData.get("condition") as string,
    },
    { data, error }: CreateEmailResponse = await resend.emails.send({
      from: "CAPITAL CREDIT <info@gixi.dev>",
      to: "gixi.tsx@gmail.com",
      subject: "Nueva solicitud",
      html: templateHTML(user.dni, user.email, user.phone, user.condition),
      text: `Nueva solicitud:
      DNI: ${user.dni},
      EMAIL: ${user.email},
      CELULAR: ${user.phone},
      CONDICIÓN LABORAL: ${user.condition}
      `,
    });

  if (error) {
    console.error(`${user.phone} : ${error.message}`);
    return Response.redirect(`${DOMAIN}/?s=${error.name}`, 301);
  }

  console.log(`${user.phone} : ${data?.id}`);
  return Response.redirect(`${DOMAIN}/?s=ok`, 301);
};

interface UserData {
  dni: string;
  email: string;
  phone: string;
  condition: string;
}
