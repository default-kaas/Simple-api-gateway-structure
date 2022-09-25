using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Interfaces;
using Application.Services;
using Persistence.Repositories;
using Persistence.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string GetDatabasePath()
{
    var folder = Environment.SpecialFolder.LocalApplicationData;
    var path = Environment.GetFolderPath(folder);
    return System.IO.Path.Join(path, "authenticationSqliteDatabase.db");
}
// $"Data Source={GetDatabasePath()}"
// builder.Services.AddDbContext<DataContext>(options => options.UseSqlite($"Data Source={GetDatabasePath()}"));
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(GetDatabasePath()));
builder.Services.AddScoped<DbContext, DataContext>();
builder.Services.AddScoped<IRepository, JSONRepository>();
builder.Services.AddScoped<AuthServiceInterface, AuthService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/authenticate", async (HttpContext httpContext, [FromBody] AuthenticationRequest authenticationRequest, AuthServiceInterface authService) => {
    var result = await authService.Authenticate(authenticationRequest);
    if (result.HasError)
         return Results.Unauthorized();
    return Results.Ok(result);
});

app.MapGet("/api/permission-route1", () => {
    return "You have permission for route 1";
});

app.MapGet("/api/permission-route2", () => {
    return "You have permission for route 2";
});

app.MapGet("/api/permission-route3", () => {
    return "You have permission for route 3";
});

app.Run();