
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user';
import { logger } from '../middlewares/logger';
import { Token } from '../models/token';
import { comparePasswords, hashPassword } from '../utils/hashpassword';




export const resetpasswordService = async (req: Request, res: Response) => {
   try {

    const {token,} = req.query

    const { password } = req.body
    const user = await User.findById(req.params.query)

    if(!user) {
        throw new Error ('User not found')
    }
  
    const checktoken = await Token.findOne({
      token: req.params.token
    })
  
    if(!checktoken) {
        throw new Error ('invalid code or expired')
    }
   
  
    const hash = await hashPassword(password);
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hash } },
      { new: true }
    );
    await user.save()
    await checktoken.deleteOne()

    res.status(StatusCodes.OK).json({
       msg:  'Password updated succesfully'
    })
   } catch (err: any) {
    logger.error(err.message);
    const statusMap: Record<string, number> = {
        'User not found': StatusCodes.CONFLICT,
        'invalid code or expired': StatusCodes.CONFLICT,
    };

    const statusCode =
        statusMap[err.message] || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({ error: err.message });
   }
  }