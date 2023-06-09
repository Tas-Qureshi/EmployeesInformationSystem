using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContext") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContext' not found.")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContext") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContext' not found.")));
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();
// new files------------
app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();
// ------------

// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     SeedBogusData.Initialize(services);
// }

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();

//     app.UseCors(policy =>
//       {
//           policy.AllowAnyOrigin()
//                   .AllowAnyMethod()
//                   .AllowAnyHeader();  //set the allowed origin
//       });
// }

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(policy =>
  {
      policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();  //set the allowed origin
  });


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
