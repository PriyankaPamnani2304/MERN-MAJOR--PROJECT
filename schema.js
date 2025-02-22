const Joi = require("joi");
module.exports .ListingSchema=Joi.object({
     title:Joi.string().required(),
     description:Joi.string().required(),
     location:Joi.string().required(),
     country:Joi.string().required(),
     price:Joi.number().required().min(0),
     image:Joi.string().allow("",null)
      }).required()
module.exports .ReviewSchema=Joi.object({
            comment:Joi.string().required(),
            rating:Joi.string().required()
             }).required()
       
