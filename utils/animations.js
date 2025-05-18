export function addAnimation(selector, animation_class) {
    const element = document.querySelector(selector);
    if (!element) return;

    void element.offsetWidth; // Сброс потока для перезапуска анимации

    // Добавляем класс анимации
    element.classList.add(animation_class);

    // Удаляем анимационный класс после завершения анимации
    const handleAnimationEnd = () => {
        element.classList.remove(animation_class);
        element.removeEventListener('animationend', handleAnimationEnd);
    };

    element.addEventListener('animationend', handleAnimationEnd);
}
