export function factory(person){
    let article = document.createElement("article")
    article.innerHTML = `              <article>
            <a href="/photographer_page.html?id=${person.id}">
                <div class="photograph_photo"><img src="/assets/photographers/${person.portrait}" alt="Mimi Keel" ></div>
                <h2 href = "#">${person.name}</h2>
            </a>
            <p class="photograph_location">${person.city}, ${person.country}</p>
            <p class="photograph_text">${person.tagline}</p>
            <p class="photograph_price">${person.price}€/jour</p>

        </article>

            `
    return article;
}