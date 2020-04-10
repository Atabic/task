module.exports = (app) => {
console.log('------------------------in cors file')
  // app.use(
  //   (req, res, next) => {
  //     console.log("Cors Enabled !");
  //     res.header("Access-Control-Allow-Origin", "*");
  //     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  //     res.header("Access-Control-Allow-Headers", true);
  //     next();
  //   });
  app.use(function(req, res, next) {
      console.log("--------------------------------Cors Enabled !");

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    
        next();
   
});

};
