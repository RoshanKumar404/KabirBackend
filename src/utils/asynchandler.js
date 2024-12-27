const asyncHandler=(Requesthandler)=>{
    // try {
    //     await fn(req,res,next)
    // } catch (error) {
    //     res.status(error.code|| 500).json({
    //         success:false,
    //         message:error.message
    //     })
    // }
    (req,res,next)=>{
        Promise.resolve(Requesthandler(req,res,next))
        .catch((err)=>next(err))
    }


}

export {asyncHandler }