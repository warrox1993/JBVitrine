﻿using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.Services.Product.Entities;

public class OutboxMessage : OutboxMessageBase, IAggregateRoot
{
}

public class ArchivedOutboxMessage : OutboxMessageBase, IAggregateRoot
{
}

public abstract class OutboxMessageBase : Entity<Guid>
{
    public string EventType { get; set; }

    public Guid TriggeredById { get; set; }

    public string ObjectId { get; set; }

    public string Payload { get; set; }

    public bool Published { get; set; }

    public string ActivityId { get; set; }
}
