using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Demo.MisaCukCuk.Api.Model;

namespace Demo.MisaCukCuk.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        //GET, POST, PUT, DELETE
        [HttpGet()]
        public IActionResult GetCustomers()
        {
            // Truy cập vào db:
            // 1. Khai báo thông tin kết nối db:
            var connectionString = "Host = 47.241.69.179;" + 
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" + 
                "Password = 12345678";
            
            // 2. Khởi tạo đối tượng kết nối với db:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM Customer";
            var customers = dbConnection.Query<Customer>(sqlCommand);

            // 4. Trả về cho client:
            return Ok(customers);
        }
        [HttpPost]
        public IActionResult InsertCustomer(Customer customer)
        {
            //Truy cập vào database:
            // 1.Khai báo đối tượng
            var connectionString = "Host = 47.241.69.179;" +
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" +
                "Password = 12345678";
            // 2.Khởi tạo đối tượng kết nối với database
            IDbConnection dbConnection = new MySqlConnection(connectionString);
            //khai báo dynamicParam:
            var dynamicParam = new DynamicParameters();

            // 3.Thêm dữ liệu vào database
            var columnsName = string.Empty;
            var columnsParam = string.Empty;

            //Đọc từng property của object:
            var properties = customer.GetType().GetProperties();


            //Duyệt từng property:
            foreach (var prop in properties)
            {
                //lấy tên của prop:
                var propName = prop.Name;

                //Lấy value của prop:
                var propValue = prop.GetValue(customer);

                //Lấy kiểu dữ liệu của prop:
                var propType = prop.PropertyType;

                //thêm param tương ứng với mỗi property của đối tượng
                dynamicParam.Add($"@{propName}", propValue);

                columnsName += $"@{propName},";
                columnsParam += $"@{propName},";
            }
            columnsName = columnsName.Remove(columnsName.Length - 1, 1);
            columnsParam = columnsParam.Remove(columnsParam.Length - 1, 1);
            var sqlCommand = $"INSERT INTO Customer({columnsName}) VALUES({columnsParam}) ";

            // Trả về cho client

            var response = StatusCode(200, customer);
            return response;
        }
    }
}
