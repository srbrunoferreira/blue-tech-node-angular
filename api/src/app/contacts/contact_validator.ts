import { body } from 'express-validator'
import { Request, Response } from 'express'

export default class ContactValidator {
  contactValidator = [
    body('full_name')
      .isLength({ min: 3, max: 100 })
      .withMessage('Full name must be between 3 and 100 characters'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone')
      .matches(/^[0-9]{10,15}$/)
      .withMessage('Phone number must be between 10 and 15 digits')
  ]

  async validate(req: Request, res: Response) {
    const invalidResults = []

    for (const validation of this.contactValidator) {
      const validationResult = await validation.run(req)

      if (!validationResult.isEmpty()) {
        invalidResults.push(validationResult.array())
      }
    }

    if (invalidResults.length > 0) {
      res.status(400).json({ errors: invalidResults })

      return false
    }

    return true
  }
}
