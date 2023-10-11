// import puppeteer from 'puppeteer'
import axios from "axios"
import cheerio from "cheerio"


// async function obtenerValorDolarPuppeteer():Promise<string> {
//     try {
//
//       let error:string = "Error al obtener valor del dolar"
//
//       const browser = await puppeteer.launch({
//         headless: "new",
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         // opcion para que abra el navegador por detras del programa, se coloca false para que abra el navegador y se observe las aplicaciones
//         slowMo:2500 //tiempo para que demore mas al hacer las operaciones
//       })
//       const page = await browser.newPage()
//
//       await page.goto('https://www.bcv.org.ve')
//       // await page.setDefaultNavigationTimeout(0)
//
//
//       const valorDolar = await page.evaluate(()=>{
//         const listaElementos = document.querySelectorAll<HTMLElement>('strong')
//         const precioDolar = listaElementos[6].innerText
//
//         return precioDolar
//
//       })
//
//       await browser.close()
//
//       if(valorDolar.length > 0){
//
//         const precioDolar:string = valorDolar.slice(0,5)
//         return precioDolar
//       } else {
//         return error
//       }
//     } catch (error) {
//       console.log(error)
//       return "Error al obtener valor del dolar"
//     }
//
// }

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

    const promedios = $('h3:contains("@EnParaleloVzla3")').siblings()
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
