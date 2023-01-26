const cron = require("node-cron");
const Server = require('./models/server.js')
const Av2csv = require('./models/av2csv.js')
require('dotenv').config()

//const {config} = require('./util/config.js');

const { createClient } = require('@supabase/supabase-js')
//const {supabase} = require('./models/supabase');


const server= new Server()

//console.log(config)
cron.schedule('* * * * *', () => {


  const av2csv= new Av2csv()

//cron.schedule('* * * * * *', () => {
    //av2csv.getparams();
    av2csv.getdatavta();
    delete av2csv;
    //58
})
    server.listen();
/*
    cron.schedule("* 1 * * *", function () {
        console.log("---------------------");
        console.log("deleting logged status");
        fs.unlink("./CSV/*.txt", err => {
          if (err) throw err;
          console.log("deleted successfully");
        });
      });
*/

      async function getparams()   {

        const supabase = createClient(process.env.URLSB, process.env.SERVICEKEYSB)
        const { data, error } =  await supabase.from('av2sap_params').select().match({user: process.env.USERSB});

        if (error || data.length === 0) {
            console.log('No data')
            console.log(error)
        }

        //console.log(data[0].urlventas)

        return data[0]
       // if (data) console.log(data[0])
  
        // data.map((dat) => {
          
        // this.dataDistribuidor = dat.distribuidor;
        // this.dataSucursal = dat.sucursal;
        // this.ctaMail = dat.ctaMail;
        // this.passApp = dat.passApp;
        // this.sendTo = dat.sendto;

        // this.keyAv = dat.keyav;
        // this.urlVentas = dat.urlventas;
        // this.urlProductos = dat.urlproductos;
        // this.urlClientes = dat.urlclientes;
        // this.urlVendedores = dat.urlvendedores;
  
        // })
  
      }


//} 





//app = express();


/*
class Main {
    static async getDataAv() {
        //const todayData = [];

        const params = new URLSearchParams();
        params.append('page', '1');
        params.append('limit', '100');
        params.append('from', new Date().toLocaleDateString('en-GB'));
        params.append('to', new Date().toLocaleDateString('en-GB'));

        const {total_count} = (await http.get('https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details',
                {
                    params: { 
                                page: 1,
                                limit: 100,
                                from: '12/01/2021', //dateProcess, //'01/12/2022',//new Date().toLocaleDateString('en-GB'),
                                to: '12/01/2022' //dateProcess //'13/01/2023' //new Date().toLocaleDateString('en-GB')
                            } 
                })).data;
        
        console.log(Math.round(total_count/100)+1);
        let csvData = ""


        for (let i=1;i<=Math.round(total_count/100)+1;i++)
        {
            console.log(i)
            const {items} = (await http.get('https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details',
            {
                params: { 
                            page: i,
                            limit: 100,
                            from: '12/01/2021', //dateProcess, //'01/12/2022',//new Date().toLocaleDateString('en-GB'),
                            to: '12/01/2022' //dateProcess //'13/01/2023' //new Date().toLocaleDateString('en-GB')
                        } 
            })).data;

            //console.log(dateProcess);

            items.forEach((repo) => {
                //[yy,mm,dd] = (repo.invoice_date);
                var invoice_date = new Date(repo.invoice_date)
                var req_created_at= new Date(repo.req_created_at)

                csvData += [
                        dataDistribuidor, 
                        dataSucursal, 
                        repo.invoice_sales_document_id=33?'FC':repo.invoice_sales_document_id=31?'NC':'ND',
                        repo.invoice_correlative,
                        '1',
                        req_created_at.toLocaleDateString('en-GB').split('/').reverse().join(''), //repo.req_created_at, 
                        invoice_date.toLocaleDateString('en-GB').split('/').reverse().join(''), 
                        repo.salesman_code,
                        repo.client_code, 
                        repo.product_code + '_' + repo.mu_name,
                        repo.quantity,
                        repo.mu_name,
                        Math.round(Number(repo.net_unit_price)),
                        Math.round(Number(repo.net_unit_price)), //Math.round(repo.quantity * repo.net_unit_price),
                    ].join(";") + "\r\n"

            });
        }
        console.log(csvData);
          // hfyuclqorbtxlqff

        //   todayData.push({
        //     csvData,
        // });

        db.setItem(nameCSV, csvData) //JSON.stringify(todayData))
    

    }

    static mailService() {
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "cristian.contreras@codevsys.cl",
      // use generated app password for gmail
            pass: "hfyuclqorbtxlqff",
          },
        });
      
        // setting credentials
        let mailDetails = {
          from: "cristian.contreras@codevsys.cl",
          to: "ceccuentos@gmail.com",
          subject: "Test Mail Autoventa2SAP",
          text: "Envío de archivos",
          attachments: [
            {
                filename: 'vta'+dataDistribuidor+dateReq+'.txt',
                path: './CSV/'+nameCSV}
          ]
        };
      
        // sending email
        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("error occurred", err.message);
          } else {
            console.log("---------------------");
            console.log("email sent successfully");
          }
        });
      }

}

//cron.schedule('* * * * * *', () => {
    console.log('Cec')
    Main.getDataAv();
    //Main.mailService();
//} 

//)

app.listen(3000, () => {
    console.log("application listening.....");
  });

  */

