module.exports = {
    user:(req,res,next)=>{

        if(req.isAuthenticated()){
            return next()
        } 
        req.flash('error', 'Log in to gain access!')
        res.redirect('/')
        
    }
}