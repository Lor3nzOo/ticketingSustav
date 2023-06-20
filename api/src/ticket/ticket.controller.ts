import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get("allTickets")
  async getAllTickets() {
    return this.ticketService.getAllTickets()
  }

  @Get("/one/:id")
  async getTicket(@Param('id') id) {
    return this.ticketService.getTicket(id)
  }

  @Get("allJedinice")
  async getAllJedinice() {
    return this.ticketService.getAllJedinice()
  }

  @Get("allStatus")
  async getAllStatus() {
    return this.ticketService.getAllStatus()
  }

  @Get("allKampovi")
  async getAllKampovi() {
    return this.ticketService.getAllKampovi()
  }

  @Post("addJedinica")
  async addJedinica(@Body() jedinica, @Req() req) {
    return this.ticketService.addJedinica(jedinica, req)
  }

  @Post("deleteJedinica")
  async deleteJedinica(@Body() jedinica) {
    return this.ticketService.deleteJedinica(jedinica)
  }

  @Post("editJedinica")
  async editJedinica(@Body() jedinica) {
    return this.ticketService.editJedinica(jedinica)
  }

  @Post("addStatus")
  async addStatus(@Body() jedinica, @Req() req) {
    return this.ticketService.addStatus(jedinica, req)
  }

  @Post("deleteStatus")
  async deleteStatus(@Body() jedinica) {
    return this.ticketService.deleteStatus(jedinica)
  }

  @Post("editStatus")
  async editStatus(@Body() jedinica) {
    return this.ticketService.editStatus(jedinica)
  }

  @Post("addKamp")
  async addKamp(@Body() kamp, @Req() req) {
    return this.ticketService.addKamp(kamp, req)
  }

  @Post("deleteKamp")
  async deleteKamp(@Body() kamp) {
    return this.ticketService.deleteKamp(kamp)
  }

  @Post("editKamp")
  async editKamp(@Body() kamp) {
    return this.ticketService.editKamp(kamp)
  }

  @Post("addTicket")
  async addTicket(@Body() ticket, @Req() req) {
    return this.ticketService.addTicket(ticket, req)
  }

  @Post("addTicketRecepcioner")
  async addTicketRecepcioner(@Body() ticket, @Req() req) {
    return this.ticketService.addTicketRecepcioner(ticket, req)
  }

  @Post("deleteTicket")
  async deleteTicket(@Body() ticket) {
    return this.ticketService.deleteTicket(ticket)
  }

  @Post("editTicketDash")
  async editTicketDash(@Body() ticket) {
    return this.ticketService.editTicketDash(ticket)
  }

  @Post("editTicket")
  async editTicket(@Body() ticket) {
    return this.ticketService.editTicket(ticket)
  }
}
