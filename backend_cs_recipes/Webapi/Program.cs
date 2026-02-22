using Core.Reposetories;
using Core.Services;
using Data;
using Data.Reposetories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Load connection string from User Secrets (dev) or env/appsettings (server)
builder.Configuration.AddUserSecrets<Program>(optional: true);

var connectionString = builder.Configuration.GetConnectionString("Connection");
if (string.IsNullOrWhiteSpace(connectionString))
    throw new InvalidOperationException("Connection string 'MyDB' is missing. Set it in User Secrets (ConnectionStrings:MyDB), or on the server use environment variable ConnectionStrings__MyDB or appsettings.Production.json.");
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(connectionString));
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

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DataContext>();
        context.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while creating the database.");
    }
}

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"
});

// Configure the HTTPS request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();

app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();
