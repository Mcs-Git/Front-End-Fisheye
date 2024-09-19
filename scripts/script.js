import { all_photographers } from "./getPhotographers.mjs";
import { factory } from "./factoryCreatePhotographers.mjs";


let photographers_data = await all_photographers();
let photographer = photographers_data.photographers;
let main = document.querySelector("main");

photographer.forEach(person => {
    
    main.appendChild(factory(person));
});
