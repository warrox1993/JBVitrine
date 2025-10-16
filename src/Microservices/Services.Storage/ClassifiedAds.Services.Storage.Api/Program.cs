﻿using ClassifiedAds.Infrastructure.Logging;
using ClassifiedAds.Infrastructure.Monitoring;
using ClassifiedAds.Infrastructure.Web.ExceptionHandlers;
using ClassifiedAds.Services.Storage.ConfigurationOptions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Polly;
using Swashbuckle.AspNetCore.SwaggerUI;
using System;
using System.Collections.Generic;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;
var configuration = builder.Configuration;

builder.WebHost.UseClassifiedAdsLogger(configuration =>
{
    return new LoggingOptions();
});

var appSettings = new AppSettings();
configuration.Bind(appSettings);

services.Configure<AppSettings>(configuration);

appSettings.ConnectionStrings.MigrationsAssembly = Assembly.GetExecutingAssembly().GetName().Name;

services.AddMonitoringServices(appSettings.Monitoring);

services.AddExceptionHandler<GlobalExceptionHandler>();

services.AddControllers(configure =>
{
})
.ConfigureApiBehaviorOptions(options =>
{
})
.AddJsonOptions(options =>
{
});

services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", builder => builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

services.AddDateTimeProvider();
services.AddApplicationServices();

services.AddStorageModule(appSettings);
services.AddHostedServicesStorageModule();

services.AddAuthentication(options =>
{
    options.DefaultScheme = appSettings.Authentication.Provider switch
    {
        "Jwt" => "Jwt",
        _ => JwtBearerDefaults.AuthenticationScheme
    };
})
.AddJwtBearer(options =>
{
    options.Authority = appSettings.Authentication.IdentityServer.Authority;
    options.Audience = appSettings.Authentication.IdentityServer.Audience;
    options.RequireHttpsMetadata = appSettings.Authentication.IdentityServer.RequireHttpsMetadata;
})
.AddJwtBearer("Jwt", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = appSettings.Authentication.Jwt.IssuerUri,
        ValidAudience = appSettings.Authentication.Jwt.Audience,
        TokenDecryptionKey = new X509SecurityKey(appSettings.Authentication.Jwt.TokenDecryptionCertificate.FindCertificate()),
        IssuerSigningKey = new X509SecurityKey(appSettings.Authentication.Jwt.IssuerSigningCertificate.FindCertificate()),
    };
});

services.AddSwaggerGen(setupAction =>
{
    setupAction.SwaggerDoc(
        $"ClassifiedAds",
        new OpenApiInfo()
        {
            Title = "ClassifiedAds API",
            Version = "1",
            Description = "ClassifiedAds API Specification.",
            Contact = new OpenApiContact
            {
                Email = "abc.xyz@gmail.com",
                Name = "Phong Nguyen",
                Url = new Uri("https://github.com/phongnguyend"),
            },
            License = new OpenApiLicense
            {
                Name = "MIT License",
                Url = new Uri("https://opensource.org/licenses/MIT"),
            },
        });

    setupAction.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Description = "Input your Bearer token to access this API",
    });

    setupAction.AddSecurityDefinition("Oidc", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                TokenUrl = new Uri(appSettings.Authentication.IdentityServer.Authority + "/connect/token", UriKind.Absolute),
                AuthorizationUrl = new Uri(appSettings.Authentication.IdentityServer.Authority + "/connect/authorize", UriKind.Absolute),
                Scopes = new Dictionary<string, string>
                {
                            { "openid", "OpenId" },
                            { "profile", "Profile" },
                            { "ClassifiedAds.WebAPI", "ClassifiedAds WebAPI" },
                },
            },
            ClientCredentials = new OpenApiOAuthFlow
            {
                TokenUrl = new Uri(appSettings.Authentication.IdentityServer.Authority + "/connect/token", UriKind.Absolute),
                Scopes = new Dictionary<string, string>
                {
                            { "ClassifiedAds.WebAPI", "ClassifiedAds WebAPI" },
                },
            },
        },
    });

    setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Oidc",
                },
            }, new List<string>()
        },
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer",
                },
            }, new List<string>()
        },
    });
});

services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Configure the HTTP request pipeline.
var app = builder.Build();

Policy.Handle<Exception>().WaitAndRetry(new[]
{
    TimeSpan.FromSeconds(10),
    TimeSpan.FromSeconds(20),
    TimeSpan.FromSeconds(30),
})
.Execute(() =>
{
    app.MigrateStorageDb();
});

if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseExceptionHandler(options => { });

app.UseRouting();

app.UseCors("AllowAnyOrigin");

app.UseSwagger();

app.UseSwaggerUI(setupAction =>
{
    setupAction.OAuthClientId("Swagger");
    setupAction.OAuthClientSecret("secret");
    setupAction.OAuthUsePkce();

    setupAction.SwaggerEndpoint(
        "/swagger/ClassifiedAds/swagger.json",
        "ClassifiedAds API");

    setupAction.RoutePrefix = string.Empty;

    setupAction.DefaultModelExpandDepth(2);
    setupAction.DefaultModelRendering(ModelRendering.Model);
    setupAction.DocExpansion(DocExpansion.None);
    setupAction.EnableDeepLinking();
    setupAction.DisplayOperationId();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
