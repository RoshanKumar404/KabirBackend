export const testcontroller=(req,res)=>{
    res.status(200).send({
        message:'Test ROutes',
        success:true,
    })

}
// const testcontroller=(req,res)=>{
//     res.status(300).send(
//         {
//             message:'test route hai ji jyada load na li',
//             success:true
//         }
//     )
// }