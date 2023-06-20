import fetch from "node-fetch";

export const load = async ({ locals }) => {
    const data = await fetch('http://localhost:3000/api/ticket/allKampovi')

    const kampovi = await data.json()

    return {
        kampovi
    }
}