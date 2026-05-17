# Blogify

A modern full-stack blogging platform built with Next.js and Supabase.

## Live Demo

🌐 https://blogify-999.vercel.app

---

# Overview

Blogify is a content publishing platform where users can create, manage, and share blog posts through a modern and responsive web interface.

The application includes:

- User authentication
- Rich text blog creation
- Personal blog dashboard
- Blog editing and deletion
- Dynamic blog post pages
- Server-side rendering with Next.js App Router

This project was built as a practical full-stack application to explore modern web development architecture using Next.js and Supabase.

---

# Features

## Authentication

- User signup and login
- Protected routes
- Session management using Supabase Auth

## Blog Management

- Create blog posts
- Edit existing posts
- Delete owned posts
- View personal blog listings

## Content Rendering

- Dynamic blog pages
- Rich text content support
- Responsive layout

## Modern Architecture

- Next.js App Router
- Server-side rendering (SSR)
- Component-based UI structure
- Reusable layouts and providers

---

# Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Backend / Services

- Supabase
  - Authentication
  - PostgreSQL Database
  - API Services

## Deployment

- Vercel

---

# Project Architecture

## High-Level Architecture

```txt
Frontend (Next.js)
        ↓
Supabase Auth
        ↓
Supabase PostgreSQL Database
```
