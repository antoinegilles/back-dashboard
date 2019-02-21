const Product = require('../models/product.model');
var bcrypt = require('bcrypt');





//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

//Connexion
exports.product_login = function (req, res, callback) {
    Product.find({ name: req.body.name }).exec(function (err, Product) {
        console.log(Product[0].name)
        if (err) {
          return callback(err)
        } else if (!Product) {
          var err = new Error('Profil not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(req.body.password, Product[0].password, function (err, result) {
          if (result == true) {
              console.log("connecté")
            return res.send("url gitea : " + Product[0].urlGitea + "url gitea : " + Product[0].urlNextcloud + "url gitea : "+Product[0].urlTrello)
          } else {

            return res.send("Vérifiez votre identifiant / mot de passe")
          }
        })
      });
      
  }

//Deconnexion
exports.product_logout = function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
};

//Create
exports.product_create = function (req, res) {

    let product = new Product(
        {
            name: req.body.name,
            surname: req.body.surname,
            urlNextcloud: req.body.urlNextcloud,
            urlGitea: req.body.urlGitea,
            urlTrello: req.body.urlTrello,
            password: req.body.password
        
        }
    
    );
    
    Product.find( {name :product.name}, function (err, ProductFind) {
        if (err) return next(err);
        if(ProductFind.length){
            console.log("utilisateur deja present")
            var present = "Utilisateur déja inscrit"
            res.send(present)

        }else{
            console.log("Utilisateur non present")
            Product.create(product, function (error, user) {
                if (error) {
                  return next(error);
                } else {
                  // A CHECKER req.session.userId = user._id;
                  console.log(user._id) 
                  return console.log("ok")
                }
              });
        }
       })

    
};

//read all
exports.product_all = function (req, res) {
    Product.find( function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
};

//read
exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//update
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};
//delete
exports.product_delete = function (req, res) {
    Product.remove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};