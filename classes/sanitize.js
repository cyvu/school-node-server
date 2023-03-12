const input_case = {
  input: 'input',
  textarea: 'textarea',
}

/**
 * 
 * @description Sanitize an input by providing the text to the input parameter,
 * along with a relevant case: ie. sanitize.input(text, Sanitize.input_case.input)
 */
class Sanitize
{
  // Provide a light sanitazion on the constructor input, as this is of general use
  constructor(input) {

    
  }

  // Handle default inputs
  default(text, input_case_arg, callback) {
    let res = ''
    switch(input_case_arg) {
      case input_case.input: 
        res = text.replace(/[^a-z0-9åäö_ "@\.-]/gim, "");
      break;
      case input_case.textarea: 
        res = text.replace(/[^a-z0-9åäö_ "@\.,_-]/gim, "");
      break;
      default:
        console.error('Sanitize::input(default) - unknown argument provided')
      break;
    }
    return res.trim();
  }

  // Handle user inputs
  input(text, input_case_arg) {
    this.default(text, input_case_arg)
  }

  // Replace html-characters with html-codes ('<' = '&lt;')
  html() {}
}

module.exports = {
  input_case,
  Sanitize,
}