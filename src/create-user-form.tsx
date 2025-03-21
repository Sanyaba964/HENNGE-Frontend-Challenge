import type { CSSProperties, Dispatch, FormEvent, SetStateAction } from "react";
import { useState, useEffect } from "react";

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

interface ValidationCriteria {
  message: string;
  test: (password: string) => boolean;
}

function CreateUserForm({ setUserWasCreated }: CreateUserFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });

  const validationCriteria: ValidationCriteria[] = [
    {
      message: "Password must be at least 10 characters long",
      test: (pwd) => pwd.length >= 10,
    },
    {
      message: "Password must be at most 24 characters long",
      test: (pwd) => pwd.length <= 24,
    },
    {
      message: "Password cannot contain spaces",
      test: (pwd) => !pwd.includes(" "),
    },
    {
      message: "Password must contain at least one number",
      test: (pwd) => /\d/.test(pwd),
    },
    {
      message: "Password must contain at least one uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      message: "Password must contain at least one lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
    },
  ];

  const failedCriteria = validationCriteria.filter(
    (criteria) => !criteria.test(password)
  );
  const isPasswordValid = failedCriteria.length === 0;
  const isUsernameValid = username.trim() !== "";
  const isFormValid = isUsernameValid && isPasswordValid;

  useEffect(() => {
    if (password) {
      setApiError("");
    }
  }, [password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    if (!isFormValid) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        setApiError("Not authenticated to access this resource");
        return;
      }

      const response = await fetch(
        "https://api.challenge.hennge.com/password-validation-challenge-api/001/challenge-signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        setUserWasCreated(true);
      } else if (response.status === 401 || response.status === 403) {
        setApiError("Not authenticated to access this resource");
      } else if (response.status === 400) {
        setApiError(
          "Sorry, the entered password is not allowed, please try a different one"
        );
      } else {
        setApiError("Something went wrong, please try again");
      }
    } catch (error) {
      setApiError("Something went wrong, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={formWrapper}>
      <form style={form} onSubmit={handleSubmit}>
        <label style={formLabel} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          style={{
            ...formInput,
            ...(touched.username &&
              !isUsernameValid && { borderColor: "#d21c1c" }),
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
          aria-invalid={touched.username && !isUsernameValid}
          required
        />
        {touched.username && !isUsernameValid && (
          <div style={errorItem}>Username is required</div>
        )}

        <label style={formLabel} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          style={{
            ...formInput,
            ...(touched.password &&
              !isPasswordValid && { borderColor: "#d21c1c" }),
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          aria-invalid={touched.password && !isPasswordValid}
          required
        />

        {password && failedCriteria.length > 0 && (
          <ul style={errorList}>
            {failedCriteria.map((criteria, index) => (
              <li key={index} style={errorItem}>
                {criteria.message}
              </li>
            ))}
          </ul>
        )}

        {apiError && <div style={apiErrorStyle}>{apiError}</div>}

        <button
          style={{
            ...formButton,
            ...((!isFormValid || isSubmitting) && {
              opacity: 0.7,
              cursor: "not-allowed",
            }),
          }}
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export { CreateUserForm };

const formWrapper: CSSProperties = {
  maxWidth: "500px",
  width: "80%",
  backgroundColor: "#efeef5",
  padding: "24px",
  borderRadius: "8px",
};

const form: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: "none",
  padding: "8px 16px",
  height: "40px",
  fontSize: "14px",
  backgroundColor: "#f8f7fa",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "4px",
};

const formButton: CSSProperties = {
  outline: "none",
  borderRadius: "4px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  backgroundColor: "#7135d2",
  color: "white",
  fontSize: "16px",
  fontWeight: 500,
  height: "40px",
  padding: "0 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "8px",
  alignSelf: "flex-end",
  cursor: "pointer",
};

const errorList: CSSProperties = {
  listStyle: "none",
  margin: "8px 0",
  padding: 0,
  color: "#d21c1c",
};

const errorItem: CSSProperties = {
  fontSize: "14px",
  marginBottom: "4px",
};

const apiErrorStyle: CSSProperties = {
  color: "#d21c1c",
  fontSize: "14px",
  marginTop: "8px",
  padding: "8px",
  backgroundColor: "rgba(210, 28, 28, 0.1)",
  borderRadius: "4px",
};
