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
    public class FriendsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FriendsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("Add/{user1}/{user2}")]

        public JsonResult Get(int user1,int user2)
        {
            Console.WriteLine("POST AUTH REQUEST");
            string query = @"INSERT INTO dbo.Friends VALUES (@user1ID,@user2ID)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@user1ID", user1);
                    myCommand.Parameters.AddWithValue("@user2ID", user2);
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
            string query = @"DELETE FROM dbo.friends WHERE user2ID=@ID";
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

        [HttpGet("{id:int}")]

        public JsonResult Get(int id)
        {
            Console.WriteLine("GET AUTH REQUEST");
            //string query = @"SELECT * FROM dbo.Friends WHERE user1ID=@ID";
            string query = @"SELECT * FROM dbo.Friends INNER JOIN Users ON user1ID=@ID AND Friends.user2ID= Users.ID; ";
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
            return new JsonResult(table);


        }
    }
}
