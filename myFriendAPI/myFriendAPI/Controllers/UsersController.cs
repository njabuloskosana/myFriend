using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using myFriendAPI.Models;
using System;
using System.Data;
using System.Data.SqlClient;

namespace myFriendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //api to get all data from department table

        [HttpGet]

        public JsonResult Get()
        {
            Console.WriteLine("GET AUTH REQUEST");
            string query = @"SELECT * FROM dbo.Users";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                   
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);


        }

        
        [HttpPost]

        public JsonResult Post(User user)
        {
            Console.WriteLine("POST AUTH REQUEST");
            string query = @"INSERT INTO dbo.Users VALUES (@UsersName,@UsersSurname,@UsersEmail,@UsersPassword)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UsersName", user.UsersName);
                    myCommand.Parameters.AddWithValue("@UsersSurname", user.UsersSurname);
                    myCommand.Parameters.AddWithValue("@UsersEmail", user.UsersEmail);
                    myCommand.Parameters.AddWithValue("@UsersPassword", user.UsersPassword);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");


        }

        [HttpDelete("{id:int}")]

        public JsonResult Delete(int id)
        {
            Console.WriteLine("DELETE REQUEST");
            string query = @"DELETE FROM dbo.Users WHERE ID=@ID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ID", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Successfully Removed");


        }
    }
}
