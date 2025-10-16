﻿using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Services.Notification.ConfigurationOptions;
using ClassifiedAds.Services.Notification.Entities;
using ClassifiedAds.Services.Notification.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddNotificationModule(this IServiceCollection services, AppSettings appSettings)
    {
        services.AddCaches(appSettings.Caching);

        services
            .AddDbContext<NotificationDbContext>(options => options.UseSqlServer(appSettings.ConnectionStrings.ClassifiedAds, sql =>
            {
                if (!string.IsNullOrEmpty(appSettings.ConnectionStrings.MigrationsAssembly))
                {
                    sql.MigrationsAssembly(appSettings.ConnectionStrings.MigrationsAssembly);
                }

                if (appSettings.ConnectionStrings.CommandTimeout.HasValue)
                {
                    sql.CommandTimeout(appSettings.ConnectionStrings.CommandTimeout);
                }
            }))
            .AddScoped<IRepository<EmailMessage, Guid>, Repository<EmailMessage, Guid>>()
            .AddScoped<IRepository<SmsMessage, Guid>, Repository<SmsMessage, Guid>>()
            .AddScoped(typeof(IEmailMessageRepository), typeof(EmailMessageRepository))
            .AddScoped(typeof(ISmsMessageRepository), typeof(SmsMessageRepository));

        services.AddMessageHandlers(Assembly.GetExecutingAssembly());

        services.AddNotificationServices(appSettings.Notification);

        return services;
    }

    public static void MigrateNotificationDb(this IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            serviceScope.ServiceProvider.GetRequiredService<NotificationDbContext>().Database.Migrate();
        }
    }
}
