const DOMAIN = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');


const featureController = {

  getAllFeatureData : async(req, res) =>{
    try {
      
      const feature = req.params.id
      const needForFeature = feature ? {id: { [Op.eq]: feature }} : {}

      const featureInfo = await db.Feature.findAll({
          attributes:['title', 'description', 'subcategory'],
          where: needForFeature,
          include:[
              {
                  model: db.Image, as: 'images',
                  attributes: ['name'], through:{attributes:[]},
                  include:[
                    {model: db.Category, as:'categories', attributes:['name'], through:{attributes:[]}},
                    {model: db.Product, as:'products', attributes:['name'], through:{attributes:[]}}
                  ]
              },
              {
                  model: db.Icon, as: 'icon',
                  attributes:['icon']
              }
          ]
      })
      

      const info = featureInfo.map( feature => {
        return {
          title: feature.title,
          description: feature.description,
          subcategory: feature.subcategory,
          icon: feature.icon.icon,
          images: feature.images.map(image => {
            return {
              name: image.name,
              categories: image.categories.map(cat => cat.name),
              products: image.products.map(prod => prod.name),

            }
          })

        }


      })

      res.status(200).json({
        meta:{
          status:'success',
          count: info.length,
          featureID: feature ? feature : 'all',
          feature: feature ? info[0].title : 'all'
        },
        data: info,
      // featureInfo
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

  getCategoryFeatureData : async(req, res) =>{
    try {
      
      const category = req.params.id
      const needForCategory = category ? {id: { [Op.eq]: category }} : {}

      const featureInfo = await db.Feature.findAll({
          attributes:['title', 'description', 'subcategory'],
          include:[
            {
              model: db.Category, as: 'categories',
              attributes: ['name'], where:needForCategory, through:{attributes:[]},
            },

            {
                model: db.Image, as: 'images',
                attributes: ['name'], through:{attributes:[]},
                include:[
                  {model: db.Category, as:'categories', attributes:['name'], through:{attributes:[]}},
                  {model: db.Product, as:'products', attributes:['name'], through:{attributes:[]}}
                ]
            },
            {
                model: db.Icon, as: 'icon',
                attributes:['icon']
            }
          ]
      })
      if (featureInfo.length === 0){
        throw new Error('Category not found')
      }

      const info = featureInfo.map( feature => {
        return {
          title: feature.title,
          description: feature.description,
          subcategory: feature.subcategory,
          icon: feature.icon.icon,
          images: feature.images.map(image => {
            return {
              name: image.name,
              categories: image.categories.map(cat => cat.name),
              products: image.products.map(prod => prod.name),

            }
          })

        }


      })

      res.status(200).json({
        meta:{
          status:'success',
          count: info.length,
          categoryID: category ? category : 'all',
          category: category ? featureInfo[0].categories[0].name : 'all'
        },
        data: info,
      // featureInfo
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

  getProductFeatureData : async(req, res) =>{
    try {
      
      const product = req.params.id
      const needForProduct = product ? {id: { [Op.eq]: product }} : {}

      const featureInfo = await db.Feature.findAll({
          attributes:['title', 'description', 'subcategory'],
          include:[
            {
              model: db.Product, as: 'products',
              attributes: ['name'], where:needForProduct, through:{attributes:[]},
            },

            {
                model: db.Image, as: 'images',
                attributes: ['name'], through:{attributes:[]},
                include:[
                  {model: db.Category, as:'categories', attributes:['name'], through:{attributes:[]}},
                  {model: db.Product, as:'products', attributes:['name'], through:{attributes:[]}}
                ]
            },
            {
                model: db.Icon, as: 'icon',
                attributes:['icon']
            }
          ]
      })
      if (featureInfo.length === 0){
        throw new Error('Category not found')
      }

      const info = featureInfo.map( feature => {
        return {
          title: feature.title,
          description: feature.description,
          subcategory: feature.subcategory,
          icon: feature.icon.icon,
          images: feature.images.map(image => {
            return {
              name: image.name,
              categories: image.categories.map(cat => cat.name),
              products: image.products.map(prod => prod.name),

            }
          })

        }


      })

      res.status(200).json({
        meta:{
          status:'success',
          count: info.length,
          productID: product ? product : 'all',
          product: product ? featureInfo[0].products[0].name : 'all'
        },
        data: info,
      // featureInfo
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
    
  featuresByCategory : async (req, res) => {
      try {

        const category = req.params.id
        const needForCategory = category ? {idCategory: { [Op.eq]: category }} : {}

        const featureByCatInfo = await db.Feature.findAll({
            attributes:['title', 'description', 'subcategory'],
            include:[
                {
                    model: db.Category, as: 'categories',
                    attributes: ['name'], through:{where: needForCategory, attributes:[]},
                },
                {
                    model: db.Image, as: 'images',
                    attributes: ['name'], through:{attributes:[]},
                },
                {
                    model: db.Icon, as: 'icon',
                    attributes:['icon']
                }
            ]
        })



        const info ={
            categoryID: category,
            category: [... new Set( featureByCatInfo.map(feature => feature.category.name) ) ],
            features: [... new Set( featureByCatInfo.map(feature => feature.title) ) ],
            detail : featureByCatInfo.map( feature => {
                
                const detailInfo = {
                  name: feature.title,
                  description: feature.description,
                  category: feature.category.name,
                  subcategory: feature.subcategory,
                  icon: feature.icon.icon,
                  images: feature.images.map(image => `${DOMAIN}images/${image.name}`)
                } 
                
                return detailInfo
              })
            }

            res.status(200).json({
              meta:{
                status:'success',
                features: info.features.length,
                categories: info.category.length
              },
              data: info,
            // featureByCatInfo
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

  featuresByProduct : async (req, res) => {
      try {

        const product = req.params.id
        const needForProduct = product ? {idProduct: { [Op.eq]: product }} : {}

        const featureByProdInfo = await db.Feature.findAll({
            attributes:['title', 'description', 'subcategory'],
            include:[
                {
                    model: db.Product, as: 'products',
                    attributes: ['name'], through:{where: needForProduct, attributes:[]},
                    
                },
                {
                    model: db.Image, as: 'images',
                    attributes: ['name'], through:{attributes:[]},
                },
                {
                    model: db.Icon, as: 'icon',
                    attributes:['icon']
                }
            ]
        })
      //   console.log(featureByProdInfo);


        const info ={
            productID: product,
            product: [... new Set( featureByProdInfo.map(feature => feature.products.name) ) ],
            features: [... new Set( featureByProdInfo.map(feature => feature.title) ) ],
            detail : featureByProdInfo.map( feature => {
                
                const detailInfo = {
                  name: feature.title,
                  description: feature.description,
                  product: feature.products.name,
                  icon: feature.icon.icon,
                  images: feature.images.map(image => `${DOMAIN}images/${image.name}`)
                } 
                
                return detailInfo
              })
            }
          
          res.status(200).json({
          meta:{
              status:'success',
            features: info.features.length,
            products: info.product.length
          },
          data: info,
          // featureByProdInfo
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

  module.exports = featureController