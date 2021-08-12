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
using System.Text.RegularExpressions;

namespace Demo.MisaCukCuk.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        // <summary>
        /// Lấy danh sách Customer
        /// </summary>
        /// <returns>List Customers</returns>
        /// 
       
        [HttpGet()]
        public IActionResult GetCustomers()
        {
            try
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
                var response = StatusCode(200, customers);
                return response;
            }
            catch (Exception e)
            {

                var errObj = new
                {
                    devMsg = e.Message,
                    userMsg = Properties.Resources.Exception_Msg,
                    errorCode = "misa-001",
                    moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = ""
                };
                return StatusCode(500, errObj);
            }
           
        }
        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>số hàng đc thêm</returns>
        [HttpPost]
        public IActionResult InsertCustomer(Customer customer)
        {
            try
            {
                //Kiểm tra customercode
                if (customer.CustomerCode == "" || customer.CustomerCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = "CustomerCode is blank",
                        userMsg = "Mã khách hàng " + Properties.Resources.Blank,
                        errorCode = "misa-001",
                        moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = ""

                    };
                    return StatusCode(400, errorObj);
                }
                //Kiểm tra email

                bool isEmail = Regex.IsMatch(customer.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
                if (isEmail == false)
                {
                    var errorObj = new
                    {
                        devMsg = "CustomerEmail is not correct format",
                        userMsg = "Email " + Properties.Resources.Fail,
                        errorCode = "misa-001",
                        moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = ""

                    };
                    return StatusCode(400, errorObj);
                }
                //Truy cập vào database:
                // 1.Khai báo thông tin kết nối db
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
            catch (Exception ex)
            {
                var errObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_Msg,
                    errorCode = "misa-001",
                    moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = ""

                };
                return StatusCode(500, errObj);
            }
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo Id
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>Thông tin khách hàng</returns>

        [HttpGet("{customerId}")]
        public IActionResult GetCustomerById(string customerId)
        {
            try
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
                var sqlCommand = $"SELECT * FROM Customer WHERE CustomerId = @CustomerIdParam";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CustomerIdParam", customerId);
                var customer = dbConnection.QueryFirstOrDefault<Customer>(sqlCommand, param: parameters);

                // 4. Trả về cho client:
                // nếu không có khách hàng thì trả về 204
                if (customer != null)
                {
                    // nếu có khách hàng mã như thế thì trả về 200
                    var response = StatusCode(200, customer);

                    return response;
                }
                else
                {
                    return StatusCode(204);
                }
            }
            catch (Exception ex)
            {
                var errObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_Msg,
                    errorCode = "misa-001",
                    moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = ""

                };
                return StatusCode(500, errObj);
            }
        }

        /// <summary>
        /// Xóa khách hàng theo Id
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>Thông tin khách hàng</returns>
        [HttpDelete("{customerId}")]
        public IActionResult DeleteById(Guid customerId)
        {
            try
            {
                // Truy cập vào db:
                // 1. Khai báo thông tin kết nối db:
                var connectionString = "Host = 47.241.69.179;" +
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" +
                "Password = 12345678";

                // 2. Khởi tạo đối tượng kết nối với db:
                IDbConnection dbConnection = new MySqlConnection(connectionString);

                // 3. Truy vấn
                var sqlCommand = $"DELETE FROM Customer WHERE CustomerId = @CustomerIdParam";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CustomerIdParam", customerId);
                var customer = dbConnection.Execute(sqlCommand, param: parameters);
                var response = StatusCode(200, customer);
                return response;
            }
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_Msg,
                    errorCode = "misa-001",
                    moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = ""

                };
                return StatusCode(500, errorObj);
            }
           }
        /// <summary>
        /// Thêm mới một khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>số hàng đc thêm</returns>
        [HttpPut("{customerId}")]
        public IActionResult UpdateById(Guid customerId, [FromBody] Customer customer)
        {
            try
            {
                //Kiểm tra customercode
                if (customer.CustomerCode == "" || customer.CustomerCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = "CustomerCode is blank",
                        userMsg = "Mã khách hàng " + Properties.Resources.Blank,
                        errorCode = "misa-001",
                        moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = ""

                    };
                    return StatusCode(400, errorObj);
                }
                //Kiểm tra email

                bool isEmail = Regex.IsMatch(customer.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);
                if (isEmail == false)
                {
                    var errorObj = new
                    {
                        devMsg = "CustomerEmail is not correct format",
                        userMsg = "Email " + Properties.Resources.Fail,
                        errorCode = "misa-001",
                        moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = ""

                    };
                    return StatusCode(400, errorObj);
                }
                // Truy cập vào db:
                // 1. Khai báo thông tin kết nối db:
                var connectionString = "Host = 47.241.69.179;" +
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với db:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // Khai báo DynamicParam:
            var dynamicParam = new DynamicParameters();
            // 3. Thêm dữ liệu vào trong database:
            var columnsName = string.Empty;

            // Đọc từng property của object: 
            var properties = customer.GetType().GetProperties();

            //Duyệt từng property:
            foreach (var prop in properties)
            {
                // Lấy tên của prop:
                var propName = prop.Name;

                // Lấy value của prop:
                var propValue = prop.GetValue(customer);

                // Lấy kiểu dữ liệu của prop:
                var propType = prop.PropertyType;

                // Thêm Param tương ứng vs mỗi property:
                dynamicParam.Add($"@{propName}", propValue);

                columnsName += $"{propName} = @{propName},";
            }
            columnsName = columnsName.Remove(columnsName.Length - 1, 1);

            var sqlCommand = $"UPDATE Customer SET {columnsName} WHERE CustomerId = @CustomerId";

            var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

            var response = StatusCode(200, rowEffects);

            return Ok(response);
            }
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_Msg,
                    errorCode = "misa-001",
                    moreInfo = @"https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = ""

                };
                return StatusCode(500, errorObj);
            }
        }

    }
}
