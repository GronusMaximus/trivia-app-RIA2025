export let currentQuantity = 10;
export let isDarkMode = false;

// Navegación entre pantallas
export function showScreen(screenId: string, event: Event) {
    document.querySelectorAll<HTMLElement>(".screen").forEach(s => s.classList.remove("active"));
    document.querySelectorAll<HTMLElement>(".tab-btn").forEach(t => t.classList.remove("active"));

    document.getElementById(`${screenId}-screen`)?.classList.add("active");
    (event.target as HTMLElement).classList.add("active");
}

// Selección de categoría
export function initCategorySelection() {
    document.querySelectorAll<HTMLElement>(".category-card")
        .forEach(card => {
            card.addEventListener("click", () => {
                document.querySelectorAll<HTMLElement>(".category-card")
                    .forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
            });
        });
}

// Botones de opción
export function initOptionGroups() {
    document.querySelectorAll<HTMLElement>(".option-group").forEach(group => {
        const buttons = group.querySelectorAll<HTMLElement>(".option-btn");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("selected"));
                button.classList.add("selected");
            });
        });
    });
}

// Control de rango de cantidad
export function initQuantitySlider() {
    const slider = document.querySelector<HTMLInputElement>(".range-slider");
    const display = document.querySelector<HTMLElement>(".quantity-display");
    if (slider && display) {
        slider.addEventListener("input", () => {
            currentQuantity = Number(slider.value);
            display.textContent = `${currentQuantity}`;
        });
    }
}

// Alternar tema claro/oscuro
export function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const btn = document.querySelector<HTMLElement>(".theme-btn");
    if (isDarkMode) {
        body.setAttribute("data-theme", "dark");
        btn!.textContent = "☀️";
    } else {
        body.removeAttribute("data-theme");
        btn!.textContent = "🌙";
    }
}

// Temporizador de juego (ejemplo)
export function startTimer(duration = 30) {
    let timeLeft = duration;
    const timerEl = document.querySelector<HTMLElement>(".timer");
    const interval = setInterval(() => {
        if (timerEl) {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            timerEl.textContent = `⏱️ ${m}:${s.toString().padStart(2, "0")}`;
        }
        if (timeLeft-- <= 0) clearInterval(interval);
    }, 1000);
}
