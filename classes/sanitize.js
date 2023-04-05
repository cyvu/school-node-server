const type = {
  input: "input",
  textarea: "textarea",
}

/**
 *
 * @description Sanitize an input by providing the text to the input parameter,
 * along with a relevant case: ie. sanitize.input(text, Sanitize.input_case.input)
 */
class Sanitize {
  // Provide a light sanitazion on the constructor input, as this is of general use
  constructor(input) {}

  // Handle default inputs
  default(text, arg, callback) {
    let res = ""
    switch (arg) {
      case type.input:
        res = text.replace(/[^a-z0-9åäö_ "@\.-]/gim, "")
        break
      case type.textarea:
        res = text.replace(/[^a-z0-9åäö_ "@\.,_-]/gim, "")
        break
      default:
        console.error("Sanitize::default() - unknown argument provided")
        break
    }
    return res.trim()
  }

  // Handle user inputs
  input(text, arg) {
    return this.default(text, arg)
  }

  // Replace html-characters with html-codes ('<' = '&lt;')
  html() {}
}

module.exports = {
  type,
  Sanitize,
}
