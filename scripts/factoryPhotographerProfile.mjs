export function factory_profile(person){
    let section = document.createElement("section")
    section.innerHTML = `      
            <section class="photograph_header">
                <div class="photographer_profile">
                    <h1>${person.name}</h1>
                    <p class="photographer_location">${person.city}, ${person.country}</p>
                    <p class="photographer_text">${person.tagline}</p>
                </div>
                <a href="#" class="contact_me">Contactez-moi</a>
                <article>
                    <img src="/assets/photographers/${person.portrait}" alt="">
                </article>
            </section>

            `
    return section;
}