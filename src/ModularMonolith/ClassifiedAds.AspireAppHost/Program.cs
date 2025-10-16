﻿var builder = DistributedApplication.CreateBuilder(args);

var migrator = builder.AddProject<Projects.ClassifiedAds_Migrator>("ClassifiedAds-Migrator");
var background = builder.AddProject<Projects.ClassifiedAds_Background>("ClassifiedAds-Background");
var webApi = builder.AddProject<Projects.ClassifiedAds_WebAPI>("ClassifiedAds-WebAPI");

var identityServer = builder
    .AddExecutable("ClassifiedAds-IdentityServer", "dotnet", "../../IdentityServers/OpenIddict/ClassifiedAds.IdentityServer", "run", $"--urls=https://localhost:44367");

var webhook = builder.AddExternalService("Webhook", "https://ddddotnet-webhook-server.azurewebsites.net").WithHttpHealthCheck("");

builder.Build().Run();