const showUp = document.querySelectorAll(".text,.svg");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.classList.add("reveal")
            observer.unobserve(entry.target);
        }
    });
},{
    threshold: 0.7
});

showUp.forEach(el => observer.observe(el));