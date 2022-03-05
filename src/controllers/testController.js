const {RES_URL} = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');

const testController = {
    
  test : async (req, res) => {

    try {
      const category = req.params.id
      const needForCategory = category ? {id: { [Op.eq]: category }} : {}

      const testInfo = await db.Product.findAll({
        attributes:['id', 'name'],
        where: needForCategory,
        include: [
          {
            model:db.Image, as:'mainImage'
          }
        ]
      
      })
    
            
      res.status(200).json({
          meta:{
            status:'success',
            // count: info.images.length,
            // categories: info.category.length
          },
          data: testInfo,
          // imageInfoInCategory
          
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

  imagesByCategoryFeaturesOnly : async (req, res) => {
    try {

      const category = req.params.id
        const categoryInfo = await db.Category.findByPk(category,{
          attributes:['name']
        })
          const imageInfoByCatAndFeature = await db.FeatureImage.findAll({
            attributes:['id'],
            include: [
              {
                model:db.Feature, as:'features',
                where: {idCategory: { [Op.eq]: category }},
                attributes:['title', 'description'],
                include: [
                  {
                    model:db.Icon, as:'icon',
                    attributes:['icon']
                  },
                  {
                    model:db.Product, as:'products',
                    attributes:['name']
                  }
                    
                ]
              },
              {
                model:db.Image, as:'images', attributes:['name']
              }
            ],
            
          })
          const info ={
            categoryID: category,
            category: categoryInfo.name,
            images: imageInfoByCatAndFeature.map( feature => `${RES_URL}images/${feature.images.name}`),
            
            detail : imageInfoByCatAndFeature.map( feature => {
              
              const detail = {
                name: feature.features.title,
                description: feature.features.description,
                icon: feature.features.icon.icon,
                image: `${RES_URL}images/${feature.images.name}`
              } 
              
              return detail
            })
          }

          res.status(200).json({
            meta:{
              status:'success',
              count: info.images.length,
              features: info.detail.length
            },
            data: info,
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

  Feattest : async (req, res) => {

    try {
      const category = req.params.id
      const needForCategory = category ? {id: { [Op.eq]: category }} : {}

      const testInfo = await db.Category.findAll({
        attributes:['id', 'name'],
        where: needForCategory,
        include: [
          {
            model:db.Feature, as:'features', through:{attributes:[]}
          }
        ]
      
      })
    
            
      res.status(200).json({
          meta:{
            status:'success',
            // count: info.images.length,
            // categories: info.category.length
          },
          data: testInfo,
          // imageInfoInCategory
          
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


  module.exports = testController