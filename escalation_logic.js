if (ticket.timeElapsed > SLA_LIMIT) {
    ticket.status = "Escalated";
    console.log("Ticket " + ticket.id + " has been escalated!");
}