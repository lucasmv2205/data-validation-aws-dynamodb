// fn é a main
// schema éa validacao
// argtype = body, queryString

const decoratorValidator = (fn, schema, argType) => {
  return async function (event){
    const data = JSON.parse(event[argType])
    const { error, value } = await schema.validate(
      data,
      {
        abortEarly: false
      }
    )

    // faz com que o event.body ja venha como objeto ao inves de string
    // isso tambem altera o arguments (transformando o body)
    event[argType] = value
    if(!error) return fn.apply(this, arguments)

    return {
      statusCode: 422, //unprocessable entity
      body: error.message
    }
  }
}

module.exports = {
  decoratorValidator
}