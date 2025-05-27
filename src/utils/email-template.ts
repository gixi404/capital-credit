export default function templateHTML(
  dni: string,
  email: string,
  phone: string,
  condition: string
): string {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Información del Usuario</title>
      <style>
        body {
          margin: 0;
          padding: 0;
        }
        table {
          border-collapse: collapse;
        }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#dcfce7; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8f9fa">
        <tr>
          <td align="center" style="padding: 30px 0;">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #e5e7eb; border-radius: 10px; overflow: hidden;">
              <tr>
                <td align="center" bgcolor="#1e2939" style="padding: 30px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    DATOS
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  ${createSection("#fef3c7", "#f59e0b", "#d97706", "DNI", dni)}
                  ${createSection(
                    "#dcfce7",
                    "#059669",
                    "#047857",
                    "Email",
                    email
                  )}
                  ${createSection(
                    "#fce7f3",
                    "#ec4899",
                    "#db2777",
                    "Celular",
                    phone
                  )}
                  ${createSection(
                    "#f3e8ff",
                    "#8b5cf6",
                    "#7c3aed",
                    "Condición Laboral",
                    condition
                  )}
                </td>
              </tr>
              <tr>
                <td align="center" bgcolor="#1e2939" style="padding: 30px; border-top: 1px solid #e5e7eb;">
                  <a href="https://lym.software" target="_blank" style="color: #e5e7eb; font-size: 14px; text-decoration: none;">
                    Email enviado automáticamente por Lym Software
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function createSection(
  bg: string,
  border: string,
  labelColor: string,
  label: string,
  value: string
): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
    <tr>
      <td style="padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 20px; background-color: ${bg}; border-left: 4px solid ${border};">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color: ${labelColor}; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 8px;">
                    ${label}
                  </td>
                </tr>
                <tr>
                  <td style="color: #1f2937; font-size: 18px; font-weight: 600;">
                    ${value}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}
