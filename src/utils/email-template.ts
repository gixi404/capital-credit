export default function templateHTML(
  dni: FormDataEntryValue,
  phone: FormDataEntryValue,
  email: FormDataEntryValue,
  condition: FormDataEntryValue
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
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table {
          border-collapse: collapse;
        }
      </style>
    </head>
    <body style="margin:0; padding:0; background-color:#f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc">
        <tr>
          <td align="center" style="padding: 15px;">
            <table width="480" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
              <tr>
                <td align="center" bgcolor="#1e293b" style="padding: 18px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                    DATOS DEL USUARIO
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 15px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 8px;">
                        ${createOptimizedSection(
                          "#fef3c7",
                          "#fde68a",
                          "#92400e",
                          "DNI",
                          dni
                        )}
                      </td>
                      <td width="50%" valign="top" style="padding-left: 8px;">
                        ${createOptimizedSection(
                          "#fce7f3",
                          "#fbcfe8",
                          "#be185d",
                          "Celular",
                          phone
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" style="height: 12px;"></td>
                    </tr>
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 8px;">
                        ${createOptimizedSection(
                          "#dcfce7",
                          "#bbf7d0",
                          "#047857",
                          "Email",
                          email,
                          true
                        )}
                      </td>
                      <td width="50%" valign="top" style="padding-left: 8px;">
                        ${createOptimizedSection(
                          "#f3e8ff",
                          "#e9d5ff",
                          "#6d28d9",
                          "Condición laboral",
                          condition,
                          true
                        )}
                      </td>
                    </tr>
                  </table>
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

function createOptimizedSection(
  bgStart: string,
  bgEnd: string,
  labelColor: string,
  label: string,
  value: FormDataEntryValue,
  isSmallText = false
): string {
  const fontSize = isSmallText ? "12px" : "13px";
  const wordBreak = isSmallText ? "word-break: break-all;" : "";

  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, ${bgStart} 0%, ${bgEnd} 100%); border: 1px solid ${labelColor}20;">
    <tr>
      <td style="padding: 16px; height: 65px; vertical-align: top;">
        <div style="display: flex; align-items: center; margin-bottom: 4px;">
          <span style="color: ${labelColor}; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${label}</span>
        </div>
        <div style="color: #1f2937; font-size: ${fontSize}; font-weight: 600; ${wordBreak}">
          ${value}
        </div>
      </td>
    </tr>
  </table>`;
}
