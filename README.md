# ticketingSustav

# Starting api
cd api

pnpm i

edit prisma connection url .env

pnpx prisma migrate dev --name init

pnpx prisma generate

pnpm run start:dev

# Starting frontend
cd frontend

pnpm i

pnpm run dev

Master password: 12345678

Master password location: frontend/src/routes/(auth)/master/+page.svelte
