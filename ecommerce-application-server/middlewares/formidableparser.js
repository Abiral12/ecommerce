import formidable from 'formidable'

export const formidableParser = async(req,res,next)=>{
    const form = formidable({multiples: true})

    form.parse(req, (error, fields, files)=>{
        if(error) {
            return res.status(500).send({
                success: false,
                message: "something went wrong",
                 error
            })
        }
        req.body = fields
        req.files = files
        next()
    }
)

}