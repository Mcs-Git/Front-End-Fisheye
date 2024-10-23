export function dropMenu(){
    let options = document.querySelectorAll(".option")
    let drop_menu = document.querySelector(".drop_menu")
    let selected = document.querySelector(".selected")
    let filter = document.querySelector(".filter div")
    let temp = ""

    drop_menu.addEventListener("click",()=>{
        document.querySelector(".first_option").classList.toggle("border")
        drop_menu.classList.toggle("rotate_transition")
        filter.classList.toggle("filter_box_modified")
    })

    options.forEach(option =>{
        option.addEventListener("click",(e)=>{
            e.preventDefault()
            if((option.classList.contains("selected") && !option.classList.contains("border"))){
                temp = e.target.textContent
                e.target.textContent = selected.textContent
                selected.textContent = temp
            }
        })
    })
}