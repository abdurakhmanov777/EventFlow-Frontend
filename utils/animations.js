export function addAnimation(class_name) {
    const pageElement = document.querySelector(class_name);
    pageElement.classList.remove('animate');
    void pageElement.offsetWidth;
    pageElement.classList.add('animate');
}
