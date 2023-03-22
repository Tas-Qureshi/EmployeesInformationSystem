using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
// protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//    {
//        var configuration = new ConfigurationBuilder().AddUserSecrets<Program>().Build();
//        optionsBuilder.UseSqlServer(configuration.GetSection("ConnectionStrings:ApplicationDbContext").Value);
//    }

        public DbSet<Employee> Employee { get; set; } = default!;

        public DbSet<Department> Department { get; set; } = default!;
    }
