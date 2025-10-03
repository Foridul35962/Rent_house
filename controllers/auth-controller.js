const { check, validationResult } = require("express-validator")
const User = require("../models/userCollection")
const bcrypt = require('bcryptjs')


//Get Lonin
exports.getLogin = (req, res, next) => {
  res.render('auth/loginPage', { pageTitle: "Login", isLoggedIn: req.session.isLoggedIn, errorMessages: [] })
}

//post Login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body
  try{
    const user = await User.findUser(email)
    if (!user) {
      return res.render('auth/loginPage', {
        pageTitle: 'Login',
        isLoggedIn: req.session.isLoggedIn,
        errorMessages: ['Invalid user name password']
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.render('auth/loginPage', {
        pageTitle: 'Login',
        isLoggedIn: req.session.isLoggedIn,
        errorMessages: ['Invalid user name password']
      })
    }
    req.session.isLoggedIn = true
    req.session.user = user
    await req.session.save()
    res.redirect('/')
  }
  catch{
    return res.render('auth/loginPage', {
      pageTitle: 'Login',
      isLoggedIn: req.session.isLoggedIn,
      errorMessages: ['Something went wrong, please try again']
    })
  }
}


//post Log Out
exports.postLogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}


//get Register Page
exports.getRegister = (req, res, next) => {
  res.render('auth/registrationPage', {
    pageTitle: "Registration",
    isLoggedIn: req.session.isLoggedIn,
    errorMessages: false,
    oldInput: { firstName: '', lastName: '', email: '', userType: '' }
  })
}


//post Register from register page
exports.postRegister = [
  //First Name validation
  check('firstName')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters'),

  //Last Name validation
  check('lastName')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters'),

  //Email validation
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),

  //Password validation
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?:{}'"|<>]/)
    .withMessage('Password must contain at least one special letter')
    .trim(),

  //Confirm password validation
  check('confirm_password')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true
    }),

  //User Type validation
  check('userType')
    .notEmpty()
    .withMessage('User Type is required')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/registrationPage', {
        pageTitle: 'Registration',
        isLoggedIn: req.session.isLoggedIn,
        errorMessages: errors.array().map(err => err.msg),
        oldInput: {
          firstName, lastName, email, userType
        }
      })
    }

    bcrypt.hash(password, 12).then(hashedPassword => {
      const user = new User(firstName, lastName, email, hashedPassword, userType)
      user.save()
        .then(() => {
          res.redirect('/login')
        }).catch((err) => {
          return res.status(422).render('auth/registrationPage', {
            pageTitle: 'Registration',
            isLoggedIn: req.session.isLoggedIn,
            errorMessages: ['Email already exists!'],
            oldInput: {
              firstName, lastName, email, userType
            }
          })
        })
    })
  }
]