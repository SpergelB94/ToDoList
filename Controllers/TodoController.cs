using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;
using ToDoList.Services;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _todoService;

        public ToDoController(ToDoService toDoService)
        {
            _todoService = toDoService;
        }

        [HttpGet]
        public ActionResult<List<Todo>> Get()
        {
            return _todoService.Get();
        }

        [HttpGet("{id:length(24)}", Name = "GetBook")]
        public ActionResult<Todo> Get(string id)
        {
            var todo = _todoService.Get(id);
            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        [HttpPost]
        public ActionResult<Todo> Create(Todo todo)
        {
            _todoService.Create(todo);

            return CreatedAtRoute("GetBook", new { id = todo.Id.ToString() }, todo);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Todo newTodo)
        {
            var todo = _todoService.Get(id);
            if (todo == null)
            {
                return NotFound();
            }

            _todoService.Update(id, newTodo);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var todo = _todoService.Get(id);
            if (todo == null)
            {
                return NotFound();
            }

            _todoService.Remove(id);
            return NoContent();
        }
    }
}
