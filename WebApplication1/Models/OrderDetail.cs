using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Models
{
    public class OrderDetail
    {
       
        [ForeignKey(name: "ProduktFG")]
        public virtual Product Product { get; set; }
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int OrderDetailId { get; set; }
        public int Price { get; set; }
        public int Units { get; set; }
       
    }
}