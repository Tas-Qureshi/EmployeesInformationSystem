using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace employeesRecord.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee(string? searchEmployee)
        {
            if (_context.Employee == null)
            {
                return NotFound();
            }
            var employees = await _context.Employee.Include(emp => emp.Department).ToListAsync();

            if (!string.IsNullOrEmpty(searchEmployee))
            {
                employees = employees.Where(emp => emp.Name.ToLower().Contains(searchEmployee.ToLower())).ToList();
            }
            return employees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if (_context.Employee == null)
            {
                return NotFound();
            }
            var employee = await _context.Employee.Include(emp => emp.Department).FirstOrDefaultAsync(emp => emp.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, UpdateEmployeeRequest updateEmployeeRequest)
        {
            var employeeFromDb = await _context.Employee.FirstOrDefaultAsync(emp => emp.Id == id);
            if (employeeFromDb == null)
            {
                return NotFound();
            }
            

            var department = await _context.Department.FirstOrDefaultAsync(dep => dep.Name.ToLower() == updateEmployeeRequest.DepartmentName.ToLower());
            if (department == null)
            {
                department = new Department { Name = updateEmployeeRequest.DepartmentName, Location = updateEmployeeRequest.Location };
                _context.Department.Add(department);
            }

            employeeFromDb.Name = updateEmployeeRequest.Name;
            employeeFromDb.JobTitle = updateEmployeeRequest.JobTitle;
            employeeFromDb.Email = updateEmployeeRequest.Email;
            employeeFromDb.PhoneNumber = updateEmployeeRequest.PhoneNumber;
            employeeFromDb.EmploymentType = updateEmployeeRequest.EmploymentType;
            employeeFromDb.Salary = updateEmployeeRequest.Salary;
            employeeFromDb.Location = updateEmployeeRequest.Location;
            employeeFromDb.Department = department;

            _context.Entry(employeeFromDb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(AddEmployeeRequest addEmployeeRequest)
        {
            var department = await _context.Department.FirstOrDefaultAsync(dep => dep.Name.ToLower() == addEmployeeRequest.DepartmentName!.ToLower());
            if (department == null)
            {
                department = new Department { Name = addEmployeeRequest.DepartmentName, Location = addEmployeeRequest.Location };
                _context.Department.Add(department);
            }
            var employee = new Employee()
            {
                Name = addEmployeeRequest.Name,
                JobTitle = addEmployeeRequest.JobTitle,
                Email = addEmployeeRequest.Email,
                PhoneNumber = addEmployeeRequest.PhoneNumber,
                EmploymentType = addEmployeeRequest.EmploymentType,
                Salary = addEmployeeRequest.Salary,
                Location = addEmployeeRequest.Location,

                Department = department
            };

            //   if (_context.Employee == null)
            //   {
            //       return Problem("Entity set 'ApplicationDbContext.Employee'  is null.");
            //   }
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employee == null)
            {
                return NotFound();
            }
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employee?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
