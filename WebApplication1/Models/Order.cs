using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webshop.Models
{
    public class Order
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
//        public int UserId { get; set; }
        public DateTime Date { get; set; }


        [ForeignKey(name: "OrderDetailsFG")]
        public virtual List<OrderDetail> OrderDetailList { get; set; }
    }
}