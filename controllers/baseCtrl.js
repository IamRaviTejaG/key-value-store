export default {
  /**
   * Returns the base HTML page when the base route is hit.
   * @param  req
   * @param  res
   */
  basePage: (req, res) => {
    res.status(200).send('<h1>Hello</h1>')
  }
}
