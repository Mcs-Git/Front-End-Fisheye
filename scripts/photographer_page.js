import { all_photographers } from "./getPhotographers.mjs";
import { factory_profile } from "./factoryPhotographerProfile.mjs";
import { factory_media } from "./factoryMedia.mjs"


let photographers_data = await all_photographers();
let photographers = photographers_data.photographers;
let photographer_gallery = photographers_data.media;
const photographer = document.querySelector(".photographer");
const gallery = document.querySelector(".gallery");
const price = document.querySelector(".price");
const total_number_of_likes = document.querySelector(".total_number_of_likes")
const params = new URL(document.location).searchParams;
const id = params.get("id");
let total_likes_table = []
let total_likes = 0
let initial = 0
const close_modal = document.querySelector(".close_modal");
const form_modal = document.querySelector(".form_modal");
const body = document.querySelector("body");
const photographer_name = document.querySelector(".photographer_name");
const prename = document.querySelector("#prename");
const family_name = document.querySelector("#family_name");
const mail = document.querySelector("#mail");
const comment = document.querySelector("#comment");
const form = document.querySelector("form");
let validator = false;
const close_slider = document.querySelector(".close");
const light_box = document.querySelector(".light_box");


photographers.forEach(person => {
    if(person.id == id){
        photographer.appendChild(factory_profile(person));
        if(id == 82){
            photographer.classList.add("adjusted");
        }

        photographer_gallery.forEach(media => {
            if(media.photographerId == id){
                gallery.appendChild(factory_media(media,person.name.split(' ')[0]));
                total_likes_table.push(media.likes)

                let sumWithInitial = total_likes_table.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    initial,
                  )
                total_number_of_likes.innerText = `${sumWithInitial}`;
                total_likes = sumWithInitial;
            }
            
        });
        
        price.innerText = `${person.price}€ / jour`

        let contact_me = document.querySelector(".contact_me");
        contact_me.addEventListener("click",()=>{
            form_modal.style.display = "flex"
            body.style.overflowY = "hidden"
            photographer_name.innerText = `${person.name}`

        
        });
    }
});

close_modal.addEventListener("click",()=>{
    form_modal.style.display = "none"
    body.style.overflowY = "scroll"
});

document.addEventListener("keydown",(e)=>{
    if(e.key == "Escape"){
        form_modal.style.display = "none"
        body.style.overflowY = "scroll"
        light_box.style.display = "none"
    }
    
})
const regex_name = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,30}$","u")

function invalid(e){
    e.style.border = "2px solid red"
    e.classList.add("invalid")
}
function valid(e){
    e.style.border = "none"
    e.classList.remove("invalid")
}
function validName(text,e){
    if(text.value.trim() == ""){
        invalid(text)
        validator = false;
        e.preventDefault();
    }
    if(regex_name.test(text.value) == true){
        valid(text)
        e.preventDefault();
        validator = true;
        return text.value;

    } else {
        invalid(text)
        validator = false;
        e.preventDefault();

    }
}
function validEmail(text,e){
    if(text.value.trim() == ""){
        invalid(text)
        validator = false;
        e.preventDefault();
    }
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(text.value) == true){
        valid(text)
        e.preventDefault();
        validator = true;
        return text.value;

    } else {
        invalid(text)
        e.preventDefault();
        validator = false;

    }
}

class client_message {
    constructor(prenom, nom, email, message) {
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.message = message;
    }
}


form.addEventListener("submit",(e)=>{
    validName(prename,e)
    validName(family_name,e)
    validEmail(mail,e)
    if(validator){
        let msg = new client_message(validName(prename,e),validName(family_name,e),validEmail(mail,e),comment.value)
        console.log(msg)
        form_modal.style.display = "none"
        body.style.overflowY = "scroll"
    }
})

prename.addEventListener("change",(e)=>{
    validName(prename,e)

});
family_name.addEventListener("change",(e)=>{
    validName(family_name,e)

})
mail.addEventListener("change",(e)=>{
    validEmail(mail,e)


})




const chevron_right = document.querySelector(".right");
const chevron_left = document.querySelector(".left");
const slider = document.querySelector(".slider");
let image_slider = []
let names = []
let number_of_slides = 0

let count = 0






function next_slider(image_slider,number_of_slides){
    image_slider[count].classList.remove("active")
    if(count < number_of_slides - 1){
        count++
    } else {
        count = 0
    }
    image_slider[count].classList.add("active")

}
function previous_slider(image_slider,number_of_slides){
    image_slider[count].classList.remove("active")
    if(count > 0){
        count--
    } else {
        count = number_of_slides - 1
    }
    image_slider[count].classList.add("active")

}
let all_photos = [] 
function show_all_photos(){
    photographer_gallery.forEach(element => {
        
        if(id == element.photographerId ){
                photographers.forEach(e =>{
                    if(element.photographerId == e.id){

                        element.name = e.name
                    }
                })
            all_photos.push(element)
        }

        });
}


close_slider.addEventListener("click",(event)=>{
    event.preventDefault()

    light_box.style.display = "none"
    body.style.overflowY = "scroll"
});
show_all_photos()
let photos_names = []

all_photos.forEach(e =>{
    let photo = document.createElement("div")
    
    if(e.image != undefined){

        photo.innerHTML = `<img src="/assets/images/${e.name.split(' ')[0]}/${e.image}" alt="Lilac breasted roller">
        <p>${e.title}</p>`
        photo.dataset.data_name = `${e.title}`
    } else {
        photo.innerHTML = `<video src="/assets/images/${e.name.split(' ')[0]}/${e.video}" alt="Lilac breasted roller" controls></video>
        <p>${e.title}</p>`
        photo.dataset.data_name = `${e.title}`
    }
    photos_names.push(photo)
    names.push(e.title)
    slider.appendChild(photo)
    image_slider = document.querySelectorAll(".slider div")
    number_of_slides = image_slider.length
    
   
})

document.querySelectorAll(".gallery  article .media").forEach(e =>{
    e.classList.add("open_slider")
    e.addEventListener("click",(event)=>{
        body.style.overflowY = "hidden"
        event.preventDefault()
        photos_names.forEach(el =>{
            if(el.dataset.data_name === e.dataset.data_name){
                light_box.style.display = "flex"
                el.classList.add("active")
                count = names.indexOf(e.dataset.data_name)
                
                
            } 
            else{
                el.classList.remove("active")


            }
            
        })
        
    })
})

chevron_right.addEventListener("click",(event) =>{
    event.preventDefault()
    next_slider(image_slider,number_of_slides)
});
chevron_left.addEventListener("click",(event) =>{
    event.preventDefault()
    previous_slider(image_slider,number_of_slides)
});

let like = document.querySelectorAll("article .likes svg")
let clicked = true
let modified = false
like.forEach(e =>{
    let current_like = parseInt(e.previousSibling.previousSibling.innerText)
    e.style.cursor = "pointer"
    e.addEventListener("click",(event)=>{
        if(!event.target.classList.contains("modified")){
            event.target.classList.add("modified")
            current_like++;
            e.previousSibling.previousSibling.innerText = current_like
            total_likes++;
            total_number_of_likes.innerText = total_likes;
            clicked = false
            modified = true
            console.log(parseInt(e.previousSibling.previousSibling.innerText))

        } 
       
        else {
            event.target.classList.remove("modified")
            current_like--;
            e.previousSibling.previousSibling.innerText = current_like
            total_likes--;
            total_number_of_likes.innerText = total_likes;
            clicked = true
            modified = false

        }
        console.log(like)
        
    })
})
document.querySelector("article .media").removeEventListener("click",(e)=>{console.log(e)})
console.log(total_likes)


let option = document.querySelector("select option")
console.log(option.value)