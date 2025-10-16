﻿using ClassifiedAds.Contracts.Identity.Services;
using System;

namespace ClassifiedAds.Background.Identity;

public class CurrentUser : ICurrentUser
{
    public bool IsAuthenticated => false;

    public Guid UserId => Guid.Empty;
}
