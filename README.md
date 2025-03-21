# Password Validation Form Challenge

This is a React-based implementation of the HENNGE frontend password validation challenge. The application provides a user registration form with client-side password validation and API integration.

## Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v8 or higher)
- A modern web browser (Chrome, Firefox, Edge, etc.)

## Setup Instructions

1. Install pnpm if you haven't already:

```bash
npm install -g pnpm
```

2. Navigate to the project directory:

```bash
cd frontend_password_validation_v1_challenge/challenge/react
```

3. Clean install dependencies:

```bash
# Remove existing modules (if any)
rm -rf node_modules .vite
# Install dependencies
pnpm install
```

4. Start the development server:

```bash
# Start with network access
pnpm dev --host
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

### Troubleshooting

If you encounter "Connection Refused" errors:

1. Make sure no other application is using port 5173
2. Try using the network URL provided in the terminal output
3. Check if your firewall is blocking the connection
4. Try restarting the development server

## Testing the Application

### Password Validation Rules

The password must meet all these criteria:

- At least 10 characters long
- At most 24 characters long
- No spaces allowed
- At least one number
- At least one uppercase letter
- At least one lowercase letter

### Test Cases

1. **Username Validation**

```
Empty username: Submit button should be disabled
Spaces in username: Allowed (e.g., "John Doe")
Username with only spaces: Not allowed
```

2. **Password Validation Tests**

```
Too Short:
- Password: abc123
- Expected: "Password must be at least 10 characters long"

With Spaces:
- Password: Hello World 123
- Expected: "Password cannot contain spaces"

Missing Number:
- Password: HelloWorldTest
- Expected: "Password must contain at least one number"

Missing Uppercase:
- Password: hello123world
- Expected: "Password must contain at least one uppercase letter"

Missing Lowercase:
- Password: HELLO123WORLD
- Expected: "Password must contain at least one lowercase letter"

Perfect Password:
- Password: HelloWorld123
- Expected: No validation errors
```

3. **API Testing**
   To test API integration:
1. Get your authentication token from the HENNGE challenge details page
1. Add it to the URL: `http://localhost:5173?token=your-token-here`
1. Submit the form with valid credentials

### Error Messages

The application shows different error messages based on the response:

- Authentication Error: "Not authenticated to access this resource"
- Common Password Error: "Sorry, the entered password is not allowed, please try a different one"
- Generic Error: "Something went wrong, please try again"

## Features

1. **Real-time Validation**

- Instant feedback as user types
- Clear error messages
- Visual indicators for invalid fields
- Red border on invalid fields
- Disabled submit button when form is invalid

2. **Accessibility**

- Proper label associations with htmlFor
- ARIA invalid states for validation
- Keyboard navigation support
- Clear error message structure

3. **Error Handling**

- Client-side validation
- API error handling
- Clear error messages
- Separate styling for API errors vs validation errors

## Project Structure

```
react/
  ├── src/
  │   ├── app.tsx                # Main application component
  │   ├── create-user-form.tsx   # Form component with validation
  │   ├── main.tsx              # Application entry point
  │   └── style.css             # Global styles
  ├── package.json              # Project dependencies
  ├── tsconfig.json            # TypeScript configuration
  └── vite.config.ts           # Vite configuration
```

## Development Notes

- Uses React 19.0.0 with TypeScript
- All styling is done with inline styles as per requirements
- No external dependencies added as per requirements
- Form validation happens in real-time
- API calls are made only when all validation passes
- Uses Vite 6.0.6 for development server

## Submission Requirements

For challenge submission:

1. Only submit the `create-user-form.tsx` file
2. Create a secret gist on GitHub with this file
3. Follow the submission instructions in the challenge details

### Creating the Submission

1. Create a secret gist:

   - Go to https://gist.github.com/
   - Create a new gist
   - Set it as secret
   - Name the file `create-user-form.tsx`
   - Paste your component code
   - Create the gist

2. Submit your solution:
   - Create the JSON payload with your details
   - Send it to the HENNGE API as specified
   - Use Basic Authentication with your email and "HENNGECHALLENGE"
