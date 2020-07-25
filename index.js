//importing the required modules
const http =require('http');
const fs=require('fs');
const path=require('path');

const hostname='localhost';
const port =3000;
//The http.createServer() method turns your computer into an HTTP server.
const server =http.createServer((req,res) => {
    console.log("Request for "+req.url+" by method "+req.method);

    /*res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html> <body> <h1> Hello,World! </h1> </body> </html>');*/

    if(req.method=='GET'){
        var fileUrl;
        //incase no particular page is requested the index.html page will be shown
        if(req.url == '/') fileUrl="/index.html";
        else
        //if a particular page is requested the url is extracted form the req object
        fileUrl=req.url;

        var filePath=path.resolve('./public'+fileUrl);
        //checking the extension of the file
        const fileExt = path.extname(filePath);
        if(fileExt == '.html'){
            fs.exists(filePath,(exists) => { //exists method checks if the filePath exists and also implements concerned functions in case the file exists or if it doesn't.
                if(!exists){
                    //if the file path doesn't exist i.e, if "exists" parameter of the callback function is false.
                    res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404: '+fileUrl+' not found'+'</h1></body></html>');
                    return ;
                }
                //if the file path exists
                res.statusCode=200;
                res.setHeader('Content-Type','text-html');
                fs.createReadStream(filePath).pipe(res); //reads the file from the filepath, converts it into a stream of bytes and pipes it into the response,i.e it will be included in the body of the response.
            })
        }
        else{
            //if the requested file isn't a HTML file
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404: '+fileUrl+' not an HTML file'+'</h1></body></html>');
            return ;
        }
    }
        else{
            //if the request is not a GET request.
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404: '+req.method+' not supported'+'</h1></body></html>');
            return ;
        }
})

server.listen(port,hostname,() =>{
    console.log(`Server running at http://${hostname}:${port}`);
})