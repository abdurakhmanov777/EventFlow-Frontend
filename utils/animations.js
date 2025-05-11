export function addAnimation(class_name, animation_class) {
    const pageElement = document.querySelector(class_name);
    if (!pageElement) return;

    // Удаляем старую анимацию
    pageElement.classList.remove('animate', 'animate_long');
    void pageElement.offsetWidth;

    // Добавляем новую
    pageElement.classList.add(animation_class);
}
