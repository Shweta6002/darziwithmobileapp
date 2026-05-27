CREATE DATABASE IF NOT EXISTS darzi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE darzi;

CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  phone VARCHAR(20),
  role ENUM('ADMIN','CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
  is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status ENUM('ACTIVE','BLOCKED','DELETED') NOT NULL DEFAULT 'ACTIVE',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_users_role_status (role, status)
);

CREATE TABLE addresses (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  line1 VARCHAR(255) NOT NULL,
  line2 VARCHAR(255),
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80) NOT NULL,
  pincode VARCHAR(12) NOT NULL,
  country VARCHAR(80) NOT NULL DEFAULT 'India',
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_addresses_user (user_id),
  CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
  id CHAR(36) PRIMARY KEY,
  parent_id CHAR(36),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_categories_parent (parent_id)
);

CREATE TABLE products (
  id CHAR(36) PRIMARY KEY,
  category_id CHAR(36) NOT NULL,
  name VARCHAR(180) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  tagline VARCHAR(255),
  description TEXT NOT NULL,
  base_price DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  image_url VARCHAR(500),
  detail_images JSON NOT NULL,
  specs JSON NOT NULL,
  designed_for VARCHAR(180),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status ENUM('DRAFT','ACTIVE','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  rating_average DECIMAL(3,2) NOT NULL DEFAULT 0,
  review_count INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  FULLTEXT INDEX ftx_products_search (name, tagline, description),
  INDEX idx_products_category_status (category_id, status),
  INDEX idx_products_featured_status (is_featured, status),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_variants (
  id CHAR(36) PRIMARY KEY,
  product_id CHAR(36) NOT NULL,
  sku VARCHAR(80) NOT NULL UNIQUE,
  size VARCHAR(30) NOT NULL,
  color_name VARCHAR(80) NOT NULL,
  color_hex VARCHAR(10) NOT NULL,
  price_delta DECIMAL(12,2) NOT NULL DEFAULT 0,
  attributes JSON NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_variants_product (product_id),
  INDEX idx_variants_size_color (size, color_name),
  CONSTRAINT fk_variants_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE inventory (
  id CHAR(36) PRIMARY KEY,
  variant_id CHAR(36) NOT NULL UNIQUE,
  stock_on_hand INT UNSIGNED NOT NULL DEFAULT 0,
  stock_reserved INT UNSIGNED NOT NULL DEFAULT 0,
  reorder_point INT UNSIGNED NOT NULL DEFAULT 5,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  CONSTRAINT fk_inventory_variant FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

CREATE TABLE carts (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  guest_token VARCHAR(80),
  coupon_code VARCHAR(40),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_carts_user (user_id),
  INDEX idx_carts_guest (guest_token)
);

CREATE TABLE cart_items (
  id CHAR(36) PRIMARY KEY,
  cart_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  variant_id CHAR(36) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  customization JSON NOT NULL,
  measurement_profile_id CHAR(36),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_cart_items_cart (cart_id),
  CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id)
);

CREATE TABLE orders (
  id CHAR(36) PRIMARY KEY,
  order_number VARCHAR(40) NOT NULL UNIQUE,
  user_id CHAR(36) NOT NULL,
  address_snapshot JSON NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  discount_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping_total DECIMAL(12,2) NOT NULL DEFAULT 0,
  grand_total DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('PENDING_PAYMENT','ORDER_RECEIVED','PATTERN_DRAFTED','HAND_CUT','TAILORING','QUALITY_CHECK','DISPATCHED','DELIVERED','CANCELLED','RETURN_REQUESTED','RETURNED') NOT NULL DEFAULT 'PENDING_PAYMENT',
  coupon_code VARCHAR(40),
  estimated_delivery_at DATETIME,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_orders_user_created (user_id, created_at),
  INDEX idx_orders_status (status)
);

CREATE TABLE order_items (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  variant_id CHAR(36) NOT NULL,
  product_snapshot JSON NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  line_total DECIMAL(12,2) NOT NULL,
  customization JSON NOT NULL,
  measurement_snapshot JSON NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_order_items_order (order_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE payments (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NOT NULL,
  provider ENUM('RAZORPAY','STRIPE') NOT NULL,
  provider_order_id VARCHAR(120),
  provider_payment_id VARCHAR(120),
  amount DECIMAL(12,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  status ENUM('CREATED','AUTHORIZED','CAPTURED','FAILED','REFUNDED') NOT NULL DEFAULT 'CREATED',
  raw_response JSON NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_payments_order (order_id),
  INDEX idx_payments_provider_order (provider_order_id)
);

CREATE TABLE coupons (
  id CHAR(36) PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  discount_type ENUM('PERCENTAGE','FIXED') NOT NULL,
  discount_value DECIMAL(12,2) NOT NULL,
  min_order_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  max_discount_amount DECIMAL(12,2),
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NOT NULL,
  usage_limit INT UNSIGNED,
  used_count INT UNSIGNED NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_coupons_active_window (is_active, starts_at, ends_at)
);

CREATE TABLE reviews (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  title VARCHAR(120),
  body TEXT,
  status ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_reviews_user_product (user_id, product_id),
  INDEX idx_reviews_product_status (product_id, status)
);

CREATE TABLE wishlist_items (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  product_id CHAR(36) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  UNIQUE KEY uq_wishlist_user_product (user_id, product_id)
);

CREATE TABLE payment_methods (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  provider ENUM('RAZORPAY','STRIPE') NOT NULL,
  provider_customer_id VARCHAR(120),
  provider_method_id VARCHAR(120) NOT NULL,
  brand VARCHAR(40),
  last4 CHAR(4),
  exp_month INT UNSIGNED,
  exp_year INT UNSIGNED,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_payment_methods_user (user_id)
);

CREATE TABLE measurement_profiles (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  title VARCHAR(120) NOT NULL,
  fit_preference VARCHAR(40) NOT NULL,
  measurements JSON NOT NULL,
  ai_recommendation JSON NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_measurements_user (user_id)
);

CREATE TABLE admin_logs (
  id CHAR(36) PRIMARY KEY,
  admin_id CHAR(36) NOT NULL,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id CHAR(36),
  metadata JSON NOT NULL,
  ip_address VARCHAR(60),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL,
  INDEX idx_admin_logs_admin_created (admin_id, created_at),
  INDEX idx_admin_logs_entity (entity_type, entity_id)
);
