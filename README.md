# Restourant-ExpressAPI-Intro-clean

# Password Reset Flow Documentation

## 1. Request Password Reset Endpoint

- **URL:** POST `/auth/request-reset`
- **Input:** JSON `{ "email": "user@example.com" }`
- **Process:**
  - Check if user exists by email.
  - Generate a random 32-byte reset token and set 1 hour expiry.
  - Save token & expiry in database.
  - Email the user a password reset link including the token.
- **Response:** Always `{ message: "If the email exists, a reset link has been sent." }`

## 2. Reset Password Endpoint

- **URL:** POST `/auth/reset-password`
- **Input:** JSON `{ "token": "reset_token_here", "newPassword": "newPass123" }`
- **Process:**
  - Verify reset token and expiry.
  - Hash the new password using bcrypt.
  - Update user's password in database.
  - Clear reset token & expiry.
- **Response:** `{ message: "Password has been reset successfully" }`

## 3. Email Notifications

- Emails are sent via Nodemailer configured with Gmail SMTP.
- The `sendNotificationEmail` helper is used to send:
  - Account creation confirmation emails.
  - Password reset emails with a reset link.
- Emails use a consistent HTML template with inline styles.

## 4. Security Considerations

- Reset token is random and expires after 1 hour.
- Reset link sent via email to registered user only.
- Responses during reset request do not reveal if email exists.
- Passwords are securely hashed with bcrypt before saving.

---

## Environment Variables Needed

- `EMAIL_SENDER` - sender email address (Gmail)
- `EMAIL_PASSWORD` - Gmail app password or SMTP password
- `JWT_SECRET` - secret key to sign JWT tokens
- `FRONTEND_URL` - base URL of frontend to generate reset link
