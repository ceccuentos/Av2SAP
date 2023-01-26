require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

let configx;

const config = async ({configx}) => {

    console.log('entre?')
    const supabase = createClient(process.env.URLSB, process.env.SERVICEKEYSB)
    const  { data, error } =  await supabase.from('av2sap_params').select().match({user: process.env.USERSB});

    if (error || data.length === 0) {
        console.log('No data')
        console.log(error)
    }
    console.log(data[0])

    configx = data[0]

}

module.exports = {configx}; 
 

// const config = {
//     user : process.env.DBUSER,
//     password : process.env.DBPASSWORD, 
//     server : process.env.DBSERVER, 
//     database : process.env.DATABASE, 
//     options:{
//         trustedconnection: true,
//         enableArithAbort : true, 
//         instancename : process.env.INSTANCENAME, 
//     },
//     port : Number(process.env.DBPORT)
// }


// module.exports = config; 