using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;
		private static readonly HttpClient _client = new HttpClient();
		private static readonly string _remoteUrl = "https://sagep-back1.azurewebsites.net";

        public TodoController(TodoContext context)
        {
            _context = context;

            if (_context.TodoItems.Count() == 0)
            {
                _context.TodoItems.Add(new TodoItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItem()
        {
            // return await _context.TodoItems.ToListAsync();
            var data = await _client.GetStringAsync($"{_remoteUrl}/api/Todo");
			return JsonConvert.DeserializeObject<List<TodoItem>>(data);
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            // var todoItem = await _context.TodoItems.FindAsync(id);
            //
            // if (todoItem == null)
            // {
            //     return NotFound();
            // }
            //
            // return todoItem;
            var data = await _client.GetStringAsync($"{_remoteUrl}/api/Todo/{id}");
			return Content(data, "application/json");
        }

        // PUT: api/Todo/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            // if (id != todoItem.Id)
            // {
            //     return BadRequest();
            // }
            //
            // _context.Entry(todoItem).State = EntityState.Modified;
            //
            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateConcurrencyException)
            // {
            //     if (!TodoItemExists(id))
            //     {
            //         return NotFound();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }
            //
            // return NoContent();
            var res = await _client.PutAsJsonAsync($"{_remoteUrl}/api/Todo/{id}", todoItem);
			return new NoContentResult();
        }

        // POST: api/Todo
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            // _context.TodoItems.Add(todoItem);
            // await _context.SaveChangesAsync();
            //
            // return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
System.Console.WriteLine( ">POST1" );
            var response = await _client.PostAsJsonAsync($"{_remoteUrl}/api/Todo", todoItem);
System.Console.WriteLine( $">POST2 {_remoteUrl}/api/Todo" );
			var data = await response.Content.ReadAsStringAsync();
System.Console.WriteLine( $">POST3 {data}" );
			return Content(data, "application/json");
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        {
            // var todoItem = await _context.TodoItems.FindAsync(id);
            // if (todoItem == null)
            // {
            //     return NotFound();
            // }
            //
            // _context.TodoItems.Remove(todoItem);
            // await _context.SaveChangesAsync();
            //
            // return todoItem;
            var res = await _client.DeleteAsync($"{_remoteUrl}/api/Todo/{id}");
			return new NoContentResult();
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
