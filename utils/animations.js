export function addAnimation(class_name, animation_class) {
    const pageElement = document.querySelector(class_name);
    if (!pageElement) return;

    pageElement.classList.remove('animate', 'animate_long');
    void pageElement.offsetWidth;

    pageElement.classList.add(animation_class);
}
