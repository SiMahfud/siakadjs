-- Create default admin user
INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('cl-admin-001', 'Admin', 'admin@siakad.com', '$2b$10$AHkH4q.0JLnYMVQQAhx1ZOSjMEdOVISOX0V2nk48mgLSKlfy1RJ8u', 'ADMIN', NOW(), NOW());
