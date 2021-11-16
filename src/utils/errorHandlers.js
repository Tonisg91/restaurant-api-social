// @ts-check

/**
 *
 * @param {Error} error Receives an error from catch
 * @param {import("express").Response} res
 * @returns Void
 */
exports.mongoError = (error, res) => {
    console.error(error)
    res.status(500).json({ message: 'MongoDB error', error })
}
