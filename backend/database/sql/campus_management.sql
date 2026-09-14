-- ============================================================
-- CAMPUS MANAGEMENT SYSTEM
-- Complete Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS campus_management;

USE campus_management;


-- ============================================================
-- 1. USERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS users (

    id INT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    phone VARCHAR(15) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role ENUM('admin','faculty','student') NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================================
-- 2. STUDENT TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS student (

    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    enrollment_no VARCHAR(50) UNIQUE NOT NULL,

    department VARCHAR(100) NOT NULL,

    course VARCHAR(100) NOT NULL,

    semester INT NOT NULL,

    section VARCHAR(20),

    admission_year INT,

    guardian_name VARCHAR(100),

    guardian_phone VARCHAR(15),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 3. FACULTY TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS faculty (

    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    employee_id VARCHAR(50) UNIQUE NOT NULL,

    department VARCHAR(100) NOT NULL,

    designation VARCHAR(100) NOT NULL,

    qualification VARCHAR(150),

    experience INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_faculty_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 4. COURSE / SUBJECT TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS courses (

    id INT PRIMARY KEY AUTO_INCREMENT,

    course_code VARCHAR(30) UNIQUE NOT NULL,

    course_name VARCHAR(150) NOT NULL,

    department VARCHAR(100) NOT NULL,

    semester INT NOT NULL,

    credits INT DEFAULT 0,

    faculty_id INT,

    description VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_course_faculty
        FOREIGN KEY (faculty_id)
        REFERENCES faculty(id)
        ON DELETE SET NULL
);


-- ============================================================
-- 5. ATTENDANCE TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS attendance (

    id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    attendance_date DATE NOT NULL,

    status ENUM('present','absent','leave') NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendance_student
        FOREIGN KEY (student_id)
        REFERENCES student(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attendance_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_attendance
        (student_id, course_id, attendance_date)
);


-- ============================================================
-- 6. MARKS / RESULT TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS marks (

    id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    exam_type ENUM(
        'internal',
        'midterm',
        'final',
        'practical'
    ) NOT NULL,

    marks DECIMAL(5,2) NOT NULL,

    max_marks DECIMAL(5,2) DEFAULT 100,

    grade VARCHAR(5),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_marks_student
        FOREIGN KEY (student_id)
        REFERENCES student(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_marks_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_student_course_exam
        (student_id, course_id, exam_type)
);


-- ============================================================
-- 7. STUDENT COURSE ENROLLMENT
-- ============================================================

CREATE TABLE IF NOT EXISTS enrollments (

    id INT PRIMARY KEY AUTO_INCREMENT,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    enrollment_date DATE DEFAULT (CURRENT_DATE),

    status ENUM('active','completed','dropped')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id)
        REFERENCES student(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_enrollment_course
        FOREIGN KEY (course_id)
        REFERENCES courses(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_enrollment
        (student_id, course_id)
);


-- ============================================================
-- DATABASE CHECK
-- ============================================================

SHOW TABLES;