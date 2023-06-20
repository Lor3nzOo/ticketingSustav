# ticketingSustav

# Starting api
cd api

pnpm i

edit prisma connection url .env

pnpx prisma migrate dev --name init

pnpm run start:dev

# Starting frontend
cd frontend

pnpm i

pnpm run dev

Master password: 12345678

Master password location: frontend/src/routes/(auth)/master/+page.svelte
