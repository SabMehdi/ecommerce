const ProductBrand = require("../../models/ProductBrand")
const ProductImages = require("../../models/ProductImages")
const { errorHandler, errorTimeHandler } = require("./errorHandler");
const Category = require("../../models/Category")
const _ = require('lodash')
const path = require("path");
const fs = require("fs");
const { districts } = require("../common");

exports.validateLead = (req, res, next) => {
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.validateSignUp = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.validateSocialLogin = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required.").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    req.check("userID","userID is required.").notEmpty()
    req.check("socialPhoto", "Invalid photo url.")
    .notEmpty()
    .matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
    req.check("loginDomain", "Invalid login domian")
        .notEmpty()
        .isIn(['google', 'facebook'])
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

const validatedispatcher  = req => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    req.check("address", "Address is required").notEmpty()
    req.check("phone", "Phone is required").notEmpty()
}
errorTimeHandler();

exports.validateDispatcher = (req,res, next) => {
    validatedispatcher(req)
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
}

exports.validateUpdateDispatcher = (req, res, next) => {
    validatedispatcher(req)
    // check for password
    req.newPassword && req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
}
exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.validateBusinessInfo = (req, res, next) => {
    req.check("ownerName", "Owner name is required").notEmpty()
    req.check("address", "Address is required").notEmpty()
    req.check("city", "City is required").notEmpty()
    req.check("citizenshipNumber", "Citizenship number is required").notEmpty()
    req.check("businessRegisterNumber", "Business register number is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        //make req.files to array of objs
        // let files = []
        // if (req.files) for (const file in req.files) {
        //     files.push(req.files[file][0]);
        // }
        // files.forEach(file => {
        //     fs.unlinkSync(file.path);//and remove file from public/uploads
        // })
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateAdminBankInfo = (req, res, next) => {
    req.check("accountHolder", "Account holder name is required").notEmpty()
    req.check("bankName", "Bank name is required").notEmpty()
    req.check("branchName", "Branch name is required").notEmpty()
    req.check("accountNumber", "Account number is required").notEmpty()
    req.check("routingNumber", "Bank number is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        // req.file && fs.unlinkSync(req.file.path);//remove file from public/uploads
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateWareHouse = (req, res, next) => {
    req.check("name", "Warehouse name is required").notEmpty()
    req.check("address", "Warehouse address is required").notEmpty()
    req.check("phoneno", "Warehouse phone number is required").notEmpty()
    req.check("city", "City of warehouse is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateAdminProfile = (req, res, next) => {
    req.check("shopName", "Shop name is required").notEmpty()
    req.check("address", "address is required").notEmpty()
    req.check("phone", "phone number is required").notEmpty()
    req.check("muncipality", "Muncipality is required").notEmpty()
    req.check("district", "district is required").notEmpty()
    req.check("wardno", "wardno is required").notEmpty()
    req.newPassword && req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateProduct = async (req, res, next) => {
    req.check("name", "Product name is required").notEmpty()
    req.check("price", "Selling price of product is required").notEmpty()
    req.check("quantity", "Product quantity is required").notEmpty()
    req.check("return", "Product returning time peroid required").notEmpty()
    req.check("description", "Product description is required").notEmpty()
    req.check("warranty", "Product warranty is required").notEmpty()
    req.check("brand", "Product brand is required").notEmpty()
    req.check("availableDistricts", "Invalid districts.").custom((values) => {
        let dts = values ? typeof values === 'string' ? [values] : values : []
        return values ? _.intersection(districts, dts).length === dts.length ? true : false : true
    })

    // check for errors
    const errors = req.validationErrors() || [];

    // validate images
    let images = req.body.images || []
    images = await ProductImages
        .find()
        .where('_id')
        .in(images)
        .catch(err => errors.push({ msg: "Invalid image ids" }));// catch will execute if invalid ids
    // if some id are invalid
    // e.g out of 3 images 1 is not valid the images.length = 2 bcoz 2 are only vaild so shld return error..
    if (images.length !== (typeof req.body.images === 'string' ? [req.body.images] : req.body.images).length) {
        errors.push({ msg: "Invalid image ids" })
    }
    req.images = images
    // validate brand
    let brand = await ProductBrand.findOne({ slug: req.body.brand })
    if (!brand) {
        errors.push({ msg: "Invalid product brand" })
    } else {
        req.body.brand = brand._id
    }

    //validate category
    let categories = await Category.find({ slug: req.body.category })
    if (!categories.length) {
        errors.push({ msg: "Invalid product category" })
    } else if (categories.some(cat=>cat.isDisabled)) {
        errors.push({ msg: "Categories have been disabled" })
    } else {
        req.body.category = categories.map(cat=>cat._id)//as we need id for reference
    }
    // if error show the first one as they happen
    if (errors.length) {
        console.log(errors);
        // errorHandler();
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}

exports.validateTestProduct = (req, res, next) => {
    // Validate required fields
    req.check("title", "Product title is required").notEmpty();
    req.check("title", "Product title must be between 1 and 100 characters")
        .isLength({ min: 1, max: 100 });
    
    req.check("description", "Product description is required").notEmpty();
    req.check("description", "Product description must be between 10 and 1000 characters")
        .isLength({ min: 10, max: 1000 });
    
    req.check("price", "Product price is required").notEmpty();
    req.check("price", "Price must be a valid number")
        .isNumeric()
        .withMessage("Price must be a valid number");
    req.check("price", "Price must be greater than 0")
        .isFloat({ min: 0.01 })
        .withMessage("Price must be greater than 0");
    
    req.check("imageUrl", "Product image URL is required").notEmpty();
    req.check("imageUrl", "Invalid image URL format")
        .matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)
        .withMessage("Image URL must be a valid image URL (jpg, jpeg, png, gif, webp)");
    
    req.check("category", "Category is required").notEmpty();
    req.check("category", "Category must be between 2 and 50 characters")
        .isLength({ min: 2, max: 50 });
    
    // Check for errors
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ 
            success: false,
            error: firstError 
        });
    }
    
    // Sanitize the data
    req.body.title = req.body.title.trim();
    req.body.description = req.body.description.trim();
    req.body.price = parseFloat(req.body.price).toFixed(2);
    req.body.imageUrl = req.body.imageUrl.trim();
    if (req.body.category) {
        req.body.category = req.body.category.trim();
    } else {
        req.body.category = 'General';
    }
    
    next();
};