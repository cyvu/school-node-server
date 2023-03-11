const input_case = {
  input: 'input',
  textarea: 'textarea',
}

class Sanitize
{
  // Provide a light sanitazion on the constructor input, as this is of general use
  constructor(input) {

    
  }

  // Handle user inputs
  input(text, input_case_arg) {
    let res = ''
    switch(input_case_arg) {
      case input_case.input: 
        res = text.replace(/[^a-z0-9åäö_-]/gim, "");
      break;
      case input_case.textarea: 
        res = text.replace(/[^a-z0-9åäö \.,_-]/gim, "");
      break;
      default:
        console.error('Sanitize::input(default) - unknown argument provided')
      break;
    }
    return res.trim();
  }

  // Replace html-characters with html-codes ('<' = '&lt;')
  html() {}
}

module.exports = {
  input_case,
  Sanitize,
}