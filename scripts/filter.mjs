import { factory_media } from "./factoryMedia.mjs"
export function filter(all_photos,photographers,id){
    let options = document.querySelectorAll(".option")
    let copied_Array = all_photos
    const gallery =  document.querySelector(".gallery")
    options.forEach(option => {

    
    option.addEventListener("click", (e)=>{
            if(e.target.textContent == "Popularite"){
                gallery.innerHTML = " "
                copied_Array.sort((a, b) => a.likes - b.likes)
                const found = photographers.find(user => user.id == id)
                copied_Array.forEach(copy =>{
                    
                    gallery.appendChild(factory_media(copy,found.name.split(' ')[0]))
                })
            
            } else if(e.target.textContent == "Titre"){
                gallery.innerHTML = " "
                copied_Array.sort((a, b) => a.title.localeCompare(b.title))
                const found = photographers.find(user => user.id == id)
                copied_Array.forEach(copy =>{
                    
                    gallery.appendChild(factory_media(copy,found.name.split(' ')[0]))
                })
            } else{
                gallery.innerHTML = " "
                copied_Array.sort((a, b) => a.date.localeCompare(b.date))
                const found = photographers.find(user => user.id == id)
                copied_Array.forEach(copy =>{
                    
                    gallery.appendChild(factory_media(copy,found.name.split(' ')[0]))
                })
            }
        })
    })
    
}