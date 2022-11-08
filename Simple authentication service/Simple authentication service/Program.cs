using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Application.Services.Interfaces;
using Application.Services;
using Persistence.Repositories;
using Persistence.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string GetDatabasePath()
{
    var folder = Environment.SpecialFolder.LocalApplicationData;
    var path = Environment.GetFolderPath(folder);
    return $"Data Source={System.IO.Path.Join(path, "authenticationSqliteDatabase.db")}";
}
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(GetDatabasePath()));
builder.Services.AddScoped<DbContext, DataContext>();
builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddScoped<AuthServiceInterface, AuthService>();

var app = builder.Build();

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

app.Run();