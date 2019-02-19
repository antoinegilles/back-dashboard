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
            return console.log("trouvé")
          } else {

            return console.log("pas trouvé")
          }
        })
      });
  }

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
    
    Product.find( {name :product.name}, function (err, Product) {
        if (err) return next(err);
        if(Product.length){
            console.log("utilisateur deja present")
            var present = "Utilisateur déja inscrit"
            res.send(present)

        }else{
            console.log("Utilisateur non present")
            product.save(function (err) {
                if (err) {
                    return next(err);
                }
                var inscrit = "Utilisateur inscrit"
                res.send(inscrit)
            })
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