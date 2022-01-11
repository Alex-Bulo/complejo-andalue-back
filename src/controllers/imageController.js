const DOMAIN = require('../helpers/config')
const { Op } = require('sequelize');
const db = require('../database/models');


const imageController = {
    
    getAllImageData : async (req, res) => {
      try {
        const imageID = req.params.id
        const needForImage = imageID ? {id: { [Op.eq]: imageID }} : {}


          const imageInfo = await db.Image.findAll({
              attributes:['id', 'name'],
              where: needForImage,
              include: [
                {
                  model:db.Product, as:'products', attributes:['id','name'], through:{attributes:[]}
                },
                {
                  model:db.Category, as:'categories', attributes:['name'], through:{attributes:[]}
                },
                {
                  model:db.Feature, as:'features', attributes:['title','description'], through:{attributes:[]}
                },
                {
                  model:db.Product, as:'productsMain', attributes:['id','name']
                }
              ],
              
            })
            
            if (imageInfo.length === 0){
              throw new Error('Product not found')
            }

            const info = imageInfo.map( image => {
              return {
                imageID: image.id,
                name: `${DOMAIN}images/${image.name}`,
                cabins : image.products,
                categories: image.categories.map(category => category.name),
                features: image.features,
                mainImage: image.productsMain
              }
            })


            // const info = {
            //   productID : product,
            //   cabin: imageInfoByProduct.map(product => product.name),
            //   images: imageInfoByProduct.map(product => product.images.map (image => `${DOMAIN}images/${image.name}`)).flat(),    
            //   detail: [...detail]
            // }


            res.status(200).json({
              meta:{
                status:'success',
                count: info.length
            },
              data: info,
              // imageInfo
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

    getCategoryImageData : async (req, res) => {
      try {
        const catID = req.params.id
        const needForCat = catID ? {id: { [Op.eq]: catID }} : {}


          const imageInfo = await db.Image.findAll({
              attributes:['id', 'name'],

              include: [
                {
                  model:db.Product, as:'products', attributes:['id','name'], through:{attributes:[]}
                },
                {
                  model:db.Category, as:'categories', attributes:['name'], where: needForCat, through:{attributes:[]}
                },
                {
                  model:db.Feature, as:'features', attributes:['title','description'], through:{attributes:[]}
                },
                {
                  model:db.Product, as:'productsMain', attributes:['id','name']
                }
              ],
              
            })
            
            if (imageInfo.length === 0){
              throw new Error('Product not found')
            }

            const info = imageInfo.map( image => {
              return {
                imageID: image.id,
                name: `${DOMAIN}images/${image.name}`,
                cabins : image.products,
                categories: image.categories.map(category => category.name),
                features: image.features,
                mainImage: image.productsMain
              }
            })


            // const info = {
            //   productID : product,
            //   cabin: imageInfoByProduct.map(product => product.name),
            //   images: imageInfoByProduct.map(product => product.images.map (image => `${DOMAIN}images/${image.name}`)).flat(),    
            //   detail: [...detail]
            // }


            res.status(200).json({
              meta:{
                status:'success',
                count: info.length,
                categoryID:catID
            },
              data: {
                category: catID ? info[0].categories[0] : 'all',
                info
              },
              // imageInfo
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

    getProductImageData : async (req, res) => {
      try {
        const prodID = req.params.id
        const needForProd = prodID ? {id: { [Op.eq]: prodID }} : {}


          const imageInfo = await db.Image.findAll({
              attributes:['id', 'name'],

              include: [
                {
                  model:db.Product, as:'products', attributes:['id','name'], where: needForProd, through:{attributes:[]}
                },
                {
                  model:db.Category, as:'categories', attributes:['name'], through:{attributes:[]}
                },
                {
                  model:db.Feature, as:'features', attributes:['title','description'], through:{attributes:[]}
                },
                {
                  model:db.Product, as:'productsMain', attributes:['id','name']
                }
              ],
              
            })
            
            if (imageInfo.length === 0){
              throw new Error('Product not found')
            }

            const info = imageInfo.map( image => {
              return {
                imageID: image.id,
                name: `${DOMAIN}images/${image.name}`,
                cabins : image.products,
                categories: image.categories.map(category => category.name),
                features: image.features,
                mainImage: image.productsMain
              }
            })


            // const info = {
            //   productID : product,
            //   cabin: imageInfoByProduct.map(product => product.name),
            //   images: imageInfoByProduct.map(product => product.images.map (image => `${DOMAIN}images/${image.name}`)).flat(),    
            //   detail: [...detail]
            // }


            res.status(200).json({
              meta:{
                status:'success',
                count: info.length,
                productID:prodID
            },
              data: {
                product: prodID ? info[0].cabins[0].name : 'all',
                info
              },
              // imageInfo
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

    getMainImageData : async (req, res) => {
      
      try {
        const product = req.params.id
        const needForProduct = product ? {id: { [Op.eq]: product }} : {}


          const imageInfoByProduct = await db.Product.findAll({
              attributes:['id', 'name', 'main_id_image'],
              where: needForProduct,
              include: [
                {
                  model:db.Image, as:'mainImage', attributes:['name']
                }
              ],
              
            })
            
            if (imageInfoByProduct.length === 0){
              throw new Error('Product not found')
            }


            const info = imageInfoByProduct.map(product => {
              return detail = {
                productID: product.id,
                name: product.name,
                mainImage : `${DOMAIN}images/${product.mainImage.name}`
              }
            })
  

            res.status(200).json({
              meta:{
                status:'success',
                count: info.length,

            },
              data: info,
              // imageInfoByProduct
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

    getFeatureImageData : async (req, res) => {
      try {
        const featID = req.params.id
        const needForFeat = featID ? {id: { [Op.eq]: featID }} : {}


          const imageInfo = await db.Image.findAll({
              attributes:['id', 'name'],

              include: [
                {
                  model:db.Feature, as:'features', attributes:['title','description'],where: needForFeat, through:{attributes:[]}
                },
                {
                  model:db.Product, as:'products', attributes:['id','name'], through:{attributes:[]}
                },
                {
                  model:db.Category, as:'categories', attributes:['name'], through:{attributes:[]}
                },
                {
                  model:db.Product, as:'productsMain', attributes:['id','name']
                }
              ],
              
            })
            
            if (imageInfo.length === 0){
              throw new Error('Feature not found')
            }

            const info = imageInfo.map( image => {
                
                  return {
                    imageID: image.id,
                    name: `${DOMAIN}images/${image.name}`,
                    cabins : image.products,
                    categories: image.categories.map(category => category.name),
                    features: image.features,
                    mainImage: image.productsMain
                  }

            })


            // const fiteredInfo = info.filter(image => image.features.length >= 1) 


            res.status(200).json({
              meta:{
                status:'success',
                count: info.length,
                featureID: featID
            },
              data: {
                feature: featID ? info[0].features[0].title : 'all',
                info,
                imageInfo
              },
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

  module.exports = imageController