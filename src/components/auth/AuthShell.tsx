import type { ReactNode } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./auth.module.css";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <Container
      fluid
      className={`d-flex align-items-center justify-content-center min-vh-100 ${styles.page}`}
    >
      <Row className={`g-0 ${styles.card}`}>
        <Col xs={12} md={6} className={`d-none d-md-block ${styles.imagePanel}`} aria-hidden="true">
          <Image
            src="/auth-hero.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 0px"
            className={styles.heroImage}
          />
        </Col>
        <Col
          xs={12}
          md={6}
          className={`d-flex flex-column justify-content-center ${styles.formPanel}`}
        >
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {children}
          {footer}
        </Col>
      </Row>
    </Container>
  );
}
