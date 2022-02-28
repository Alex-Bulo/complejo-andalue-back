const DOMAIN = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');
const { getProxAvail } = require('../helpers/dateHelper');


const productController = {

    getAllProductData : async (req, res) => {
        try {
            const product = req.params.id
            const needForProduct = product ? {id: { [Op.eq]: product }} : {}
  
            const prodInfo = await db.Product.findAll({
                attributes:['id', 'name', 'adults', 'kids', 'pets','color'],
                where: needForProduct,
                include:[

                    {
                        model: db.Image, as: 'mainImage',
                        required:true,
                        attributes: ['name']
                    },

                    {
                        model: db.Category, as: 'category',
                        required:true,
                        attributes:['name']
                    },

                    {
                        model: db.Feature, as: 'features',
                        attributes:['title', 'description', 'subcategory'], through:{attributes:[]},
                        include:[
                            {
                                model: db.Image, as: 'images',
                                attributes: ['name'], through:{attributes:[]},
                                
                            },
                            {
                                model: db.Icon, as: 'icon',
                                attributes:['icon'],required:true
                            }
                        ]
                    },
                    
                    {
                        model:db.Image, as:'images',required:true,
                        attributes:['name'], through:{required:true,attributes:[]}
                    },

                    {
                        model: db.Booking, as: 'bookings',
                        attributes: ['code', 'startDate', 'endDate'],
                        where: {cancelled: false},required:true
                    }


                ]
            })
            
  
  
            const info = prodInfo.map( cabin => {

                const cabinImagesAll = cabin.images.map(image => image.name)
                const featureImagesAll = cabin.features.map(feature => {
                    return feature.images.map(image => image.name)
                }).flat()

                let featureImages = cabinImagesAll.filter(image => featureImagesAll.indexOf(image) !== -1)

                return(
                    {
                        id:cabin.id,
                        name: cabin.name,
                        adults: cabin.adults,
                        kids: cabin.kids,
                        pets: cabin.pets,
                        color: cabin.color,
                        mainImage: `${DOMAIN}api/images/${cabin.mainImage.name}`,
                        category: cabin.category.name,
                        images: cabinImagesAll.map( image => `${DOMAIN}api/images/${image}`),
                        features: cabin.features.map( feature => {
                            const imagePerFeature = feature.images.filter(image => featureImages.indexOf(image.name) !== -1)

                            return(
                                {
                                    name: feature.title,
                                    description: feature.description,
                                    subcategory: feature.subcategory,
                                    icon: feature.icon.icon,
                                    images: imagePerFeature.map(image => `${DOMAIN}api/images/${image.name}`)
                                }
                            )
                        }),
                        bookings: cabin.bookings,
                        nextAvail: {
                            startDate: getProxAvail(cabin.bookings,undefined,undefined).startDate,
                            endDate: getProxAvail(cabin.bookings,undefined,undefined).endDate
                        }
                    }

                )    
                
            })
            
            
            res.status(200).json({
            meta:{

                status:'success',
                products: info.length,
                cabins: info.map(cabin => {return {name:cabin.name,id:cabin.id} })
            },
            data: info,
            // prodInfo
            })

  
        } catch (error) {
          console.log(error);
          res.status(500).json({
            meta:{
              status:'error',
            },
            errorMsg: error.message,
            error
          })
        }
            
      },
  

  }

  module.exports = productController