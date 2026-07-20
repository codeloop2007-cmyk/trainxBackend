# Backend Feature Generation Specification

You are generating production-ready backend code for an Express + TypeScript + Prisma project.

Your highest priority is **architectural consistency**. Every feature must look identical regardless of the entity.

If two generated features differ in architecture, naming, responsibilities, or file organization, the generation is incorrect.

---

# Project Architecture

Every feature must use exactly this structure.

```
src/features/<feature>/
├── <feature>.route.ts
├── <feature>.controller.ts
├── <feature>.service.ts
├── <feature>.repository.ts
├── <feature>.reqDTO.ts
└── <feature>.resDTO.ts
```

Do not create additional files.

Do not merge responsibilities.

Do not omit files.

---

# Request Flow

Every endpoint must follow exactly this flow.

```
HTTP Request
    ↓
Router
    ↓
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
Database
```

Nothing may bypass this flow.

---

# Layer Responsibilities

## Router

Responsibilities:

- Register routes only.
- Connect routes to controller methods.
- Nothing else.

Rules:

- Never call services.
- Never call repositories.
- Never access Prisma.
- Never validate requests.
- Never contain business logic.
- Never use router.use() for endpoints.

Example:

```ts
router.post("/", profileController.createProfile);
```

---

## Controller

Responsibilities:

- Read Request.
- Validate request using Zod.
- Extract authenticated user id using

```ts
const { userId } = getAuth(req);
```

- Call service.
- Return HttpBody success responses.

Rules:

- Never access Prisma.
- Never call repositories.
- Never contain business logic.
- Never catch business errors.
- Never decode JWT.
- Never use req.body directly without validation.
- Never manually build database objects.

Validation must use

```ts
schema.safeParse(...)
```

If validation fails

```ts
throw new HttpError(HttpErrorStatus.BAD_REQUEST, "Invalid request");
```

---

## Service

Responsibilities:

Business rules only.

Rules:

- Never import Express.
- Never access Request or Response.
- Never access headers.
- Never access cookies.
- Never access req.userId.
- Never use Prisma.
- Never perform database queries directly.
- Call repositories only.
- Throw HttpError for expected failures.
- Convert DTOs into Prisma inputs by calling mapping functions from reqDTO.ts.

Typical flow:

```
check business rule
↓
repository
↓
map DTO
↓
repository
↓
return repository result
```

---

## Repository

Responsibilities:

Database access only.

Rules:

- Use shared prisma singleton.
- One Prisma query per function.
- Never contain business logic.
- Never throw HttpError.
- Never access Express.
- Never access environment variables.
- Never validate data.
- Never check permissions.

Repository returns raw Prisma results.

Use only generated Prisma types.

Never create duplicate database interfaces.

---

# DTO Files

## reqDTO.ts

Contains:

- Zod request schemas
- DTO types inferred from Zod
- Mapping functions converting DTOs into Prisma generated input types

Example

```
CreateProfileDTO
UpdateProfileDTO

toCreateInput(...)
toUpdateInput(...)
```

Every Prisma input object must be created here.

Never build Prisma inputs inside controllers or services.

---

## resDTO.ts

Contains response DTOs only.

Never duplicate Prisma model interfaces.

Use Prisma generated payload types whenever possible.

---

# Naming Rules

Repository

```
export const profileRepo = { ... }
```

Service

```
export const profileService = { ... }
```

Controller

```
export const profileController = { ... }
```

Routes

```
export const profileRouter = Router();
```

Never export classes unless explicitly requested.

Never use default exports.

---

# Prisma Rules

Always use generated Prisma types.

Allowed

```
Prisma.UserCreateInput
Prisma.UserUncheckedCreateInput
Prisma.UserUpdateInput
Prisma.UserUncheckedUpdateInput
Prisma.UserGetPayload<...>
```

Never create interfaces representing database models.

Never duplicate model types.

---

# Validation Rules

Every endpoint must validate:

- body
- params
- query
- headers

using Zod.

Validation always happens inside controllers.

Services never validate HTTP requests.

---

# Error Handling

Expected failures

```
throw new HttpError(status, message)
```

Repository never throws HttpError.

Do not use try/catch unless converting third-party library errors.

---

# Authentication

Authenticated endpoints always use

```
const userId = getUserId(req);
```

Controllers receive authenticated users only.

Services receive only

```
userId: string
```

Never decode JWT.

Never verify JWT.

Never inspect Authorization headers.

---

# Coding Rules

Always

- use encapsulation
- strict typing
- async/await
- generated Prisma types
- Zod validation
- SOLID
- composition
- pure functions
- named exports
- small reusable functions

Never

- any
- Object
- classes unless required
- duplicated logic
- duplicated interfaces
- Prisma in controller
- Prisma in service
- Express in repository
- business logic in repository
- validation in service
- validation in repository

---

# Required Output

Generate every file.

Every file must compile.

Every import must be correct.

No placeholders.

No TODOs.

No omitted code.

No comments explaining architecture.

Only production-ready code.

If any rule conflicts with another rule, preserve architectural consistency over convenience.
