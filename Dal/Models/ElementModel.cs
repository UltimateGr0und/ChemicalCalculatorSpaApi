using System;
using System.Collections.Generic;

namespace Dal.Models;

public enum ElementType
{
    s,
    p,
    d,
    f,
    n
}

public partial class ElementModel
{
    public int Id { get; set; }

    public long AtomicNumber { get; set; }

    public float? Eleckronegativity { get; set; }

    public long Mass { get; set; }

    public string Name { get; set; } = null!;

    public string Formula { get; set; } = null!;

    public ElementType ElementType { get; set; }
}
