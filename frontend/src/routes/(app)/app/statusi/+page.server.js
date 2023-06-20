import fetch from "node-fetch";

export const load = async ({ locals }) => {
    const data = await fetch('http://localhost:3000/api/ticket/allStatus')

    const statusi = await data.json()

    return {
        statusi
    }
}