const responseHandler = require('../../app/utils/response-handler');


module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode ? error.statusCode : 500;
    console.log('Error caught by Express', error.message);

    if(res.headersSent){
        return; 
    }

    responseHandler(res, error.statusCode, {error: error.message} );
    

}