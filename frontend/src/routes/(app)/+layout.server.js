import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.user?.username) {
        throw redirect(307, '/login');
    }
    return {
        user: locals.user
    }
}