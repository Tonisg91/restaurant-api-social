// @ts-check

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 *
 * @param {String} password Password to encrypt
 * @returns {String}
 */

exports.encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

/**
 *
 * @param {String} pwd1
 * @param {String} pwd2
 * @returns {boolean}
 */

exports.comparePassword = (pwd1, pwd2) => bcrypt.compareSync(pwd1, pwd2)

/**
 *
 * @param {String} id String with user id
 * @returns {String}
 */
exports.encodeToken = (id) =>
    jwt.sign(id, process.env.JWT_KEY, { expiresIn: '365d' })
