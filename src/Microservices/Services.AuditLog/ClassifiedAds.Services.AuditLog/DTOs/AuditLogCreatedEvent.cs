﻿using ClassifiedAds.Domain.Infrastructure.Messaging;
using ClassifiedAds.Services.AuditLog.Entities;

namespace ClassifiedAds.Services.AuditLog.DTOs;

public class AuditLogCreatedEvent : IMessageBusEvent
{
    public AuditLogEntry AuditLog { get; set; }
}
