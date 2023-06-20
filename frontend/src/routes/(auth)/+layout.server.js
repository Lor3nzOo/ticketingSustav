import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (locals.user?.username.length > 0) {
        throw redirect(307, '/app');
    }
    return {
        user: locals.user
    }
}