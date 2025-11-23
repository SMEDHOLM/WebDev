import {body} from 'express-validator'

export const registerValidation = [
    body('email').isEmail(),
    body('password', 'mininum 5 symbols').isLength({ min :5}),
    body('fullName').isLength({ min :3}),
    body('avatarUrl').optional().isURL(),
];
