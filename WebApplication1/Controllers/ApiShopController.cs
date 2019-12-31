using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Webshop.Models;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiShopController : ControllerBase
    {
        private readonly UserContext _context;
        private IHostingEnvironment _appEnvironment;

        public ApiShopController(UserContext context, IHostingEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
            _context = context;
        }

        // GET: api/ApiShop
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.Product.ToListAsync();
        }

        // GET: api/ApiShop/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/ApiShop/5
        [HttpPut("{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return await _context.Product.ToListAsync();
        }


        // Get: api/ApiShop/login/{username}/{password}

        [HttpGet("login/{username}/{password}")]
        public async Task<ActionResult<User>> login(string username, string password)
        {



            List<User> list = _context.User.ToList();
            foreach (var user in list)
            {
                if (user.UserName.Equals(username) && user.Password.Equals(password))
                {

                    if (user == null)
                    {
                        return NotFound();
                    }

                    return user;
                }
            }

            return NotFound();

        }


        // POST: api/ApiShop/UploadImage

        [HttpPost("UploadImage"), DisableRequestSizeLimit]
        public async Task<ActionResult<bool>> UploadImage([FromForm(Name = "file")] IFormFile file)
        {



            await _context.SaveChangesAsync();
            return true;
        }


        [HttpPost("placeorder/{userId}")]
        public async Task<ActionResult> placeorder(Cart cart, int userId)
        {
            try
            {
                User u = _context.User.Find(userId);
                using (var c = _context)
                {
                    var order = new Order();
                    order.OrderDetailList = new List<OrderDetail>();
                    cart.orderDetails.ForEach(sa => order.OrderDetailList.Add(
                        new OrderDetail()
                        {
                            Product = _context.Product.Find(sa.Product.ProductId),
                            Price = sa.Price,
                            Units = sa.Units
                        }

                        ));
                    order.Date = System.DateTime.Today;
                    u.OrderList.Add(order);
                    c.Update(u);
                    await c.SaveChangesAsync();
                }
                return StatusCode(201);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }




        // POST: api/ApiShop
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Product>>> PostProduct(Product product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
            return await _context.Product.ToListAsync();
        }

        // DELETE: api/ApiShop/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> DeleteProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Product.Remove(product);
            await _context.SaveChangesAsync();

            return await _context.Product.ToListAsync();
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.ProductId == id);
        }
    }
}
