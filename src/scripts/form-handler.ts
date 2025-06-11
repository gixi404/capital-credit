import { INCOMES_SELECT, EMPLOY_SELECT } from "../utils/const";

export function initForm(): void {
  const mainForm = document.getElementById("mainForm") as HTMLFormElement,
    employSelect = document.getElementById("employSelect") as HTMLSelectElement,
    incomeSection = document.getElementById("incomeSection") as HTMLDivElement,
    incomeSelect = document.getElementById("incomeSelect") as HTMLSelectElement,
    submitBtn = document.getElementById("submitBtn") as HTMLButtonElement,
    btnText = document.getElementById("btnText") as HTMLSpanElement,
    loadSpinner = document.getElementById("loadSpinner") as HTMLSpanElement,
    dniInput = document.getElementById("dni") as HTMLInputElement,
    phoneInput = document.getElementById("phone") as HTMLInputElement,
    anchorLinks = document.querySelectorAll('[href="/#formulario"]') as Anchors,
    inputValidations: InputValidations = {
      dni: {
        regex: /^(\d{1,3}([. ]\d{3}){2}|\d{7,8})$/,
        msg: "El DNI debe tener formato válido (ej: 12.345.678)",
      },
      phone: {
        regex: /^\+?[\d\s]{7,22}$/,
        msg: "El celular debe tener formato válido (ej: 5491176294118)",
      },
      email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        msg: "El email debe tener formato válido (ej: ejemplo@gmail.com)",
      },
      employSelect: {
        regex: new RegExp(`^(?!${EMPLOY_SELECT[0]}$).*$`),
        msg: "Debes seleccionar una condición laboral",
      },
      incomeSelect: {
        regex: new RegExp(`^(?!${INCOMES_SELECT[0]}$).*$`),
        msg: "Debes seleccionar tu ingreso mensual",
      },
    };

  function showError(id: string, msg: string): void {
    const span = document.getElementById(`${id}-err`) as HTMLSpanElement;
    if (span) {
      span.textContent = msg;
      span.classList.remove("hidden");
      const input = document.getElementById(id) as HTMLInputElement;
      input?.classList.add("border-red-500");
    }
  }

  function clearError(id: string): void {
    const span = document.getElementById(`${id}-err`);
    if (span) {
      span.textContent = "";
      span.classList.add("hidden");
      const input = document.getElementById(id) as HTMLInputElement;
      input?.classList.remove("border-red-500");
    }
  }

  function validateField(id: string, val: string): boolean {
    const validation: Input = inputValidations[id];

    if (!validation) return true;

    const isValid: boolean = validation.regex.test(val);

    if (!isValid) {
      showError(id, validation.msg);
    } else {
      clearError(id);
    }

    return isValid;
  }

  function handleEmployChange(): void {
    if (
      employSelect.value == EMPLOY_SELECT.find(i => i.includes("con recibo"))
    ) {
      incomeSection.classList.remove("hidden");
      incomeSelect.required = true;
      incomeSelect.value = INCOMES_SELECT[0];
    } else {
      incomeSection.classList.add("hidden");
      incomeSelect.required = false;
      incomeSelect.value = INCOMES_SELECT[0];
    }
  }

  function handleDniInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9.\s]/g, "");
  }

  function handlePhoneInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9\s+]/g, "");
  }

  function handleSubmit(e: Event): void {
    e.preventDefault();

    let hasErrors: boolean = false;
    const fields: string[] = ["dni", "phone", "email", "employSelect"];
    const formInputs = mainForm.querySelectorAll("input, select") as FormInputs;

    if (!incomeSection.classList.contains("hidden")) {
      fields.push("incomeSelect");
    }

    fields.forEach((id: string) => {
      const input = document.getElementById(id) as HTMLInputElement;
      if (!validateField(id, input.value)) return (hasErrors = true);
    });

    if (hasErrors) return;

    formInputs.forEach(input => {
      input.classList.add("pointer-events-none", "opacity-70");
    });
    btnText.classList.add("hidden");
    loadSpinner.classList.remove("hidden");
    submitBtn.disabled = true;
    submitBtn.style.pointerEvents = "none";
    submitBtn.style.opacity = "0.9";
    mainForm.submit();
  }

  anchorLinks.forEach((a: HTMLAnchorElement) => {
    a.addEventListener("click", () => {
      const timer: Timer = setTimeout(() => dniInput.focus(), 700);
      return () => clearTimeout(timer);
    });
  });

  employSelect.addEventListener("change", () => {
    handleEmployChange();
    validateField("employSelect", employSelect.value);
  });
  incomeSelect.addEventListener("change", () => {
    validateField("incomeSelect", incomeSelect.value);
  });
  dniInput.addEventListener("input", handleDniInput);
  phoneInput.addEventListener("input", handlePhoneInput);
  mainForm.addEventListener("submit", handleSubmit);
}

type Timer = ReturnType<typeof setTimeout>;

type Anchors = NodeListOf<HTMLAnchorElement>;

type FormInputs = NodeListOf<HTMLInputElement | HTMLSelectElement>;

interface InputValidations {
  [key: string]: Input;
}

interface Input {
  regex: RegExp;
  msg: string;
}
