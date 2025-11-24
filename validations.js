import {body} from 'express-validator'

export const registerValidation = [
    body('email').isEmail(),
    body('password', 'mininum 5 symbols').isLength({ min :5}),
    body('fullName').isLength({ min :3}),
    body('avatarUrl').optional().isURL(),
];

export const loginValidation = [
    body('email').isEmail(),
    body('password', 'mininum 5 symbols').isLength({ min :5}),
    
];

export const postCreateValidation = [
    body('title', 'enter title').isLength({ min :5}).isString(),
    body('text', 'enter text').isLength({ min :5}).isString(),
    body('tags', 'wrong format').optional().isString(),
    body('imageUrl', 'wrong url').optional().isString(),
];