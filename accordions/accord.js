const icons = document.querySelectorAll(".contains i");
const allPara = document.querySelectorAll(".contains p");

icons.forEach((icons) => {
    icons.addEventListener("click", () => {
        const para = icons.parentElement.nextElementSibling;
        if (para.classList.contains("active")) {
            para.classList.remove("active");

            icons.classList.remove("fa-square-minus");
            icons.classList.add("fa-square-plus");
        } else {
            allPara.forEach((para) => {
                if (para.classList.contains("active")) {
                    para.classList.remove("active");
                    return;
                }
            });

            para.classList.add("active");
            icons.classList.remove("fa-square-plus");
            icons.classList.add("fa-square-minus");

        }
    });
});