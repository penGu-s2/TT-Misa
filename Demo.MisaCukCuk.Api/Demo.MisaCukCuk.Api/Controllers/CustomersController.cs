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
            var connectionString = "Host = 47.241.69.179;" + "Database = MISA.CukCuk_Demo_NVMANH;" + "User Id = dev;" + "Password = 12345678";
            
            // 2. Khởi tạo đối tượng kết nối với db:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM Customer";
            var customers = dbConnection.Query<Customer>(sqlCommand);

            // 4. Trả về cho client:
            return Ok(customers);
        }
    }
}
