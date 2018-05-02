// const Account = require("../accounts/model")
const Food = require("./model")

module.exports = {

  // GET /foods ----------------------------------------------------------------

  get: (req, res) => {
    Food.find().exec((err, resource) => {
      res.send(resource);
    });
  },

  // GET /foods/:id ------------------------------------------------------------

  getById: (req, res) => {
    Food.findOne({
      id: Number(req.params.id)
    }).exec((err, resource) => {
      console.log(resource);
      res.send({params: req.params, data: resource})
    })
  },

  // POST /foods ---------------------------------------------------------------

  post: (req, res) => {
    Food.create({
      name: req.body.name,
      address: {
        street: req.body.street,
        city: req.body.city
      },
      coordinate: {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      },
      menus:req.body.menu,
      reviews: [
        {
          // _account: req.body._account,
          comment: req.body.comment,
          rating: req.body.rating
        }
      ],
      photo: [req.body.photo]
    }, (err, resource) => {
      if (err) return handleError(err);
      res.send({message: "new post has been created", data: resource});
    })
  },

  // DELETE /foods -------------------------------------------------------------

  delete: (req, res) => {
    Food.remove({}, (error, resource) => {
      res.send({message: "all post has been deleted"})
    })
  },

  // DELETE /foods/:id ---------------------------------------------------------

  deleteById: (req, res) => {
    const id = req.params.id
    Food.remove({
      id: Number(id)
    }, (error, resource) => {
      res.send({message: `post with id: ${id} has been deleted`, data: resource})
    })
  },

  // PUT /foods/:id ------------------------------------------------------------

  putById: (req, res) => {
    const newFood = req.body
    const id = req.params.id
    Food.findOneAndUpdate({
      id: Number(id)
    }, {
      $set: newFood
    }, {
      new: true,
      upsert: false
    }, (error, resource) => {
      if (error)
        res.send({message: "error when updating post"})
      res.send({message: `Foods with id: ${id} has been updated`, data: resource})
    })
  },

  // PUT /foods/add_review/:id -------------------------------------------------

  // addReviewById: (req, res) => {
  //   req.body.date = new Date()
  //   req.body._account = req.decoded.sub
  //   const newReview = req.body
  //   const id = req.params.id
  //
  //   Food.findOneAndUpdate({
  //     id: Number(id)
  //   }, {
  //     $push: {
  //       reviews: newReview
  //     }
  //   }, {
  //     new: true,
  //     upsert: false
  //   }, (error, resource) => {
  //     if (error) {
  //       res.send({message: "error when updating post"})
  //     } else {
  //       res.send({message: `Food with id: ${id} has been updated`, data: resource})
  //     }
  //   })
  // },

//   // GET /foods/review_history/:id
//
//   getReviewHistory: (req, res) => {
//     Account.findOne({
//       id: Number(req.params.id)
//     }).exec((err, account) => {
//       if (err)
//         return res.send(`error while getting account ID: ${err}`)
//       Food.find({
//         reviews: {
//           $elemMatch: {
//             _account: account._id
//           }
//         }
//       }).populate({
//         path: "reviews._account",
//         select: {
//           "_id": 0,
//           "createdAt": 0,
//           "updatedAt": 0,
//           "email": 0
//         }
//       }).select({name: 1, address: 1, photos: 1, "reviews.comment": 1}).exec((err, foods) => {
//         foods.map((food, index) => {
//           food.reviews = food.reviews.filter(review => review._account.id === Number(req.params.id))
//         })
//         res.send({param: req.params.id, data: foods})
//       })
//     })
//   },
//
//   // GET /foods/get_food_by_user/:id -------------------------------------------
//
//   getFoodByUser: (req, res) => {
//     Account.findOne({
//       id: Number(req.params.id)
//     }).exec((err, account) => {
//       if (account._id) {
//         Food.find({_account: account._id}).select({name: 1, address: 1, photos: 1, id: 1}).exec((err, foods) => {
//           res.send({param: req.params.id, data: foods})
//         })
//       } else {
//         res.send({param: req.params.id, message: "account not found"})
//       }
//     })
//   }
}