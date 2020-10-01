using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using ToDoList.Models;

namespace ToDoList.Services
{
    public class ToDoService
    {
        private readonly IMongoCollection<Todo> _todos;

        public ToDoService(IConfiguration config)
        {

            var client = new MongoClient(config.GetConnectionString("ToDoDb"));

            var database = client.GetDatabase("ToDoList");

            _todos = database.GetCollection<Todo>("Todos");
        }

        public List<Todo> Get()
        {
            return _todos.Find(todo => true).ToList();
        }

        public Todo Get(string id)
        {
            return _todos.Find(todo => todo.Id == id).FirstOrDefault();
        }

        public Todo Create(Todo todo)
        {
            _todos.InsertOne(todo);
            return todo;
        }

        public void Update(string id, Todo newtodo)
        {
            _todos.ReplaceOne(todo => todo.Id == id, newtodo);
        }

        public void Remove(string id)
        {
            _todos.DeleteOne(todo => todo.Id == id);
        }
        public void Remove(Todo oldTodo)
        {
            _todos.DeleteOne(todo => todo.Id == oldTodo.Id);
        }
    }
}
