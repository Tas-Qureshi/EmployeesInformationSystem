using System.ComponentModel.DataAnnotations;

public class UpdateEmployeeRequest
{
    public int Id { get; set; }

    public required string Name { get; set; }
    public required string JobTitle { get; set; }
    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public required string Email { get; set; }
    public int PhoneNumber { get; set; }
    public required string EmploymentType { get; set; }
    public required int Salary { get; set; }
    public string? Location { get; set; }
    public required string DepartmentName { get; set; }    

}