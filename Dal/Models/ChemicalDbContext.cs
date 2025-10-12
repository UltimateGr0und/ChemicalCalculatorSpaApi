using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class ChemicalDbContext : DbContext
{
    public ChemicalDbContext()
    {
    }

    public ChemicalDbContext(DbContextOptions<ChemicalDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ElementModel> ElementModels { get; set; }
    public async Task<ElementModel> TryFindElementModelByAtomicNumberAsync(int AtomicNumber)
    {
        return await ElementModels.SingleAsync(el => el.AtomicNumber==AtomicNumber);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ElementModel>(entity =>
        {
            entity.Property(e => e.Formula).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
