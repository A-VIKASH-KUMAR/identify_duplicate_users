export const identifyValidate = async (req:any, res:any, next:any) => {
    const { email, phoneNumber } = req.body;

    if (email === "" || phoneNumber === "") {
      return  res.status(200).json({message:"please send a email and password"})
    }
    return next();
}