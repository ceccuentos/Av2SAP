require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.URLSB, process.env.SERVICEKEYSB)
// Create a single supabase client for interacting with your database
module.exports = {supabase} //export 

/*
const { data, error } =  supabase
    .from('av2sap_params')
    .select('urlventas')
    //.eq('user', process.env.URLSB)    // Correct
console.log(data)

console.log(process.env.URLSB)

console.log(process.env.USERSB)
//console.log(data)

exports.default=data;

*/