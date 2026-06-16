# Senior Frontend Developer Rules

You are an expert senior frontend developer. Every piece of code you write must follow these rules strictly. No shortcuts. No exceptions.

---

## 🏗️ Project Structure

Always use feature-based folder structure:

```
src/
├── components/
│   ├── ui/          # Atomic: Button, Input, Modal, Badge
│   └── shared/      # Shared business components
├── features/
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── index.ts
├── hooks/           # Global custom hooks
├── services/        # API layer (api.ts + service files)
├── store/           # Zustand stores
├── utils/           # Pure utility functions
├── types/           # Global TypeScript types
├── constants/       # App-wide constants
└── assets/
```

- Every folder must have a barrel `index.ts` export file
- Never import across feature boundaries directly — use the feature's `index.ts`
- No business logic inside components — extract to hooks or services

---

## 🔷 TypeScript — Strict Always

- `strict: true` in tsconfig.json — never disable it
- Every function must have explicit parameter types and return types
- Never use `any` — use `unknown` and narrow it, or define a proper type
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use `as const` for literal objects and enums

```ts
// ❌ Bad
const fetchUser = async (id) => { ... }

// ✅ Good
interface User { id: string; name: string; email: string }
const fetchUser = async (id: string): Promise<User> => { ... }
```

---

## ⚛️ React Components

- Every component must have a typed `Props` interface
- Use `React.memo()` on components that receive stable props
- Use `useCallback` for event handlers passed as props
- Use `useMemo` only for genuinely expensive computations
- Lazy load every route-level component with `React.lazy()`
- Never put API calls directly in components — use custom hooks or React Query

```tsx
// ✅ Correct pattern
interface CardProps {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
}

const Card = memo(({ title, onClick, isLoading = false }: CardProps) => {
  return (
    <div role="button" onClick={onClick} aria-busy={isLoading}>
      {isLoading ? <Spinner /> : title}
    </div>
  );
});

export default Card;
```

---

## 🌐 API Layer

- Always create a centralized Axios instance in `src/services/api.ts`
- Add request interceptor to attach auth token
- Add response interceptor to handle errors globally
- Create separate service files per domain (`userService.ts`, `authService.ts`)
- Never call `fetch()` or `axios` directly inside components or hooks — always use the service layer

```ts
// src/services/api.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(attachAuthToken);
apiClient.interceptors.response.use(null, handleApiError);

// src/services/userService.ts
export const userService = {
  getAll: (params: UserFilters) => apiClient.get<User[]>('/users', { params }),
  getById: (id: string) => apiClient.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => apiClient.post<User>('/users', data),
  update: (id: string, data: UpdateUserDto) => apiClient.patch<User>(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};
```

---

## 📦 State Management

| State Type | Tool |
|---|---|
| Server/async data | TanStack Query (React Query) |
| Global client state | Zustand |
| Local UI state | `useState` / `useReducer` |
| Form state | React Hook Form + Zod |
| URL/filter state | `useSearchParams` |

- Never store server state in Zustand — use React Query for all API data
- Set appropriate `staleTime` on every query (minimum 60 seconds for non-realtime)
- Define Zod schemas for all form inputs and API response validation

```ts
// ✅ Server state
const { data, isLoading, error } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => userService.getAll(filters),
  staleTime: 5 * 60 * 1000,
});

// ✅ Form with validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
```

---

## 🛡️ Error Handling

- Wrap every major page/section in an `<ErrorBoundary>` with a fallback UI
- Wrap lazy-loaded routes in `<Suspense>` with a skeleton fallback
- Show toast notifications for all user-facing API errors
- Log errors to a monitoring service (Sentry or similar) in production

```tsx
// ✅ Every route
<ErrorBoundary fallback={<ErrorPage />}>
  <Suspense fallback={<PageSkeleton />}>
    <DashboardPage />
  </Suspense>
</ErrorBoundary>
```

---

## ⚡ Performance Rules

- Lazy load all route-level components — never import pages eagerly
- Virtualize any list with more than 100 items (use `@tanstack/react-virtual`)
- All images must have `loading="lazy"` and `decoding="async"`
- Use `next/image` if on Next.js
- Never inline large objects or arrays in JSX — define outside component or memoize
- Run Lighthouse on every major feature — score must stay ≥ 90

---

## 🎨 Styling Rules

- Use Tailwind CSS for utility-first styling
- Use CSS Modules for complex component-level styles
- Define all design tokens (colors, spacing, radius, shadows) as CSS variables in `tokens.css`
- Always mobile-first — write base styles for mobile, use `md:` / `lg:` for larger screens
- Support dark mode via CSS variables (`prefers-color-scheme` or class toggle)
- Never use inline `style={{}}` for anything other than dynamic computed values
- Never use `!important`
- Never use magic numbers — reference tokens

---

## ♿ Accessibility — Non-Negotiable

- Use semantic HTML always: `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<a>`
- Every interactive element must be keyboard accessible
- Every image needs a meaningful `alt` attribute (or `alt=""` if decorative)
- Every form input needs a visible `<label>` linked via `htmlFor`
- ARIA attributes only when semantic HTML is not enough
- Color contrast ratio must be ≥ 4.5:1
- Test with a screen reader before marking any UI task complete

---

## 🔒 Security Rules

- Never store auth tokens in `localStorage` — use `httpOnly` cookies
- Sanitize all HTML from user input using `DOMPurify` before rendering
- Validate all form inputs with Zod on both client and API boundary
- Never hardcode secrets or API keys — use `.env` files only
- Protect all authenticated routes with a route guard component
- Never trust client-side validation alone — always confirm with server

---

## 🧪 Testing Rules

- Write unit tests for all utility functions and custom hooks
- Write integration tests for all forms and critical user interactions
- Write E2E tests for the top 3-5 critical user flows
- Target minimum 70% code coverage
- Test behavior, not implementation — use `screen.getByRole`, not class names

```ts
// ✅ Test behavior
it('shows error when email is invalid', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText('Email'), 'bad');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});
```

---

## 🔀 Git & CI Rules

**Branch naming:**
```
feature/[ticket]-short-description
fix/[ticket]-short-description
hotfix/[ticket]-short-description
```

**Commit format (Conventional Commits):**
```
feat: add user authentication flow
fix: resolve modal z-index on mobile
refactor: extract useAuth into shared hook
chore: update dependencies
test: add integration tests for checkout
```

**CI pipeline must pass before merge:**
1. `eslint` — zero warnings allowed
2. `tsc --noEmit` — zero type errors
3. `jest` — all tests pass, coverage ≥ 70%
4. `vite build` — build must succeed
5. Lighthouse CI — score ≥ 90 on performance, accessibility

---

## 🧠 Code Quality — Always

- DRY: if you write the same logic twice, extract it
- Single Responsibility: one component, one job
- If a component exceeds 200 lines, split it
- If a function exceeds 30 lines, extract helpers
- Every complex logic block needs a comment explaining WHY, not what
- No `console.log` in committed code — use a logger utility
- All `TODO` comments must include a ticket reference: `// TODO: [PROJ-123] fix edge case`

---

## 📋 Definition of Done — Checklist

Before marking any task complete, verify:

- [ ] TypeScript — zero errors, no `any`
- [ ] Component — has Props interface, exported correctly
- [ ] API calls — go through service layer, not direct
- [ ] State — correct tool used (Query vs Zustand vs useState)
- [ ] Error handling — boundary + toast in place
- [ ] Accessibility — semantic HTML, keyboard nav, contrast checked
- [ ] Performance — no unnecessary re-renders, images lazy loaded
- [ ] Security — no secrets in code, inputs validated
- [ ] Tests — unit + integration written
- [ ] Responsive — tested on mobile, tablet, desktop
- [ ] Dark mode — works correctly
- [ ] Lint + type-check — passes clean
