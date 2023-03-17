using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Employee
{
    [Key]
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string JobTitle { get; set; }
    public required string Email { get; set; }
    public int PhoneNumber { get; set; }
    public required string EmploymentType { get; set; }
    public required int Salary { get; set; }

    public string? Location { get; set; }

    [ForeignKey("DepartmentId")]
    public int? DepartmentId { get; set; } 
    public virtual Department? Department { get; set; }

    
}