document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".animate");
  
    const showOnScroll = () => {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;

            // Добавляем класс show, когда элемент попадает в видимую область экрана
            if (elementTop < viewportHeight - 50 && elementBottom > 50) {
                element.classList.add("show");
            } else {
                // Убираем класс show, когда элемент выходит за видимую область
                element.classList.remove("show");
            }
        });
    };
  
    window.addEventListener("scroll", showOnScroll);
    showOnScroll();
});