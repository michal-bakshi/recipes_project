using Core.Reposetories;
using Core.Services;
using Data;
using Data.Reposetories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyDB")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserReposetory, UserReposetory>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddScoped<IRecipereposetory, RecipeReposetory>();
builder.Services.AddScoped<IRecipeService, RecipeService>();

builder.Services.AddScoped<IIngredientsReposetory, IngredientReposetory>();
builder.Services.AddScoped<IIngredientsService, IngredientsService>();

builder.Services.AddScoped<IIngredientsForRecipeReposetory, IngredientsForRecipeReposetory>();
builder.Services.AddScoped<IIngredientsForRecipeService, IngredientsForRecipeService>();

builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    option.JsonSerializerOptions.WriteIndented = true;
  });


// TODO: In production, replace AllowAnyOrigin() with specific origins for security
// Example: .WithOrigins("https://yourdomain.com")
builder.Services.AddCors(option =>
{
    option.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

// Configure the HTTPS request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
