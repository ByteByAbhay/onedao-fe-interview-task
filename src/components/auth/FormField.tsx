import type { ChangeEvent, ReactNode } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./auth.module.css";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  icon?: IconDefinition;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  endAdornment?: ReactNode;
};

export default function FormField({
  id,
  label,
  type = "text",
  icon,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  endAdornment,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label className={styles.label}>{label}</Form.Label>
      <InputGroup
        className={`${styles.inputWrapper} ${error ? styles.inputWrapperInvalid : ""}`}
      >
        {icon && (
          <InputGroup.Text className={styles.iconAddon}>
            <FontAwesomeIcon icon={icon} aria-hidden="true" />
          </InputGroup.Text>
        )}
        <Form.Control
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
          className={styles.input}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          autoComplete={autoComplete}
        />
        {endAdornment}
      </InputGroup>
      {error && (
        <p id={errorId} className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </Form.Group>
  );
}
