# Initial Security Review (`SECURITY_REVIEW.md`)

This document outlines five key vulnerabilities identified during the initial security audit of the E-Commerce REST API prior to remediation.

| # | Issue / Vulnerability | Location | Severity | Risk | Mitigation Applied |
|---|---|---|---|---|---|
| 1 | Plaintext Password Storage | `src/controllers/authController.js` | Critical | Account takeover if database leaks | Hashed passwords using `bcrypt` (12 salt rounds) |
| 2 | SQL Injection Risk | Controllers | Critical | Unauthorized database manipulation | Applied parameterized queries (`$1`, `$2`) |
| 3 | Missing Route Authorization | `src/routes/productsRoutes.js` | High | Customers performing admin actions | Added `authenticate` and `authorize('admin')` middleware |
| 4 | Password Hash Disclosure | Database Queries | High | Credential exposure in API outputs | Omitted `password_hash` from SELECT statements & responses |
| 5 | Error Trace Stack Leakage | `src/app.js` | Medium | System structure exposure to attackers | Configured centralized safe error handling |