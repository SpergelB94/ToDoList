using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;
using ToDoList.Services;

namespace ToDoList.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoService _todoService;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="toDoService"></param>
        public ToDoController(ToDoService toDoService)
        {
            _todoService = toDoService;
        }
        /// <summary>
        /// Get items of TodoList
        /// </summary>
        /// <returns>List<Todo></returns>
        [HttpGet]
        public ActionResult<List<Todo>> Get()
        {
            return _todoService.Get();
        }
        /// <summary>
        /// Get Todo item by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Todo item</returns>
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
        /// <summary>
        /// Create Todo item
        /// </summary>
        /// <param name="todo"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<Todo> Create(Todo todo)
        {
            _todoService.Create(todo);

            return CreatedAtRoute("GetBook", new { id = todo.Id.ToString() }, todo);
        }
        /// <summary>
        /// Update existing todo item
        /// </summary>
        /// <param name="id"></param>
        /// <param name="newTodo"></param>
        /// <returns></returns>
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
        /// <summary>
        /// Delete Todo item
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
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
