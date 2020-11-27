import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import { multiSelect } from '../models/pg_model.ts';
import TSql from '../models/sql.ts';

const home = async({response} : {response : any }) => {
    const dataTable = await multiSelect(
        [
            {text : TSql ['KtgFindAll']},
            {text : TSql ['BlogInfoFindAll']}
        ]
    );
    console.log(dataTable);
    const html = await renderFileToString("./views/home.ejs", {
        data :{
        pemprograman : dataTable[0],
        bloginfo : dataTable[1]
        
    
      },
      subview :{
          namafile : "./views/blog-main.ejs",
          showjumbotron : true
      }
    });
    response.body = new TextEncoder().encode(html);
}
const signup = async({response} : {response : any }) => {
    const html = await renderFileToString("./views/home.ejs", {
            data : {
                pemprograman : await multiSelect({
                    text : TSql['KtgFindByKode'],
                    args : ['php', 'typescript', 'js']
                }),
                bloginfo : await multiSelect({
                    text : TSql['BlogInfoFindAll']
                })
        },
        subview : {
            namafile : "./views/signup.ejs",
            showjumbotron : false
        }
    });
    response.body = new TextEncoder().encode(html);
}
const saveuser = async({request, response} : {request : any, response : any}) => {
    const result = await request.body().value;
    const parseData = new URLSearchParams(result);

    const namalengkap = parseData.get("fullname");
    const namauser = parseData.get("username");
    const pwd = parseData.get("paswd");
    response.body = "Data yg di POST : "+namalengkap+" ,"+namauser+" ,"+pwd;
}
export { home, signup, saveuser }