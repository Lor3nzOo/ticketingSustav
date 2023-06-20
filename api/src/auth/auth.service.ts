import {Injectable, BadRequestException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import * as b from 'bcrypt'
import * as c from 'crypto'
import * as process from "process";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    async register (user) {
        const { username, password } = user

        const userFound = await this.prisma.recepcioner.findUnique({
            where: {
                username
            }
        })
        if (userFound) {
            throw new BadRequestException('Recepcioner vec postoji!')
        }

        const hash = await b.hash(password, 10)
        const created = await this.prisma.recepcioner.create({
            data: {
                username,
                passwordHash: hash,
                session: c.randomUUID()
            }
        })

        if (created) {
            return 'Recepcioner uspjesno kreiran!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async login (user, res) {
        const { username, password } = user

        const userFound = await this.prisma.recepcioner.findUnique({
            where: {
                username
            }
        })
        if (!userFound) {
            throw new BadRequestException('Recepcioner ne postoji!')
        }
        if (await b.compare(password, userFound.passwordHash)) {
            const session = c.randomUUID()
            await this.prisma.recepcioner.update({
                where: {
                    username
                },
                data: {
                    session
                }
            })
            res.cookie('session', session)
            res.send('Uspjesno prijavljeni!')
        } else {
            throw new BadRequestException('Krivi podaci!')
        }
    }

    async session(req) {
        const session = req.cookies['session']

        if (session) {
            const user = await this.prisma.recepcioner.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })
            if (user) {
                return {
                    username: user.username,
                    id: user.id,
                    statusCode: 200
                }
            } else {
                throw new BadRequestException('Nema sesije!')
            }
        } else {
            throw new BadRequestException('Nema sesije!')
        }
    }

    async allUsers() {
        return await this.prisma.recepcioner.findMany()
    }

    async deleteUser(user) {
        const deleted = await this.prisma.recepcioner.delete({
            where: {
                username: user.username
            }
        })

        if (deleted) {
            return 'Recepcioner uspjesno izbrisan!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }
}
