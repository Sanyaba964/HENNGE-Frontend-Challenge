# HENNGE Frontend Challenge

A "Create User" form with password validation and API integration.

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Start the application:

```bash
pnpm dev
```

3. Access the application:

```
http://localhost:5173?token=YOUR_TOKEN
```

## Password Requirements

- Length: 10-24 characters
- Must contain at least one number
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Cannot contain spaces

## Testing Steps

1. Username:

   - Enter a valid username

2. Password:

   - Test with invalid passwords to see validation messages
   - Use a valid password (example: "Password123456")

3. Submit:
   - Click Create User button
   - Check for success/error messages

## Project Structure

```
src/
├── app.tsx              # Main application component
├── create-user-form.tsx # Form component with validation
├── main.tsx            # Entry point
└── style.css           # Styles
```

## Features

- Username validation
- Password validation with the following rules:
  - Must be 10-24 characters long
  - Must contain at least one number
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Cannot contain spaces
- Real-time validation feedback
- API integration with error handling
- Responsive design
- Accessibility features

## Demo

### Screenshots

![Form Initial State](docs/assets/form-initial.png)
![Password Validation](docs/assets/password-validation.png)
![Success State](docs/assets/success.png)

### Video Demo

You can watch a demo of the application here: [Demo Video](docs/assets/demo.mp4)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Sanyaba964/HENNGE-Frontend-Challenge.git
cd HENNGE-Frontend-Challenge
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Access the application:

```
http://localhost:5173?token=YOUR_CHALLENGE_TOKEN
```

Replace `YOUR_CHALLENGE_TOKEN` with the authentication token provided in your challenge details.

## Testing

### Password Validation Test Cases

1. Length Requirements:

   - Less than 10 characters
   - More than 24 characters
   - Between 10-24 characters

2. Character Requirements:

   - Without numbers
   - Without uppercase letters
   - Without lowercase letters
   - With spaces
   - Meeting all requirements

3. API Integration:
   - Missing token
   - Invalid token
   - Valid submission

## Adding Demo Materials

To add your own demo materials:

1. Create screenshots of your application:

   - Take screenshots of different states (initial, validation, success)
   - Save them in the `docs/assets` directory
   - Update the image paths in this README

2. Create a video demo:
   - Record a short demo of the application
   - Save it as MP4 in the `docs/assets` directory
   - Update the video link in this README

## Submission Information

1. Ensure all code is committed
2. Create a GitHub gist with your solution
3. Submit the gist URL to HENNGE

### Important Notes

- Update the `submit.cjs` file with your email address and the URL of your secret gist before running the submission script.
- Ensure that the token is provided as a URL parameter when accessing the application.

1. Ensure all code is committed
2. Create a GitHub gist with your solution
3. Submit the gist URL to HENNGE

## Notes

- The API endpoint requires authentication via token
- Token should be provided as a URL parameter
- All validation is performed client-side before API submission
