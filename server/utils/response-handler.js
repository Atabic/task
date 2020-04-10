module.exports = (res, status, data ) =>{

    res.status(status).json({status: status, data: data});
}