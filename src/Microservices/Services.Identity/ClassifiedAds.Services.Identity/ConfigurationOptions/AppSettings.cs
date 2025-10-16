﻿using ClassifiedAds.Infrastructure.Caching;
using ClassifiedAds.Infrastructure.Interceptors;
using ClassifiedAds.Infrastructure.Logging;
using ClassifiedAds.Infrastructure.Monitoring;
using ClassifiedAds.Infrastructure.Notification;
using ClassifiedAds.Services.Identity.IdentityProviders.Auth0;
using ClassifiedAds.Services.Identity.IdentityProviders.Azure;
using CryptographyHelper.Certificates;

namespace ClassifiedAds.Services.Identity.ConfigurationOptions;

public class AppSettings
{
    public ConnectionStrings ConnectionStrings { get; set; }

    public LoggingOptions Logging { get; set; }

    public CachingOptions Caching { get; set; }

    public MonitoringOptions Monitoring { get; set; }

    public AuthenticationOptions Authentication { get; set; }

    public NotificationOptions Notification { get; set; }

    public InterceptorsOptions Interceptors { get; set; }

    public IdentityProvidersOptions Providers { get; set; }
}

public class ConnectionStrings
{
    public string ClassifiedAds { get; set; }

    public string MigrationsAssembly { get; set; }

    public int? CommandTimeout { get; set; }
}

public class AuthenticationOptions
{
    public string Provider { get; set; }

    public IdentityServerOptions IdentityServer { get; set; }

    public JwtOptions Jwt { get; set; }
}

public class IdentityServerOptions
{
    public string Authority { get; set; }

    public string Audience { get; set; }

    public bool RequireHttpsMetadata { get; set; }
}

public class JwtOptions
{
    public string IssuerUri { get; set; }

    public string Audience { get; set; }

    public CertificateOption TokenDecryptionCertificate { get; set; }

    public CertificateOption IssuerSigningCertificate { get; set; }
}

public class IdentityProvidersOptions
{
    public Auth0Options Auth0 { get; set; }

    public AzureAdB2COptions AzureActiveDirectoryB2C { get; set; }
}
