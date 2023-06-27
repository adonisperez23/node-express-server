const axios = require('axios')
const cheerio = require('cheerio')



async function obtenerValorDolar():Promise<string> {

    var valorDolar:string = ""
    let error:string = "Error al obtener valor del dolar"
    const axiosResponse = await axios.request({
      method: "GET",
      url: "https://monitordolarvenezuela.com",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
    })
    const $ = cheerio.load(axiosResponse.data)

    const promedios = $('h4:contains("@EnParaleloVzla3")').siblings()
    const dolar = $(promedios).each((index:number,element:any)=>{
      if(element.name === 'p'){
        valorDolar = element.children[0].data
      }
    })

    if(valorDolar.length > 0){
      const precioDolar:string = valorDolar.slice(-5)
      return precioDolar
    } else {
      return error
    }

    // console.log("dolar", precioDolar, numberDolar)
}





export {obtenerValorDolar};
