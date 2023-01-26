const fs = require("fs");
const nodemailer = require("nodemailer");
//const customAxios = require('axios').default;

//const {http} = require('../util');
const customAxios = require('../util/axios');
const {supabase} = require('./supabase');

//const url = 'https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details'

require('dotenv').config()

// TODO:Parametrizar llamadas por cliente, Dejar sólo URL Supabase en .ENV y el resto sacar desde Backend
// TODO: Subir Server
// TODO:Control de erróres
// TODO:Procedimiento de fallo



//const { createClient } = require('@supabase/supabase-js')

class Av2csv {
    constructor() {

        this.dataDistribuidor = process.env.DISTRIBUIDOR;
        this.dataSucursal = process.env.SUCURSAL;
        this.ctaMail = process.env.CTAMAIL;
        this.passApp = process.env.PASSAPP;
        this.sendTo = process.env.SENDTO;
        
        this.keyAv = '';
        this.urlVentas = '';
        this.urlProductos = '';
        this.urlClientes = '';
        this.urlVendedores = '';


        this.dateReq = new Date().toLocaleDateString('en-GB').split('/').reverse().join('');
        this.nameCSV = new Date().toDateString().split(' ').join('_')+'.txt';

       // this.getparams()

    }

   


    async getdatavta() {


      // console.log(process.env.URLSB)

      // console.log(process.env.SERVICEKEYSB)
      //     // Create a single supabase client for interacting with your database
      //     const supabase = createClient(
      //        process.env.URLSB, 
      //        process.env.SERVICEKEYSB
      //       // 'https://jtnwqkdykuzmlfgyaerk.supabase.co',
      //       // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0bndxa2R5a3V6bWxmZ3lhZXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxNTEwMTYsImV4cCI6MTk4OTcyNzAxNn0.mKZo9t6f7x-52YeR2luLFcoORWG5wWBzzE3a8F-IG2s'
      //       )
              //console.log(supabase)

              
             // .eq('user', process.env.USERSB)    // Correct

          // for (let dat in data)
          // {
          //   console.log(dat)
          // }
            //  data.map((dat) => {
            //       console.log(dat.created_at)
            //    })



        const preFijofile='Vta_'

        const params = new URLSearchParams();
        params.append('page', '1');
        params.append('limit', '100');
        params.append('from', new Date().toLocaleDateString('en-GB'));
        params.append('to', new Date().toLocaleDateString('en-GB'));

        // console.log(this.keyAv)
        // console.log(this.urlVentas)

      //  const http = axios.create({
      //     baseURL : 'https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details', //this.urlVentas,
      //     headers: {'api-key': 'f8acf9bf1fb0c06523f1a741a606508a'}  
      //    })

        //const http = customAxios(this.urlVentas, this.keyAv);
        const http = customAxios(
          process.env.URLVENTAS,
          //this.urlVentas,
          //'https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details', 
          //'f8acf9bf1fb0c06523f1a741a606508a'
          process.env.KEYAV,
        );
        //  http.defaults.baseURL = 'https://api.autoventa.io/api/2/companies/3/invoice-reports/products-details'; //url; //this.urlVentas;
        //  http.defaults.headers.common['api-key'] = 'f8acf9bf1fb0c06523f1a741a606508a'; //this.keyAv;


        const {total_count} = (await http.get("",
                {
                    params: { 
                                page: 1,
                                limit: 100,
                                from: new Date().toLocaleDateString('en-GB'), //dateProcess, //'01/12/2022',//new Date().toLocaleDateString('en-GB'),
                                to: new Date().toLocaleDateString('en-GB') //dateProcess //'13/01/2023' //new Date().toLocaleDateString('en-GB')
                            } 
                })).data;
        
        //console.log(Math.round(total_count/100)+1);
        let csvData = ""



        for (let i=1;i<=Math.round(total_count/100)+1;i++)
        {
            console.log(i)
            const {items} = (await http.get("",
            {
                params: { 
                            page: i,
                            limit: 100,
                            from: new Date().toLocaleDateString('en-GB'), //'12/01/2021', //dateProcess, //'01/12/2022',//new Date().toLocaleDateString('en-GB'),
                            to: new Date().toLocaleDateString('en-GB'), //'12/06/2021' //dateProcess //'13/01/2023' //new Date().toLocaleDateString('en-GB')
                        } 
            })).data;

            //console.log(dateProcess);

            items.forEach((repo) => {
                //[yy,mm,dd] = (repo.invoice_date);
                var invoice_date = new Date(repo.invoice_date)
                var req_created_at= new Date(repo.req_created_at)
                //console.log( this.dataDistribuidor)
                csvData += [
                        this.dataDistribuidor, 
                        this.dataSucursal, 
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
        //console.log(csvData);
          // hfyuclqorbtxlqff

        //   todayData.push({
        //     csvData,
        // });
        let fileName = './CSV/'+preFijofile+this.nameCSV
        fs.appendFile(fileName, csvData, function (err) {
          if (err) throw err;
          console.log("CSV created!");
        });


        this.mailService(preFijofile);
        //db.setItem(this.nameCSV, csvData) //JSON.stringify(todayData))
    

    }

     mailService(preFijofile) {

        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.CTAMAIL, //this.ctaMail,
      // use generated app password for gmail
            pass: process.env.PASSAPP,  //this.passApp,
          },
        });
      
        // setting credentials
        let mailDetails = {
          from: this.ctaMail, //"cristian.contreras@codevsys.cl",
          to: this.sendTo,
          subject: "Envío de datos Autoventa2SAP " + this.nameCSV,
          text: "Envío de archivos del día " + this.nameCSV,
          attachments: [
            {
                filename: preFijofile+this.dataDistribuidor+this.dateReq+'.txt',
                path: './CSV/'+preFijofile+this.nameCSV}
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


module.exports = Av2csv;