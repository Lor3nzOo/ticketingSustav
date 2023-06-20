# ticketingSustav

# Starting api
cd api
pnpm i
edit prisma connection url
npx prisma migrate dev --name init
pnpm run start:dev

# Starting frontend
cd frontend
pnpm i
pnpm run dev
