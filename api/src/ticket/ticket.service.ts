import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TicketService {
    constructor(private readonly prisma: PrismaService) {}
    async getAllTickets() {
        return await this.prisma.ticket.findMany({
            include: {
                recepcioner: true,
                status: true
            }
        })
    }

    async getTicket(id) {
        return await this.prisma.ticket.findUnique({
            where: {
                id: Number(id)
            }
        })
    }

    async getAllJedinice() {
        return await this.prisma.smjestajnaJedinica.findMany()
    }

    async getAllStatus() {
        return await this.prisma.status.findMany()
    }

    async getAllKampovi() {
        return await this.prisma.kamp.findMany()
    }

    async addJedinica(jedinica, req) {
        const session = req.cookies['session']

        if (session) {
            const jedinicaFound = await this.prisma.smjestajnaJedinica.findUnique({
                where: {
                    naziv: jedinica.naziv
                }
            })
            if (jedinicaFound) {
                throw new BadRequestException('Jedinica vec postoji!')
            }

            const user = await this.prisma.recepcioner.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })

            if (user) {
                const created = await this.prisma.smjestajnaJedinica.create({
                    data: {
                        naziv: jedinica.naziv
                    }
                })

                if (created) {
                    return 'Smještajna jedinica uspješno kreirana!'
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema sesije!')
            }
        } else {
            throw new BadRequestException('Nema sesije!')
        }
    }

    async deleteJedinica(jedinica) {
        const deleted = await this.prisma.smjestajnaJedinica.delete({
            where: {
                naziv: jedinica.naziv
            }
        })

        if (deleted) {
            return 'Jedinica uspjesno izbrisana!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async editJedinica(jedinica) {
        const jedinicaFound = await this.prisma.smjestajnaJedinica.findUnique({
            where: {
                naziv: jedinica.naziv
            }
        })
        if (jedinicaFound) {
            throw new BadRequestException('Jedinica vec postoji!')
        }

        const edited = await this.prisma.smjestajnaJedinica.update({
            where: {
                id: jedinica.id
            },
            data: {
                naziv: jedinica.naziv
            }
        })

        if (edited) {
            return 'Jedinica uspjesno uređena!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async addStatus(status, req) {
        const session = req.cookies['session']

        if (session) {
            const statusFound = await this.prisma.status.findUnique({
                where: {
                    naziv: status.naziv
                }
            })
            if (statusFound) {
                throw new BadRequestException('Status vec postoji!')
            }

            const user = await this.prisma.recepcioner.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })

            if (user) {
                const created = await this.prisma.status.create({
                    data: {
                        naziv: status.naziv
                    }
                })

                if (created) {
                    return 'Status ticketa uspješno kreiran!'
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema sesije!')
            }
        } else {
            throw new BadRequestException('Nema sesije!')
        }
    }

    async deleteStatus(status) {
        const deleted = await this.prisma.status.delete({
            where: {
                naziv: status.naziv
            }
        })

        if (deleted) {
            return 'Status uspjesno izbrisan!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async editStatus(status) {
        const statusFound = await this.prisma.status.findUnique({
            where: {
                naziv: status.naziv
            }
        })
        if (statusFound) {
            throw new BadRequestException('Status vec postoji!')
        }

        const edited = await this.prisma.status.update({
            where: {
                id: status.id
            },
            data: {
                naziv: status.naziv
            }
        })

        if (edited) {
            return 'Status uspjesno uređen!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async addKamp(kamp, req) {
        const session = req.cookies['session']

        if (session) {
            const kampFound = await this.prisma.kamp.findUnique({
                where: {
                    naziv: kamp.naziv
                }
            })
            if (kampFound) {
                throw new BadRequestException('Kamp vec postoji!')
            }

            const user = await this.prisma.recepcioner.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })

            if (user) {
                const created = await this.prisma.kamp.create({
                    data: {
                        naziv: kamp.naziv
                    }
                })

                if (created) {
                    return 'Kamp uspješno kreiran!'
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema sesije!')
            }
        } else {
            throw new BadRequestException('Nema sesije!')
        }
    }

    async editKamp(kamp) {
        const kampFound = await this.prisma.kamp.findUnique({
            where: {
                naziv: kamp.naziv
            }
        })
        if (kampFound) {
            throw new BadRequestException('Kamp vec postoji!')
        }

        const edited = await this.prisma.kamp.update({
            where: {
                id: kamp.id
            },
            data: {
                naziv: kamp.naziv
            }
        })

        if (edited) {
            return 'Kamp uspjesno uređen!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async deleteKamp(kamp) {
        const deleted = await this.prisma.kamp.delete({
            where: {
                id: kamp.id
            }
        })

        if (deleted) {
            return 'Kamp uspjesno izbrisan!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async addTicket(ticket, req) {
        const session = req.cookies['session']

        if (session) {
            const user = await this.prisma.recepcioner.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })

            if (user) {
                const {selectedStatusId, sifraKampa, sifra_smjestajne_jedinice } = ticket

                const statusFound = await this.prisma.status.findUnique({
                    where: {
                        id: selectedStatusId
                    }
                })

                const sifraKampaFound = await this.prisma.kamp.findUnique({
                    where: {
                        id: sifraKampa
                    }
                })


                if (!sifraKampaFound) {
                    throw new BadRequestException('Sifra kampa ne postoji!')
                }

                if (!statusFound) {
                    throw new BadRequestException('Status ne postoji!')
                }

                if (sifra_smjestajne_jedinice.length > 3) {
                    throw new BadRequestException('Najvise se mogu izabrati 3 smještajne jedinice!')
                }

                let sifreArr = []

                sifra_smjestajne_jedinice.forEach(jedinica => {
                    sifreArr = [...sifreArr, jedinica.id]
                })

                const sifra_smjestajne_jediniceFound = await this.prisma.smjestajnaJedinica.findMany({
                    where: {
                        id: { in: sifreArr }
                    }
                })

                if (!sifra_smjestajne_jediniceFound) {
                    throw new BadRequestException('Ne postojece jedinice!')
                }

                const created = await this.prisma.ticket.create({
                    data: {
                        sifra_recepcionera: user.id,
                        sifra_kampa: sifraKampa,
                        status_ticketa: selectedStatusId,
                        // @ts-ignore
                        n_sifra_smjestajne_jedinice: sifra_smjestajne_jedinice,
                        smjestajne_jedinice: {
                            connect: sifra_smjestajne_jedinice
                        }
                    }
                })

                if (created) {
                    return 'Ticket uspješno kreiran!'
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema sesije!')
            }
        } else {
            throw new BadRequestException('Nema sesije!')
        }
    }

    async addTicketRecepcioner(ticket, req) {
        const session = req.cookies['session']

        if (session) {
            const user = await this.prisma.recepcioner.findFirst({
                where: {
                    // @ts-ignore
                    session
                }
            })

            if (user) {
                const {selectedStatusId, sifraKampa, sifra_smjestajne_jedinice, sifra_recepcionera, datum } = ticket

                const sifraRecepcioneraFound = await this.prisma.recepcioner.findUnique({
                    where: {
                        id: sifra_recepcionera
                    }
                })

                const statusFound = await this.prisma.status.findUnique({
                    where: {
                        id: selectedStatusId
                    }
                })

                const sifraKampaFound = await this.prisma.kamp.findUnique({
                    where: {
                        id: sifraKampa
                    }
                })

                if (!sifraRecepcioneraFound) {
                    throw new BadRequestException('Recepcioner ne postoji!')
                }

                if (!sifraKampaFound) {
                    throw new BadRequestException('Sifra kampa ne postoji!')
                }

                if (!statusFound) {
                    throw new BadRequestException('Status ne postoji!')
                }

                if (sifra_smjestajne_jedinice.length > 3) {
                    throw new BadRequestException('Najvise se mogu izabrati 3 smještajne jedinice!')
                }

                let sifreArr = []

                sifra_smjestajne_jedinice.forEach(jedinica => {
                    sifreArr = [...sifreArr, jedinica.id]
                })

                const sifra_smjestajne_jediniceFound = await this.prisma.smjestajnaJedinica.findMany({
                    where: {
                        id: { in: sifreArr }
                    }
                })

                if (!sifra_smjestajne_jediniceFound) {
                    throw new BadRequestException('Ne postojece jedinice!')
                }

                const created = await this.prisma.ticket.create({
                    data: {
                        sifra_recepcionera: sifra_recepcionera,
                        sifra_kampa: sifraKampa,
                        status_ticketa: selectedStatusId,
                        datum_vrijeme: datum,
                        // @ts-ignore
                        n_sifra_smjestajne_jedinice: sifra_smjestajne_jedinice,
                        smjestajne_jedinice: {
                            connect: sifra_smjestajne_jedinice
                        }
                    }
                })

                if (created) {
                    return 'Ticket uspješno kreiran!'
                } else {
                    throw new BadRequestException('Dogodila se greška!')
                }
            } else {
                throw new BadRequestException('Nema sesije!')
            }
        } else {
            throw new BadRequestException('Nema sesije!')
        }
    }

    async deleteTicket(ticket) {
        const deleted = await this.prisma.ticket.delete({
            where: {
                id: ticket.id
            }
        })

        if (deleted) {
            return 'Ticket uspjesno izbrisan!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async editTicketDash(ticket) {
        const edited = await this.prisma.ticket.update({
            where: {
                id: ticket.id
            },
            data: {
                datum_vrijeme: ticket.editDatum,
                status_ticketa: ticket.editStatusId,
                sifra_recepcionera: ticket.editRecepcionerId
            }
        })

        if (edited) {
            return 'Ticket uspjesno uređen!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }

    async editTicket(ticket) {
        const edited = await this.prisma.ticket.update({
            where: {
                id: ticket.id
            },
            data: {
                datum_vrijeme: ticket.editDatum,
                status_ticketa: ticket.editStatusId,
                sifra_recepcionera: ticket.editRecepcionerId,
                sifra_kampa: ticket.editSifraKampa,
                // @ts-ignore
                n_sifra_smjestajne_jedinice: ticket.editSifra_smjestajne_jedinice,
                smjestajne_jedinice: {
                    connect: ticket.editSifra_smjestajne_jedinice
                }
            }
        })

        if (edited) {
            return 'Ticket uspjesno uređen!'
        } else {
            throw new BadRequestException('Dogodila se greska!')
        }
    }
}
