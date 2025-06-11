const DOMAIN_URL: string = "https://www.capitalcredit.com.ar", // "http://localhost:4321";
  DOMAIN: string = DOMAIN_URL.split("https://")[1],
  WHATSAPP_URL: string = "https://wa.me/+5491176294118",
  WHATSAPP: string = WHATSAPP_URL.split("me/")[1],
  EMPLOY_SELECT: string[] = [
    "Seleccioná una opción",
    "Trabajo informal (sin recibo)",
    "Trabajo en relación de dependencia (con recibo)",
    "Jubilado/a",
    "Monotributista",
    "Emprendedor/a o trabajador independiente",
  ],
  INCOMES_SELECT: string[] = [
    "Seleccioná una opción",
    "$200.000 a $399.999",
    "$400.000 a $599.999",
    "$600.000 a $799.999",
    "$800.000 a $999.999",
    "$1.000.000 a $1.199.999",
    "$1.200.000 a $10.000.000",
  ];

export {
  WHATSAPP_URL,
  DOMAIN_URL,
  EMPLOY_SELECT,
  INCOMES_SELECT,
  WHATSAPP,
  DOMAIN,
};
