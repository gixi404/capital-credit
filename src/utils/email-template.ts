export default function templateHTML({
  dni,
  phone,
  email,
  employ,
  income,
}: Fields): string {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Información del Usuario</title>
    </head>
    <body>
      <table width="100%" cellpadding="8" cellspacing="0" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
                  <tr style="background-color: #f8f9fa;">
                    <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold; color: #555;">CAMPO</th>
                    <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold; color: #555;">INFORMACIÓN</th>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #fff; font-weight: 500;">DNI</td>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #fff;">${dni}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #f9f9f9; font-weight: 500;">Celular</td>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #f9f9f9;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #fff; font-weight: 500;">Email</td>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #fff;">${email}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #f9f9f9; font-weight: 500;">Condición laboral</td>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #f9f9f9;">${employ}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #f9f9f9; font-weight: 500;">Ingreso mensual</td>
                    <td style="border: 1px solid #ddd; padding: 12px; background-color: #f9f9f9;">${income}</td>
                  </tr>
                </table>
    </body>
  </html>
  `;
}

interface Fields {
  dni: string;
  phone: string;
  email: string;
  employ: string;
  income?: string;
}
