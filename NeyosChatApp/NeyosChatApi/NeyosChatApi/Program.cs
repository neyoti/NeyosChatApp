using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NeyosChatApi.Data;
using NeyosChatApi.Hubs;
using NeyosChatApi.Models;
using NeyosChatApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddDbContext<UserProfileContext>(options =>
//options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
//ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddScoped<PasswordService>();
builder.Services.AddSingleton<FakeData>();
builder.Services.AddSingleton<OnlineUsersService>();
builder.Services.AddTransient<ConversationService>();

////Load URL from configuration
//var kestrelConfig = builder.Configuration.GetSection("Kestrel:Endpoints:Http:Url").Value;
//if (!string.IsNullOrEmpty(kestrelConfig))
//{
//    builder.WebHost.UseUrls(kestrelConfig);
//}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

builder.Services.AddSingleton<IDictionary<string, UserConn>>(options => new Dictionary<string, UserConn>());
builder.Services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
builder.Services.AddAWSService<IAmazonDynamoDB>();
builder.Services.AddScoped<IDynamoDBContext, DynamoDBContext>();
builder.Services.AddScoped<DynamoDbService>();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials();
});

app.UseHttpsRedirection();

app.MapControllers();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/chatportal");
});

app.Run();

