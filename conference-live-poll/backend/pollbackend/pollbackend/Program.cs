using Marketing.SignalRHub;

namespace pollbackend;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddSwaggerGen();

        builder.Services.AddSignalR();
        builder.Services.AddSingleton<ISignalRService, SignalRService>();

        // Add services to the container.
        builder.Services.AddControllersWithViews();
        

        // CORS is handled at the platform level (ex: Azure Container Apps)
        const string AllowAllCorsOrigin = "AllowAllCorsOrigin";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(AllowAllCorsOrigin, builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });

        var app = builder.Build();
        app.UseCors(AllowAllCorsOrigin);

        app.UseStaticFiles();
        app.UseRouting();
        app.UseAuthorization();

        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.MapHub<ArticleHub>("/articlehub");

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        });

        

        app.Run();
    }
}
