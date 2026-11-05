// Fetch items from the API and populate the content div.
const form = document.querySelector('#search-form')
const content = document.querySelector('#content')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const cuisine = new FormData(form).get('cuisine')
    content.textContent = 'Searching…'

    try {
        const response = await fetch(
            `/api/restaurants?cuisine=${encodeURIComponent(cuisine)}`
        )
        if (!response.ok) throw new Error('Unable to search restaurants')

        const restaurants = await response.json()
        content.replaceChildren()

        if (!restaurants.length) {
            content.textContent = 'No restaurants found for that cuisine.'
            return
        }

        for (const restaurant of restaurants) {
            const result = document.createElement('p')
            const address = typeof restaurant.address === 'string'
                ? restaurant.address
                : JSON.stringify(restaurant.address)

            result.textContent = `${restaurant.name ?? 'Unnamed restaurant'} — ${address ?? 'No address'}`
            content.appendChild(result)
        }
    } catch (error) {
        content.textContent = 'Unable to search. Check the database configuration and server logs.'
        console.error(error)
    }
})
